import pytest

from app.pob.decode import decode_pob_code, encode_pob_code
from app.pob.extract import find_inline_pob_code
from app.pob.parse import parse_pob_xml

SAMPLE_XML = """<?xml version="1.0" encoding="UTF-8"?>
<PathOfBuilding>
    <Build level="93" targetVersion="3_0" bandit="None" className="Witch" ascendClassName="Necromancer" mainSocketGroup="1">
        <PlayerStat stat="TotalDPS" value="543210.5"/>
        <PlayerStat stat="Life" value="4500"/>
        <PlayerStat stat="TotalEHP" value="30000"/>
    </Build>
    <Skills activeSkillSet="1">
        <SkillSet id="1">
            <Skill label="" enabled="true" slot="Body Armour">
                <Gem nameSpec="Summon Raging Spirit" skillId="SummonRagingSpirit" enabled="true" level="20" quality="20"/>
                <Gem nameSpec="Spell Echo Support" enabled="true"/>
            </Skill>
        </SkillSet>
    </Skills>
</PathOfBuilding>
"""


def test_decode_encode_round_trip():
    code = encode_pob_code(SAMPLE_XML)
    decoded = decode_pob_code(code)
    assert decoded == SAMPLE_XML


def test_decode_invalid_code_raises():
    with pytest.raises(Exception):
        decode_pob_code("not-a-valid-pob-code!!!")


def test_parse_pob_xml_extracts_class_ascendancy_skill_and_stats():
    info = parse_pob_xml(SAMPLE_XML)
    assert info.class_name == "Witch"
    assert info.ascendancy_name == "Necromancer"
    assert info.main_skill == "Summon Raging Spirit"
    assert info.level == 93
    assert info.stats_dps == 543210.5
    assert info.stats_life == 4500
    assert info.stats_ehp == 30000


def test_parse_pob_xml_skips_support_gems_for_main_skill():
    xml = SAMPLE_XML.replace(
        '<Gem nameSpec="Summon Raging Spirit" skillId="SummonRagingSpirit" enabled="true" level="20" quality="20"/>',
        '<Gem nameSpec="Elemental Damage Support" enabled="true"/>'
        '<Gem nameSpec="Cyclone" enabled="true"/>',
    )
    info = parse_pob_xml(xml)
    assert info.main_skill == "Cyclone"


def test_parse_pob_xml_handles_no_ascendancy():
    xml = SAMPLE_XML.replace('ascendClassName="Necromancer"', 'ascendClassName="None"')
    info = parse_pob_xml(xml)
    assert info.ascendancy_name is None


def test_find_inline_pob_code_detects_valid_code_embedded_in_text():
    code = encode_pob_code(SAMPLE_XML)
    text = f"Check out my build!\n\nPoB code:\n{code}\n\nEnjoy!"
    found = find_inline_pob_code(text)
    assert found == code


def test_find_inline_pob_code_returns_none_when_no_code_present():
    assert find_inline_pob_code("just a normal post about my Necromancer build") is None
