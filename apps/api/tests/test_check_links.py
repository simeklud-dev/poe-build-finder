"""check_url/classify_status/group_by_domain nepotřebují databázi ani síť — testují
se přes httpx.MockTransport (SPEC.md požadavek: nikdy nestahovat obsah stránky, jen
zjistit HTTP status kód)."""

from types import SimpleNamespace

import httpx

from app.crawler.check_links import check_url, classify_status, extract_domain, group_by_domain


def test_extract_domain():
    assert extract_domain("https://maxroll.gg/poe/build-guides/foo") == "maxroll.gg"
    assert extract_domain("http://poe-vault.com/x") == "poe-vault.com"


def test_classify_status():
    assert classify_status(200) == "ok"
    assert classify_status(301) == "ok"
    assert classify_status(404) == "broken"
    assert classify_status(500) == "broken"
    assert classify_status(None) == "broken"


def test_group_by_domain():
    builds = [
        SimpleNamespace(source_url="https://maxroll.gg/poe/a"),
        SimpleNamespace(source_url="https://maxroll.gg/poe/b"),
        SimpleNamespace(source_url="https://poe-vault.com/c"),
    ]
    groups = group_by_domain(builds)
    assert set(groups.keys()) == {"maxroll.gg", "poe-vault.com"}
    assert len(groups["maxroll.gg"]) == 2
    assert len(groups["poe-vault.com"]) == 1


def test_check_url_uses_head_when_allowed():
    def handler(request: httpx.Request) -> httpx.Response:
        assert request.method == "HEAD"
        return httpx.Response(200)

    client = httpx.Client(transport=httpx.MockTransport(handler))
    status, error = check_url(client, "https://example.com/build")
    assert (status, error) == (200, None)


def test_check_url_falls_back_to_get_when_head_not_allowed():
    def handler(request: httpx.Request) -> httpx.Response:
        if request.method == "HEAD":
            return httpx.Response(405)
        assert request.method == "GET"
        return httpx.Response(404, content=b"not found body")

    client = httpx.Client(transport=httpx.MockTransport(handler))
    status, error = check_url(client, "https://example.com/gone")
    assert (status, error) == (404, None)


def test_check_url_reports_transport_error_as_broken():
    def handler(request: httpx.Request) -> httpx.Response:
        raise httpx.ConnectTimeout("boom", request=request)

    client = httpx.Client(transport=httpx.MockTransport(handler))
    status, error = check_url(client, "https://example.com/timeout")
    assert status is None
    assert error is not None
    assert classify_status(status) == "broken"
