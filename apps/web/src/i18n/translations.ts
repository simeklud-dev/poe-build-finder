import type { Locale } from "./locales";

export interface Dictionary {
  common: {
    loading: string;
  };
  nav: {
    brand: string;
    meta: string;
    submit: string;
    admin: string;
    favorites: string;
    campaignGuide: string;
    buildAdvisor: string;
    login: string;
    logout: string;
  };
  footer: {
    disclaimer: string;
  };
  cookieConsent: {
    message: string;
    accept: string;
    decline: string;
  };
  campaignGuide: {
    title: string;
    subtitle: string;
    videos: {
      secrets: string;
      walkthroughPart1: string;
      walkthroughPart2: string;
    };
    town: string;
    boss: string;
    fullGuides: string;
    enlarge: string;
    close: string;
    tipsTitle: string;
    terminologyTitle: string;
    tips: string[];
    terminology: { term: string; meaning: string }[];
    actSummaries: string[];
  };
  home: {
    title: string;
    subtitle: string;
    searchPlaceholder: string;
    classPlaceholder: string;
    ascendancyPlaceholder: string;
    creatorPlaceholder: string;
    mainSkillPlaceholder: string;
    leaguePlaceholder: string;
    tagsPlaceholder: string;
    searchButton: string;
    resetButton: string;
    saveFilterButton: string;
    saveFilterPrompt: string;
    saveFilterSuccess: string;
    saveFilterError: string;
    loadError: string;
    loading: string;
    noResults: string;
    addYourOwn: string;
    notFoundHint: string;
    prev: string;
    next: string;
    pageInfo: string; // {page}/{totalPages} ({total})
  };
  news: {
    title: string;
    subtitle: string;
    viewAll: string;
    source: string;
    loading: string;
    error: string;
  };
  games: { all: string; poe1: string; poe2: string };
  sources: {
    all: string;
    reddit: string;
    youtube: string;
    poe_forum: string;
    pob_forum: string;
    poe_ninja: string;
    community: string;
    maxroll: string;
    poevault: string;
    mobalytics: string;
  };
  sorts: { date: string; popularity: string; relevance: string };
  meta: {
    title: string;
    subtitle: string;
    noLeague: string;
    loading: string;
    noBuilds: string;
  };
  favorites: {
    title: string;
    loading: string;
    loginPrompt: string;
    loginLink: string;
    empty: string;
    findBuild: string;
  };
  account: {
    loginTitle: string;
    registerTitle: string;
    authHint: string;
    email: string;
    password: string;
    loginButton: string;
    registerButton: string;
    switchToRegister: string;
    switchToLogin: string;
    genericError: string;
    accountTitle: string;
    logout: string;
    myFavorites: string;
    savedFilters: string;
    loading: string;
    noFilters: string;
    newMatches: string;
    markSeen: string;
    delete: string;
  };
  admin: {
    loginTitle: string;
    invalidCreds: string;
    username: string;
    password: string;
    loginButton: string;
    queueTitle: string;
    logout: string;
    loading: string;
    listError: string;
    emptyQueue: string;
    tags: string;
    author: string;
    contact: string;
    pob: string;
    approve: string;
    reject: string;
    rejectPrompt: string;
    actionFailed: string;
    reportsTitle: string;
    noReports: string;
    reason: string;
    removeBuild: string;
    dismissReport: string;
    bulkAddTitle: string;
    bulkAddHint: string;
    bulkAddPlaceholder: string;
    bulkAddSourceLabel: string;
    bulkAddSubmit: string;
    bulkAddRunning: string;
    bulkAddResultsTitle: string;
    bulkAddSuccess: string;
    bulkAddError: string;
  };
  submit: {
    title: string;
    subtitle: string;
    success: string;
    rateLimited: string;
    genericError: string;
    connectionError: string;
    titleLabel: string;
    linkLabel: string;
    gameLabel: string;
    classLabel: string;
    ascendancyLabel: string;
    mainSkillLabel: string;
    leaguePatchLabel: string;
    leaguePatchPlaceholder: string;
    tagsLabel: string;
    tagsPlaceholder: string;
    pobLinkLabel: string;
    pobCodeLabel: string;
    pobCodePlaceholder: string;
    pobCodeHint: string;
    authorLabel: string;
    contactLabel: string;
    honeypotLabel: string;
    submitButton: string;
    submitting: string;
  };
  buildCard: {
    addFavorite: string;
    removeFavorite: string;
    reportPrompt: string;
    reported: string;
    report: string;
  };
}

const en: Dictionary = {
  common: { loading: "Loading..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Meta overview",
    submit: "ADD Build",
    admin: "Admin",
    favorites: "Favorites",
    campaignGuide: "Campaign Guide",
    buildAdvisor: "Build Advisor",
    login: "Sign in",
    logout: "Sign out",
  },
  footer: {
    disclaimer:
      "This site is not affiliated with or endorsed by Grinding Gear Games.",
  },
  cookieConsent: {
    message:
      "We use cookies to serve ads. Accept to allow personalized ads, or decline to browse without them.",
    accept: "Accept",
    decline: "Decline",
  },
  campaignGuide: {
    title: "PoE1 Campaign Guide",
    subtitle:
      "Act-by-act landmark maps for the Path of Exile 1 campaign, with links to full written guides.",
    videos: {
      secrets: "Campaign secrets A1 – A10",
      walkthroughPart1: "Campaign walkthrough part 1",
      walkthroughPart2: "Campaign walkthrough part 2",
    },
    town: "Town",
    boss: "Act boss",
    fullGuides: "Full guides",
    enlarge: "Enlarge",
    close: "Close",
    tipsTitle: "General campaign tips",
    terminologyTitle: "Terminology",
    tips: [
      "Don't waste time killing regular monsters — try to complete quests as fast as possible and only stop for groups of blue (magic) monsters. Rare (yellow) monsters aren't worth it until you're roughly in Act 2 and have decent damage.",
      "Plan your build ahead of time: set up your passive tree in Path of Building or elsewhere (at least a screenshot) and keep it open in a second window, so you don't have to think about where to put points.",
      "Movement is king. Combine a movement skill (Flame Dash, Frostblink, Blink Arrow, etc.) with Leap Slam, Shield Charge, and alternate between two Quicksilver Flasks whenever you're just running through a zone.",
      "Learn the layout of each zone through repeated play — a rough sense of where the exit tends to be relative to the entrance will save you far more time than any single item or flask.",
      "Every time you pass through town, check the vendors — look for boots with movement speed (you can search for \"nn\"), rings and items with Life and resistances, and useful links — but don't return to town unnecessarily, only when you complete a quest.",
      "Do your first lab for ascendancy as soon as it's available (end of Act 3), instead of saving the Labyrinth for later, and try to finish the Merciless Labyrinth before the fight with Kitava at the end of Act 10 — the resistance penalty afterward will noticeably make any endgame content harder.",
      "Gear priority while leveling: first life and resistances, then damage. Once your resistances are capped (75%), shift priority to life and then damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — activates once per zone and lets you fast-travel between any two unlocked waypoints, instead of having to walk through the whole level again.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — using a Portal Scroll, the Portal skill, or simply logging out to character select and logging back in — all of these options return you to the last town you were in.",
      },
    ],
    actSummaries: [
      "1. Twilight Strand (stay along the beach by the water), kill Hillock, go to town (Lioneye's Watch), talk to NPC Tarkleigh, take the reward, and check the shop at Tarkleigh's and Nessa's for useful gear.\n2. Go to Coast, reach the waypoint, go to Mud Flats, collect the Roseus Glyph, Ammonite Glyph, and Haliotis Glyph from the Rhoa nests, activate the Strange Glyph Wall and go to Submerged Passage.\n3. Waypoint back to Coast, go to Tidal Island, near the waypoint kill Hailrake — grab the Medicine Chest, log out and log back in (this returns you to town) and talk to NPC Nessa, she gives you a Quicksilver Flask.\n4. Waypoint to Submerged Passage and find Flooded Depths, kill the Dweller of the Deep, use the nearby boat to return to Submerged Passage, then go to Ledge, run onward into Climb, find the entrance to Lower Prison.\n5. In Lower Prison, waypoint to town, collect your quest rewards and check the new gear at the NPCs, return to Lower Prison (once per league: complete the Trial) and then go to Upper Prison, enter Warden's Quarters, follow the blood on the floor to Warden's Chambers, kill Brutus, log out and log back in, take your quest rewards.\n6. Waypoint to Prisoner's Gate, go to Ship Graveyard, enter the Ship Graveyard Cave and grab the Allflame at the end of the area. Leave the cave, kill Fairgraves and find Cavern of Wrath, waypoint to town and take your rewards.\n7. Waypoint to Cavern of Wrath and find the entrance to Merveil's Lair, kill the boss and go to Act II.",
      "1. Go through the exit on the right into The Old Fields.\n2. (Optional) If you don't have your second Quicksilver Flask yet, find The Den, find and kill The Great White Beast and take the exit behind it back to Old Fields. Otherwise skip this area and continue to The Crossroads.\n3. Follow the path, you'll find a waypoint, go up into The Chamber of Sins Level 1, find the entrance to The Chamber of Sins Level 2, grab the waypoint along the way if you run into it, find and complete the Labyrinth Trial, then continue, find and kill Fidelitas and grab the Baleful Gem, log out and log back in (this returns you to town).\n4. Collect the gem reward from Gruest and waypoint back to The Crossroads. Go to The Fellshrine Ruins (down on the map), find The Crypt Level 1, find and complete the Labyrinth Trial, then continue to The Crypt Level 2, find Archbishop Geofri the Abashed (no need to kill him, he's not part of the quest) and click the altar behind him for the Golden Hand, pick it up and log out and log back in (this returns you to town).\n5. Collect the Skill Book reward from Yeena and teleport back to Crossroads, this time go straight/right and enter Broken Bridge. Keep following the path, you'll meet the bandit Kraityn (kill him or help him — depending on your build), log out and log back in (this returns you to town).\n6. Go through the exit on the left into Riverways, follow the path, you'll come across a waypoint. Continue along the path to the exit into Western Forest.\n7. Continue along the path until you find a waypoint. Run into the forest on the opposite side of the path, away from the waypoint. Find a wall of trees covered in cobwebs and follow it until you find the entrance to The Weavers Chambers, and enter.\n8. Go through Weavers Chamber, kill The Weaver, grab the Maligaro's Spike and log out.\n9. Collect the gem reward from Silk and teleport back to Riverways.\n10. Pass between 2 pillars and keep going in that direction, find the exit to The Wetlands and enter.\n11. Find Oak, kill him or help him. Continue to the waypoint and use it to return to Western Forest.\n12. On the side of the path where the waypoint is, you'll find Alira in her camp along the map wall. Find her and kill her. If you're helping Alira, do that instead.\n13. Now follow the wall to the left until you find the Blackguards' camp. Kill their leader, grab the Thaumetic Emblem and use it on the Thaumetic Seal, then log out.\n14. Waypoint to the Act 1 town, collect the Skill Book reward from Tarkleigh. Return to Act 2, talk to the NPCs for rewards and teleport to The Wetlands.\n15. Poison the roots and enter Vaal Ruins, once you find it break the seal and exit into Northern Forest.\n16. Continue up through Northern Forest until you find The Caverns. Skip Dread Thicket.\n17. As soon as you come across it, grab the waypoint.\n18. Find the entrance to Ancient Pyramid and enter.\n19. Climb the pyramid's floors until you find Pyramid Apex.\n20. Kill Vaal Oversoul and exit into City of Sarn.\n21. Find the Blackguards harassing Clarissa, kill them all to save her, and wait until she gets back on her feet. Don't forget to talk to her before you leave.\n22. Go down the small staircase right below Clarissa, follow the water's edge until you find Sarn Encampment.",
      "1. Exit into Slums.\n2. Find Crematorium and grab the Waypoint. If you come across a Sewer Grating along the way, remember its location.\n3. Find the Labyrinth Trial in the Crematorium and complete it.\n4. Find Piety and defeat her. Interact with Tolman and take Tolman's Bracelet.\n5. Log out or teleport to town. Talk to Clarissa, you'll get the Sewer Keys.\n6. Enter Slums and find the Sewer Grating. Open it and enter Sewers.\n7. Find the three Platinum Busts. There's always one before the Waypoint and two after it.\n8. Find the exit to Marketplace.\n9. Grab the Waypoint.\n10. To the right of the Waypoint is the entrance to Catacombs. Enter, complete the Labyrinth Trial, then log out and use the waypoint to return to Marketplace.\n11. Find the exit to Battlefront.\n12. Find the Waypoint, usually in the middle of the area.\n13. From the Waypoint go down until you find the Blackguard Chest (looks like a cart), grab the Ribbon Spool from it.\n14. From the waypoint go left until you find the entrance to The Docks.\n15. Optional: If you're falling behind on level, it's worth killing as many monsters as possible in the Docks to catch up to the zone's level.\n16. Find the Supply Container and grab the Thaumetic Sulphite from it, then log out.\n17. Waypoint back to Battlefront and go up until you find the entrance to Solaris Temple (Level One).\n18. Go through the temple until you find the entrance to Solaris Temple (Level Two).\n19. Continue through the temple until you find the Waypoint.\n20. Talk to Lady Dialla, you'll get an Amulet and Infernal Talc as a reward.\n21. Log out or teleport to town, then talk to Hargan, you'll get a Book of Skill.\n22. Waypoint to Sewers.\n23. From the Waypoint go down/left and burn the Undying Blockage. It's always very close to the waypoint.\n24. Enter Ebony Barracks and get the Waypoint.\n25. From the Waypoint go up through Ebony Barracks until you find General Gravicius.\n26. Kill General Gravicius and continue upward.\n27. Enter Lunaris Temple (Level One).\n28. Grab the Waypoint and enter Lunaris Temple (Level Two).\n29. Look for the ascending staircases, they'll quickly show you the right way. Follow the staircases until you reach the carts. The side with two carts is always a dead end, the side with one cart is the correct path.\n31. Kill Piety and grab the Tower Key.\n32. Return to town and talk to Grigor, you'll get a Book of Skill. Talk to Maramoa, you'll get a gem reward.\n33. Waypoint to Ebony Barracks.\n34. From the Waypoint go right until you find the entrance to Imperial Gardens.\n35. Follow the paved path until you find the Waypoint.\n36. (Optional): If you need specific gems from the Library quest, at the triple fork go up the upper-left path via the stairs. Enter the Library and grab the Waypoint halfway through the area. Continue until you find the Loose Candle. Click it and enter The Archives. Collect all four Golden Pages, then return to town via portal or by logging out. Waypoint back to Library and talk to Siosa for the reward. Waypoint back to Imperial Gardens.\n37. Complete the final Labyrinth Trial for the Normal Lab. From the triple fork right above the Waypoint go up and gradually zigzag to the left. The Labyrinth Trial is almost always in the farthest upper-left corner of the area.\n38. From the triple fork above the waypoint go down to the right and up the stairs. Continue up to the right along the paved path until you find the entrance to Sceptre of God.\n39. Enter Sceptre of God and climb the floors until you find Upper Sceptre of God.\n40. Enter Upper Sceptre of God and climb the floors.\n41. Kill Dominus.\n42. Enter Aqueduct and go through the area.\n43. Enter Highgate.",
      "1. Enter The Dried Lake.\n2. Find Voll, defeat him and take Deshret's Banner. Log out or teleport to town.\n3. Open the mines using Deshret's Banner and enter The Mines (Level One).\n4. Go through the area and enter The Mines (Level Two).\n5. Find Deshret's Spirit and free him.\n6. Enter Crystal Veins.\n7. Find the Waypoint at the end of the area and return to Highgate.\n8. Talk to Tasuni, you'll get a Book of Skill reward. Talk to Oyun, you'll get a gem reward.\n9. This is where we recommend completing your first Labyrinth and Ascending.\n10. Return via the Waypoint to Crystal Veins.\n11. The following steps can be done in any order, according to preference. We prefer Kaom's Dream first, since the boss is usually somewhat less dangerous at lower levels.\n• Enter Kaom's Dream and go through the area until you reach Kaom's Stronghold. Get the Waypoint and continue until you reach Caldera of the King. Defeat Kaom and take the Eye of Fury. Return to town by logging out or via portal, then Waypoint to Crystal Veins.\n• Enter Daresso's Dream and go through the area until you run into Barkhul. Defeat him and his bodyguards, then enter The Grand Arena and get the Waypoint. Go through the arenas until you run into The Trio, a group of three unique enemies. This means Daresso is in the next area, and it's a sign you're on the right path. Defeat the Trio and enter The Ring of Blades. Defeat Daresso and take the Eye of Desire. Log out or teleport to town, then Waypoint to Crystal Veins.\n11. Talk to Dialla.\n12. Enter Belly of the Beast (Level One) and go through the area.\n13. Enter Belly of the Beast (Level Two) and go through the area.\n14. Enter Bowels of the Beast.\n15. Defeat Piety.\n16. Enter The Harvest and get the Waypoint.\n17. Kill Malachai's 3 guardians: Doedre, Maligaro, and Shavronne. Collect the various organs they drop.\n18. Use the 3 organs to enter The Black Core, which you'll find right next to the Waypoint.\n19. Kill Malachai.\n20. Log out or teleport back to town.\n21. Talk to Dialla in the highest part of town, you'll get a gem reward.\n22. Exit into The Ascent, found in the upper right part of Highgate.\n23. Find the resonator, interact with it and take the Oriath Portal.",
      "1. Grab the Waypoint and go through The Slave Pens.\n2. Kill Overseer Crow and climb the ladder that drops down, into Overseer's Tower.\n3. Talk to Lani, you'll get a ring reward.\n4. Enter Control Blocks.\n5. Find the Miasmeter. This item is usually located roughly halfway through the zone, on the leftmost part of the area.\n6. Kill Justicar Casticus at the end of the area and grab the Eyes of Zeal.\n7. Enter Oriath Square and grab the Waypoint.\n8. Find and enter Templar Courts.\n9. Go through the zone and enter The Chamber of Innocence, grabbing the Waypoint along the way right away.\n10. Find The Sanctum of Innocence and kill High Templar Avarius and Innocence.\n11. Enter back into The Chamber of Innocence through the newly opened exit.\n12. Enter Torched Courts and go through the area.\n13. Enter Ruined Square.\n14. Enter Ossuary.\n15. Find the Sign of Purity and return to Ruined Square via the exit.\n16. Find The Reliquary.\n17. Find all of Kitava's Torments and log out or teleport to town.\n18. Talk to the NPCs for your quest rewards.\n19. You're about to fight Kitava and will get a -30% penalty to resistances. It's recommended to have elemental resistances raised roughly 30% above the cap, so this penalty doesn't cause unnecessary problems in the upcoming act.\n20. Return to Ruined Square via the Waypoint.\n21. Enter Cathedral Rooftop and go through the area.\n22. Enter Cathedral Apex and defeat Kitava.\n23. Talk to Lily Roth and sail off to Wraeclast.",
      "1. Exit into The Twilight Strand. Clear the area of all monsters, log out or teleport to town and talk to Lily Roth.\n2. Enter The Coast and go through the zone. Grab the Waypoint at the end.\n3. Enter Mud Flats. Find and kill The Dishonored Queen and take the Eye of Conquest.\n4. Find the exit to Karui Fortress. It's usually in the upper-middle part of the area.\n5. Enter Tukohama's Keep.\n6. Defeat Tukohama. Talk to Sin and choose the Soul of Tukohama as your Pantheon Minor God.\n7. Find and enter The Ridge.\n8. Grab the Waypoint and return to Lioneye's Watch. Talk to Tarkleigh, you'll get a Skill Book reward.\n9. Return via the Waypoint to The Ridge.\n10. Find and enter Lower Prison, grab the Waypoint right after entering.\n11. Find the Labyrinth Trial and complete it.\n12. Find and enter Shavronne's Tower.\n13. Climb the tower until you reach Prison Rooftop.\n14. Kill Brutus and Shavronne.\n15. Go through Warden's Chambers and enter Prisoner's Gate. Grab the Waypoint.\n16. Find Valley of the Fire Drinker and defeat Abberath. Log out or teleport to town and talk to Bestel for a Skill Book reward. Return via the Waypoint to Prisoner's Gate. Head in the opposite direction from where you found Valley of the Fire Drinker (e.g. if Abberath is down to the right, go up to the left and vice versa).\n17. Enter Western Forest. Follow the main path until you find the Waypoint.\n18. Find and enter The Riverways. Follow the main path until you find the Waypoint.\n19. Find and enter The Wetlands, usually in the upper part of the area. Find Spawning Ground and kill the Puppet Mistress. Log out or teleport to town and talk to Tarkleigh for a Skill Book reward. Return via the Waypoint to The Riverways.\n20. Find and enter Southern Forest. The entrance is usually in the middle/lower right of the area.\n21. Grab the Waypoint before you exit into Cavern of Anger.\n22. Open the Flag Chest and take the Black Flag.\n23. Enter the passage and go through the cave until you reach The Beacon. Enter and grab the Waypoint right away.\n24. Find the pyramid-like structure and climb it. Escort both pillars to their places by standing in the glowing circle.\n25. Click the Ignition Switch and then click the Beacon again.\n26. Talk to Weylam Roth and sail to Brine King's Reef. Grab the Waypoint.\n27. Find and enter Brine King's Throne. The easiest way is to follow the left wall.\n28. Kill the Brine King. Talk to Sin and take your Brine King major Pantheon.\n29. Talk to Weylam Roth and sail to Act VII.",
      "1. Enter Broken Bridge. Head toward the lower-left corner of the area.\n2. Enter The Crossroads. Follow the path and grab the Waypoint in the middle of the zone.\n3. From the Waypoint take the lower branch and enter Fellshrine Ruins.\n4. Enter The Crypt and get the Waypoint.\n5. Find the Labyrinth Trial and complete it.\n6. Find the Sarcophagus and descend into The Crypt (Level Two).\n7. Find the Container of Sins and take Maligaro's Map.\n8. Return to Bridge Encampment via portal or by logging out.\n9. Return via the Waypoint to The Crossroads.\n10. From the Waypoint take the upper path and enter Chamber of Sins (Level 1).\n11. At the central crossroads grab the Waypoint and insert Maligaro's Map into the Map Device.\n12. Enter Maligaro's Sanctum and continue until you find Maligaro's Workshop.\n13. Kill Maligaro and take Black Venom. Leave the map using a Portal Scroll.\n14. Talk to Silk and take the Obsidian Key.\n15. Find and enter Chamber of Sins (Level Two).\n16. Find the Labyrinth Trial and complete it.\n17. Enter The Den.\n18. Continue and exit into Ashen Fields.\n19. Enter Fortress Encampment.\n20. Kill Greust.\n21. Enter Northern Forest.\n22. Grab the Waypoint.\n23. Enter Dread Thicket.\n• Enter Den of Despair and kill Gruthkul, then return to Dread Thicket.\n• Collect 7 Fireflies scattered throughout Dread Thicket.\n24. Return to Bridge Encampment and talk to Eramir, you'll get two Books of Skill as a reward.\n25. (Optional): talk to Helena, you'll get Greust's Necklace. This quest only rewards an amulet and usually doesn't take more than a minute of total time, so it's up to you whether you want to complete it as a league starter. If you come across an Azmeri Shrine in Northern Forest, place the necklace there and talk to Helena the next time you're in town turning in other quests.\n26. Return via the Waypoint to Northern Forest.\n27. Find the exit to The Causeway.\n28. As soon as you come across it, grab the Waypoint.\n29. Before you leave the area, grab Kishara's Star, usually right by the zone exit, in Kishara's Lockbox.\n30. Enter Vaal City.\n31. Find Yeena. Vaal City is a large and confusing zone for some players. There's always a part surrounded by dead ends that's hard to reach (the \"center\" of the town, not of the area itself). Yeena and the Waypoint are always located right there.\n32. Waypoint back to town and hand Kishara's Star to Weylam for a Skill Book reward, then return to Vaal City.\n33. Talk to Yeena and enter Temple of Decay (Level One).\n34. Enter Temple of Decay (Level Two).\n35. Enter Arakaali's Web.\n36. Kill Arakaali.\n37. Enter Sarn Ramparts.\n38. Enter Sarn Encampment.\n39. This is where we recommend doing your second Labyrinth.",
      "1. Enter Toxic Conduits.\n2. Find and enter Doedre's Cesspool.\n3. Open the grate and enter The Cauldron.\n4. Kill Doedre the Vile.\n5. Exit into Sewer Outlet and grab the Waypoint.\n6. Take the right path and enter The Quay.\n7. Open the Sealed Casket and take the Ankh of Eternity. The Ankh is usually located near the zone entrance, look for a long bridge.\n8. Find and enter Ressurection Site and kill Tolman.\n9. Talk to Clarissa.\n10. Return to The Quay.\n11. Enter Grain Gate and grab the Waypoint. Go \"up\" through the zone, roughly along the upper-right wall of the area.\n12. Kill the Gemling Legionnaires.\n13. Enter Imperial Fields and follow the main path until you find the Waypoint.\n14. Return to Sarn Encampment. Talk to Clarissa and Maramoa for Book of Skill rewards. Talk to Hargan for a ring reward.\n15. Return to Imperial Fields.\n16. Enter Solaris Temple (Level One).\n17. If you come across it, get the Waypoint.\n18. Enter Solaris Temple (Level Two).\n19. Kill Dawn and take the Sun Orb. Log out or teleport to town.\n20. Return via the Waypoint to Solaris Temple (Level one).\n21. Find and enter The Solaris Concourse.\n22. Go through, get the Waypoint and enter The Harbour Bridge.\n23. Go through and enter The Lunaris Concourse.\n24. Get the Waypoint and enter The Bath House.\n25. Find the Labyrinth Trial and complete it.\n26. Enter High Gardens and continue until you run into Pools of Terror. Enter and kill Yugul. Log out or teleport to town.\n27. Talk to Hargan for a Skill Book reward. Return via the Waypoint to Lunaris Concourse.\n28. Enter Lunaris Temple (Level 1). The path to Lunaris Temple is the same as in Act III, just keep going up until you find it.\n29. Get the Waypoint, then enter Lunaris Temple (Level 2).\n30. Kill Dusk and take the Moon Orb, then log out or teleport to town.\n31. Return via the Waypoint to Lunaris Concourse.\n32. Enter Harbour Bridge.\n33. Enter Sky Shrine.\n34. Kill Solaris and Lunaris.\n35. Enter Blood Aqueducts.\n36. Enter Highgate.",
      "1. Enter The Descent and head right.\n2. Descend through Supply Hoists until you find the exit to Vastiri Desert.\n3. Find and get the Waypoint.\n4. Find the Storm Weathered Chest. Defeat the waves of mummies that ambush you, then take the Storm Blade.\n5. Return to town using a Portal Scroll and talk to Petarus and Vanja. Talk to Sin, then talk to Petarus and Vanja again, take the Bottled Storm. Use your portal and return to Vastiri Desert.\n6. Find the entrance to The Oasis, which will now be accessible using the Bottled Storm.\n7. Go through the area and enter Sand Pit. Kill Shakari and log out or teleport to town.\n8. Talk to Irasha for a Skill Book reward. Return via the Waypoint to Vastiri Desert.\n9. Enter The Foothills.\n10. Find the Waypoint, usually in the upper-right part of the area.\n11. Enter Boiling Lake.\n12. Kill the Basilisk and take the Basilisk Acid. You'll know you're in the Basilisk's area once you start meeting groups of petrified enemies.\n13. Log out or teleport to town and return via the Waypoint to The Foothills.\n14. Enter The Tunnel, usually in the upper or upper-left part of the area.\n15. Get the Waypoint.\n16. Find the Labyrinth Trial and complete it.\n17. Enter The Quarry. Run straight to the center of the zone and get the Waypoint.\n18. The following steps can be completed in any order, depending on which you come across first.\n• Enter The Refinery.\n• Optional: If you need to craft Trigger a Socketed Spell when you Use a Skill, look for this grate, it takes you underground into the crafting area.\n• Explore the area until you find General Adus, then kill him. He's located in his own small arena, usually in the upper or upper-left part of the area. You'll usually find him faster if you take the left path from the start of the area. Interact with the Theurgic Precipitate Machine and take the Trarthan Powder. Use a portal or log out, then return via the Waypoint to The Quarry.\n• Enter Shrine of the Winds and kill Garukhan. Return to town via portal or by logging out, then talk to Irasha for a Skill Book reward. Return via the Waypoint to The Quarry.\n15. Talk to Sin and enter Belly of the Beast.\n16. Enter Rotting Core and go through the area.\n17. Enter Black Core and talk to Sin.\n18. Enter each of the portals in whichever order you choose and defeat Malachai's guardians (Shavronne, Maligaro, and Doedre).\n19. Enter Black Heart and kill the Depraved Trinity.\n20. Talk to Lily Roth and sail off to Oriath.",
      "1. Enter Cathedral Rooftop.\n2. Enter Cathedral Apex, right to the left after entering the rooftop area.\n3. Kill the Cultists and Gargoyles to free Bannon.\n4. Return to Cathedral Rooftop and head right.\n5. Enter Ravaged Square.\n6. Go down and right until you find the entrance to Control Blocks, and enter.\n7. Grab the Waypoint, then find Vilenta, roughly where the Miasmeter was in Act V. Kill Vilenta, log out or teleport to town.\n8. Talk to Lani for a Book of Skill reward and take the Waypoint to Control Blocks and exit into Ravaged Square.\n9. Go up until you run into the Waypoint, grab it and enter Ossuary.\n10. Find the Labyrinth Trial and complete it, it's near the Waypoint, then log out or teleport to town. Optional: there's also an Elixir of Allure (a respec point reward) near the Waypoint.\n11. Waypoint to Ravaged Square, find and enter Torched Courts and go through the area.\n12. Enter Desecrated Chambers, which have a similar layout to Chambers of Innocence from Act V. Grab the Waypoint right away.\n13. Find and kill Avarius, Reassembled.\n14. Return via the Waypoint to Oriath Docks.\n15. Talk to Bannon, then talk to Lani, you'll get Flask and Armor rewards.\n16. This is where we recommend doing your third labyrinth, so it's finished before Kitava's Affliction hits you again. Make sure your elemental resistances are 30% above the cap, so you don't have problems after Kitava's upcoming death.\n17. Talk to Innocence.\n18. Return to Ravaged Square and go up until you find Innocence. Talk to him.\n19. Enter Canals and go through the area.\n20. Enter The Feeding Trough and go through the area.\n21. Talk to Sin and enter Altar of Hunger.\n22. Kill Kitava.\n23. Talk to Lani in Oriath, you'll get a Skill Book reward.",
    ],
  },
  home: {
    title: "Find builds",
    subtitle:
      "A meta search engine for Path of Exile 1 and 2 builds, across Reddit, YouTube, forums and the community.",
    searchPlaceholder: "Search title and description...",
    classPlaceholder: "Class",
    ascendancyPlaceholder: "Ascendancy",
    creatorPlaceholder: "Content creator (e.g. Zizaran)",
    mainSkillPlaceholder: "Main skill",
    leaguePlaceholder: "League / patch",
    tagsPlaceholder: "Tags",
    searchButton: "Search",
    resetButton: "Reset filters",
    saveFilterButton: "Save filter",
    saveFilterPrompt: "Name for the saved filter:",
    saveFilterSuccess: "Filter saved — find it on the Account page.",
    saveFilterError: "Couldn't save the filter.",
    loadError: "Couldn't load builds.",
    loading: "Loading...",
    noResults: "No builds match your filters. Try loosening them, or",
    addYourOwn: "add your own",
    notFoundHint: "Didn't find what you're looking for? Try",
    prev: "Previous",
    next: "Next",
    pageInfo: "Page {page} of {totalPages} ({total} builds)",
  },
  news: {
    title: "PoE News",
    subtitle:
      "Latest official announcements from Path of Exile and Path of Exile 2.",
    viewAll: "View all news",
    source: "Official news",
    loading: "Loading news...",
    error: "Couldn't load news.",
  },
  games: { all: "All games", poe1: "Path of Exile 1", poe2: "Path of Exile 2" },
  sources: {
    all: "All sources",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "PoE forum",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Community",
    maxroll: "Maxroll",
    poevault: "PoE Vault",
    mobalytics: "Mobalytics",
  },
  sorts: {
    date: "Newest",
    popularity: "Most popular",
    relevance: "Relevance (requires search text)",
  },
  meta: {
    title: "Meta overview",
    subtitle: "The most popular approved builds by league/patch.",
    noLeague: "No league available",
    loading: "Loading...",
    noBuilds: "No builds for this league yet.",
  },
  favorites: {
    title: "My favorite builds",
    loading: "Loading...",
    loginPrompt: "To see your favorite builds, please",
    loginLink: "sign in",
    empty: "Nothing here yet —",
    findBuild: "find a build",
  },
  account: {
    loginTitle: "Sign in",
    registerTitle: "Register",
    authHint:
      "An account is only needed for favorites and saved filters. For your own safety, please do NOT use any of your real accounts!",
    email: "Email",
    password: "Password",
    loginButton: "Sign in",
    registerButton: "Register",
    switchToRegister: "No account? Register",
    switchToLogin: "Already have an account? Sign in",
    genericError: "Something went wrong.",
    accountTitle: "Account",
    logout: "Sign out",
    myFavorites: "My favorite builds →",
    savedFilters: "Saved filters",
    loading: "Loading...",
    noFilters:
      'Nothing here yet — save a filter on the home page with the "Save filter" button.',
    newMatches: "new",
    markSeen: "Mark as seen",
    delete: "Delete",
  },
  admin: {
    loginTitle: "Admin sign in",
    invalidCreds: "Invalid credentials.",
    username: "Username",
    password: "Password",
    loginButton: "Sign in",
    queueTitle: "Builds awaiting approval",
    logout: "Sign out",
    loading: "Loading...",
    listError: "Couldn't load the moderation queue.",
    emptyQueue: "The queue is empty.",
    tags: "Tags",
    author: "Author",
    contact: "Contact",
    pob: "PoB",
    approve: "Approve",
    reject: "Reject",
    rejectPrompt: "Rejection note (optional):",
    actionFailed: "The action failed.",
    reportsTitle: "Reported content",
    noReports: "No open reports.",
    reason: "Reason",
    removeBuild: "Remove build",
    dismissReport: "Dismiss report",
    bulkAddTitle: "Bulk-add external links",
    bulkAddHint:
      "For sites that must not be auto-crawled (e.g. Maxroll) — browse the site yourself, then paste one build per line here: title | url | game (poe1/poe2) | class | build type | league | note. Only title, url and game are required; leave the rest blank between the pipes if unknown. Lines are published immediately (no moderation queue).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Tanky, good clear and bossing",
    bulkAddSourceLabel: "Source site",
    bulkAddSubmit: "Upload",
    bulkAddRunning: "Uploading...",
    bulkAddResultsTitle: "Results",
    bulkAddSuccess: "added",
    bulkAddError: "failed",
  },
  submit: {
    title: "Submit a build",
    subtitle:
      "Paste a link to your build (PoB export, YouTube video, Reddit post, custom guide). This form is anonymous — the contact field below is optional. The build appears publicly only after manual approval.",
    success: "Thanks! Your build was submitted and is awaiting approval.",
    rateLimited:
      "Too many builds were submitted from this address, please try again later.",
    genericError: "Something went wrong, please try again.",
    connectionError: "Couldn't connect to the server.",
    titleLabel: "Build title",
    linkLabel: "Link (PoB, YouTube, Reddit, guide...)",
    gameLabel: "Game",
    classLabel: "Class",
    ascendancyLabel: "Ascendancy",
    mainSkillLabel: "Main skill",
    leaguePatchLabel: "League / patch",
    leaguePatchPlaceholder: "e.g. 3.29",
    tagsLabel: "Tags (comma separated)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Link to PoB export (optional)",
    pobCodeLabel: "PoB export code (optional, for automatic stats)",
    pobCodePlaceholder:
      "Paste the code from Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Don't paste a link here — just the copied code itself. It's used to auto-fill class/ascendancy/main skill and DPS/Life/EHP, if provided.",
    authorLabel: "Build author (optional)",
    contactLabel: "Your contact (optional, only for possible questions)",
    honeypotLabel: "Leave empty",
    submitButton: "Submit for approval",
    submitting: "Submitting...",
  },
  buildCard: {
    addFavorite: "Add to favorites",
    removeFavorite: "Remove from favorites",
    reportPrompt: "Why are you reporting this build? (optional)",
    reported: "Reported",
    report: "Report",
  },
};

const cs: Dictionary = {
  common: { loading: "Načítám..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Meta přehled",
    submit: "Přidat build",
    admin: "Admin",
    favorites: "Oblíbené",
    campaignGuide: "Průvodce kampaní",
    buildAdvisor: "Build Advisor",
    login: "Přihlásit",
    logout: "Odhlásit",
  },
  footer: {
    disclaimer:
      "Tento web není přidružen ke Grinding Gear Games ani jimi podporován.",
  },
  cookieConsent: {
    message:
      "Používáme cookies pro zobrazování reklam. Souhlaste s personalizovanými reklamami, nebo je odmítněte a prohlížejte web bez nich.",
    accept: "Souhlasím",
    decline: "Odmítnout",
  },
  campaignGuide: {
    title: "Průvodce kampaní PoE1",
    subtitle:
      "Mapy klíčových míst pro každý akt kampaně Path of Exile 1, s odkazy na kompletní psané návody.",
    videos: {
      secrets: "Tajemství kampaně A1 – A10",
      walkthroughPart1: "Průchod kampaní, část 1",
      walkthroughPart2: "Průchod kampaní, část 2",
    },
    town: "Město",
    boss: "Boss aktu",
    fullGuides: "Kompletní návody",
    enlarge: "Zvětšit",
    close: "Zavřít",
    tipsTitle: "Obecné tipy ke kampani",
    terminologyTitle: "Terminologie",
    tips: [
      "Neztrácejte čas zabíjením běžných příšer — co nejrychleji se snazte splnit questy a zastavte se jen kvůli skupinkám modrých (magic) monster. Rare (žluté) monstra se nevyplatí dokud nejste zhruba v Aktu 2 a nemate slušný dmg.",
      "Naplánujte si build předem: připravte si pasiv tree v Path of Building nebo jinde (alespon screen) a nechte ho otevřený v druhém okně, ať nepřemýšlíte, kam dát body.",
      "Pohyb je král. Zkombinujte movement skill (Flame Dash, Frostblink, blink arrow apod.) s Leap Slam, Shield Charge a střídejte dvě Quicksilver Flasky, kdykoliv jen běžíte lokací.",
      "Naučte se rozvržení jednotlivých zón opakovaným hraním — přibližná znalost, kde bývá východ vzhledem ke vstupu, ušetří mnohem víc času než jakýkoliv jeden item nebo flaska.",
      "Při každém průchodu městem zkontrolujte prodejce — hledejte boty s movement speed (dá se hledat zadáním \"nn\", prsteny a itemy s Life a resisty a užitečnými linky — ale nevracejte se do města zbytečně, jen kdyz splníte quest.",
      "První lab pro ascendancy udělejte hned, jak je to možné (konec aktu 3), místo abyste si Labyrinth šetřili na později, a zkuste dokončit Merciless Labyrinth ještě před bojem s Kitavou na konci Aktu 10 — postih na resisty po něm citelně ztíží jakýkoliv endgame obsah.",
      "Priorita vybavení při levelování: nejdřív životy a resisty, pak damage. Jakmile máte resisty na capu (75 %), přesuňte prioritu na životy a pak damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — aktivuje se jednou za zónu a umožňuje rychlý přesun mezi libovolnými dvěma odemčenými waypointy, místo aby se muselo znovu procházet celou úrovní.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — použití Portal Scrollu, skillu Portal, nebo prosté opuštění do výběru postavy a znovunačtení — všechny tyto možnosti vás vrátí do posledního města, ve kterém jste byli.",
      },
    ],
    actSummaries: [
      "1. Twilight Strand (drž se na pláži u vody), zabij Hillocka, jdi do města (Lioneye's Watch), promluv s NPC Tarkleigh, vezmi odměnu, u Tarkleight a Nessa prozkoumej obchod pro užitečné vybavení.\n2. jdi na Coast, dojdi k waypoint, jdi do Mud Flats, seber Roseus Glyph, Ammonite Glyph a Haliotis Glyph z hnízd Rhoa, aktivuj Strange Glyph Wall a jdi do Submerged Passage.\n3. Waypointem zpět na Coast, jdi na Tidal Island, blízko waypointu, zabij Hailrakea – seber Medicine Chest, odhlas se a znovu přihlas (vrátíš se tím do města) a promluv s NPC Nessa, dá ti Quicksilver Flasku.\n4. Waypointem do Submerged Passage a najdi Flooded Depths, zabij Dweller of the Deep, použij loďku poblíž pro návrat do Submerged Passage a pak jdi do Ledge, tady proběhni dál do Climb, najdi vstup do Lower Prison.\n5. Lower Prison jdi waipointem do mšsta, vyber odměn za questy a koukni na na nové vybavení u NPC, vrať se do Lower prison (jednou za ligu: dokonči Trial) a poté jdi do Upper Prison, vstup do Warden's Quarters, sleduj krev na podlaze do Warden's Chambers, zabij Bruta, odhlas se a znovu přihlas, vezmi si odměny za quest\n6. waypointem do Prisoner's Gate, jdi do Ship Graveyard, vstup do jeskyně Ship Graveyard Cave a seber Allflame na konci lokace. Opusť jeskyni, zabij Fairgravese a najdi Cavern of Wrath, waypointem do města a vezmi si odměny\n7. waypointem do Cavern of Wrath a najdi vstup do Merveil's Lair, zabij bosse a jdi do Aktu II.",
      "1. Jdi východem vpravo do The Old Fields.\n2. (Volitelné) Pokud ještě nemáš druhou Quicksilver Flask, najdi The Den, najdi a zabij The Great White Beast a vezmi východ za ním zpět do Old Fields. Jinak tuto lokaci přeskoč a pokračuj do The Crossroads.\n3. Jdi po cestě, najdeš waypoint, jdi nahoru do The Chamber of Sins Level 1, najdi vstup do The Chamber of Sins Level 2, cestou seber waypoint, pokud na něj narazíš, najdi a dokonči Labyrinth Trial, pak pokračuj, najdi a zabij Fidelitas a seber Baleful Gem, odhlas se a znovu přihlas (vrátíš se tím do města).\n4. Vyzvedni si odměnu gem od Gruest a waypointem jdi zpět do The Crossroads. Jdi do The Fellshrine Ruins (na mapě dolů), najdi The Crypt Level 1, Najdi a dokonči Labyrinth Trial, pak pokračuj do The Crypt Level 2, Najdi Archbishop Geofri the Abashed (není třeba ho zabíjet, není součástí questu) a klikni na oltář za ním pro Golden Hand, tu seber a odhlas se a znovu přihlas (vrátíš se tím do města).\n5. Vyzvedni si odměnu Skill Book od Yeeny a teleportuj se zpět do Crossroads, Tentokrát jdi rovně/doprava a vstup do Broken Bridge. Jdi pořád po cestě, najdeš Banditu Kraityn, (zabij ho nebo mu pomoz-záleží na tvém buildu), odhlas se a znovu přihlas (vrátíš se tím do města).\n6. Jdi východem vlevo do Riverways, sleduj cestu, potkáš waypoint. Pokračuj podél cesty k východu do Western Forest.\n7. Pokračuj po cestě, dokud nenajdeš waypoint. Zaběhni do lesa na opačné straně cesty, mimo waypoint. Najdi zeď stromů pokrytou pavučinami a sleduj ji, dokud nenajdeš vstup do The Weavers Chambers, a vstup dovnitř.\n8. Projdi Weavers Chamber, zabij The Weaver, seber Maligaros Spike a odhlas se.\n9. Vyzvedni si odměnu gem od Slika a teleportuj se zpět do Riverways.\n10. Projdi mezi 2 sloupy a pokračuj stále tím směrem, najdi východ do The Wetlands a vstup dovnitř.\n11. Najdi Oaka, zabij ho nebo mu pomoz. Pokračuj k waypointu a vrať se jím do Western Forest.\n12. Na straně cesty, kde je waypoint, najdeš Aliru v jejím táboře podél zdi mapy. Najdi ji a zabij ji. Pokud Aliře pomáháš, udělej to místo toho.\n13. Nyní sleduj zeď směrem doleva, dokud nenajdeš tábor Blackguards. Zabij jejich vůdce, seber Thaumetic Emblem a použij ho na Thaumetic Seal, poté se odhlas.\n14. Waypointem do města Aktu 1, vyzvedni si odměnu Skill Book od Tarkleigha. Vrať se do Aktu 2, promluv s NPC pro odměny a teleportuj se do The Wetlands.\n15. Otrav kořeny a vstup do Vaal Ruins, po nalezení rozbij pečeť a vyjdi do Northern Forest.\n16. Pokračuj nahoru přes Northern Forest, dokud nenajdeš The Caverns. Dread Thicket přeskoč.\n17. Jakmile na něj narazíš, seber waypoint.\n18. Najdi vstup do Ancient Pyramid a vstup dovnitř.\n19. Stoupej patry pyramidy, dokud nenajdeš Pyramid Apex.\n20. Zabij Vaal Oversoul a vyjdi do City of Sarn.\n21. Najdi Blackguards, kteří obtěžují Clarissu, zabij je všechny, abys ji zachránil, a počkej, dokud se nepostaví na nohy. Nezapomeň s ní promluvit, než odejdeš.\n22. Sejdi malým schodištěm hned pod Clarissou, sleduj okraj vody, dokud nenajdeš Sarn Encampment.",
      "1. Vyjdi do Slums.\n2. Najdi Crematorium a seber Waypoint. Pokud cestou narazíš na Sewer Grating, zapamatuj si jeho polohu.\n3. Najdi Labyrinth Trial v Crematoriu a dokonči ho.\n4. Najdi Piety a poraz ji. Interaguj s Tolmanem a vezmi Tolman's Bracelet.\n5. Odhlas se nebo se teleportuj do města. Promluv s Clarissou, dostaneš Sewer Keys.\n6. Vejdi do Slums a najdi Sewer Grating. Otevři ho a vstup do Sewers.\n7. Najdi tři Platinum Busts. Vždy je jeden před Waypointem a dva za ním.\n8. Najdi východ do Marketplace.\n9. Seber Waypoint.\n10. Napravo od Waypointu je vstup do Catacombs. Vejdi dovnitř, dokonči Labyrinth Trial, poté se odhlas a přes waypoint se vrať do Marketplace.\n11. Najdi východ do Battlefront.\n12. Najdi Waypoint, obvykle uprostřed lokace.\n13. Od Waypointu jdi dolů, dokud nenajdeš Blackguard Chest (vypadá jako vozík), seber z něj Ribbon Spool.\n14. Od waypointu jdi doleva, dokud nenajdeš vstup do The Docks.\n15. Volitelné: Pokud zaostáváš s levelem, vyplať se pozabíjet co nejvíc příšer v docích, aby ses dorovnal na úroveň zóny.\n16. Najdi Supply Container a seber z něj Thaumetic Sulphite, poté se odhlas.\n17. Waypointem zpět do Battlefront a jdi nahoru, dokud nenajdeš vstup do Solaris Temple (Level One).\n18. Projdi chrámem, dokud nenajdeš vstup do Solaris Temple (Level Two).\n19. Pokračuj chrámem, dokud nenajdeš Waypoint.\n20. Promluv s Lady Diallou, dostaneš odměnu Amulet a Infernal Talc.\n21. Odhlas se nebo se teleportuj do města, poté promluv s Harganem, dostaneš Book of Skill.\n22. Waypointem do Sewers.\n23. Od Waypointu jdi dolů/doleva a spal Undying Blockage. Vždy je hodně blízko waypointu.\n24. Vejdi do Ebony Barracks a získej Waypoint.\n25. Od Waypointu jdi nahoru přes Ebony Barracks, dokud nenajdeš General Gravicius.\n26. Zabij General Gravicius a pokračuj dál nahoru.\n27. Vejdi do Lunaris Temple (Level One).\n28. Seber Waypoint a vejdi do Lunaris Temple (Level Two).\n29. Hledej stoupající schodiště, podle nich rychle najdeš správnou cestu. Sleduj schodiště, dokud nedojdeš k vozíkům. Strana se dvěma vozíky je vždy slepá ulička, strana s jedním vozíkem je správná cesta.\n31. Zabij Piety a seber Tower Key.\n32. Vrať se do města a promluv s Grigorem, dostaneš Book of Skill. Promluv s Maramoou, dostaneš odměnu gem.\n33. Waypointem do Ebony Barracks.\n34. Od Waypointu jdi doprava, dokud nenajdeš vstup do Imperial Gardens.\n35. Sleduj dlážděnou cestu, dokud nenajdeš Waypoint.\n36. (Volitelné): Pokud potřebuješ konkrétní gemy z Library questu, na trojité rozcestí jdi po horní levé cestě nahoru po schodech. Vejdi do Library a v polovině oblasti seber Waypoint. Pokračuj, dokud nenajdeš Loose Candle. Klikni na ni a vstup do The Archives. Seber všechny čtyři Golden Pages, poté se vrať do města portálem nebo odhlášením. Waypointem zpět do Library a promluv se Siosou pro odměnu. Waypointem zpět do Imperial Gardens.\n37. Dokonči finální Labyrinth Trial pro Normal Lab. Od trojitého rozcestí hned nad Waypointem jdi nahoru a postupně se klikatě posouvej doleva. Labyrinth Trial se skoro vždy nachází v nejvzdálenějším levém horním rohu oblasti.\n38. Od trojitého rozcestí nad waypointem jdi dolů doprava a nahoru po schodech. Pokračuj směrem doprava nahoru podél dlážděné cesty, dokud nenajdeš vstup do Sceptre of God.\n39. Vejdi do Sceptre of God a stoupej patry, dokud nenajdeš Upper Sceptre of God.\n40. Vejdi do Upper Sceptre of God a stoupej patry.\n41. Zabij Dominuse.\n42. Vejdi do Aqueduct a projdi oblastí.\n43. Vejdi do Highgate.",
      "1. Vejdi do The Dried Lake.\n2. Najdi Volla, poraz ho a vezmi Deshret's Banner. Odhlas se nebo se teleportuj do města.\n3. Otevři doly pomocí Deshret's Banner a vejdi do The Mines (Level One).\n4. Projdi oblastí a vejdi do The Mines (Level Two).\n5. Najdi Deshret's Spirit a osvoboď ho.\n6. Vejdi do Crystal Veins.\n7. Najdi Waypoint na konci oblasti a vrať se do Highgate.\n8. Promluv s Tasuni, dostaneš odměnu Book of Skill. Promluv s Oyun, dostaneš odměnu gem.\n9. Tady doporučujeme dokončit svůj první Labyrinth a Ascend.\n10. Vrať se přes Waypoint do Crystal Veins.\n11. Následující kroky lze udělat v libovolném pořadí, podle preference. My preferujeme nejdřív Kaom's Dream, protože boss je obvykle na nižších úrovních o něco méně nebezpečný.\n• Vejdi do Kaom's Dream a projdi oblastí, dokud nedojdeš do Kaom's Stronghold. Získej Waypoint a pokračuj dál, dokud nedojdeš do Caldera of the King. Poraz Kaoma a seber Eye of Fury. Vrať se do města odhlášením nebo portálem, poté Waypointem do Crystal Veins.\n• Vejdi do Daresso's Dream a projdi oblastí, dokud nenarazíš na Barkhula. Poraz ho a jeho bodyguardy, poté vejdi do The Grand Arena a získej Waypoint. Projdi arénami, dokud nenarazíš na The Trio, skupinu tří unikátních nepřátel. To znamená, že Daresso je v další oblasti, a je to signál, že jsi na správné cestě. Poraz Trio a vejdi do The Ring of Blades. Poraz Daressa a vezmi Eye of Desire. Odhlas se nebo se teleportuj do města, poté Waypointem do Crystal Veins.\n11. Promluv s Diallou.\n12. Vejdi do Belly of the Beast (Level One) a projdi oblastí.\n13. Vejdi do Belly of the Beast (Level Two) a projdi oblastí.\n14. Vejdi do Bowels of the Beast.\n15. Poraz Piety.\n16. Vejdi do The Harvest a získej Waypoint.\n17. Zabij Malachaiho 3 strážce: Doedre, Maligaro a Shavronne. Seber různé orgány, které upustí.\n18. Použij 3 orgány, abys vstoupil do The Black Core, který najdeš hned vedle Waypointu.\n19. Zabij Malachaie.\n20. Odhlas se nebo se teleportuj zpět do města.\n21. Promluv s Diallou v nejvyšší části města, dostaneš odměnu gem.\n22. Vyjdi do The Ascent, který najdeš v horní pravé části Highgate.\n23. Najdi resonátor, interaguj s ním a vezmi Oriath Portal.",
      "1. Seber Waypoint a projdi The Slave Pens.\n2. Zabij Overseer Crow a vylez po žebříku, který se spustí dolů, do Overseer's Tower.\n3. Promluv s Lani, dostaneš odměnu prsten.\n4. Vejdi do Control Blocks.\n5. Najdi Miasmeter. Obvykle se tento předmět nachází zhruba v polovině zóny, na nejlevější části oblasti.\n6. Zabij Justicar Casticuse na konci oblasti a seber Eyes of Zeal.\n7. Vejdi do Oriath Square a seber Waypoint.\n8. Najdi a vejdi do Templar Courts.\n9. Projdi zónou a vejdi do The Chamber of Innocence, cestou hned seber Waypoint.\n10. Najdi The Sanctum of Innocence a zabij High Templar Avaria a Innocence.\n11. Vejdi zpět do The Chamber of Innocence přes nově otevřený východ.\n12. Vejdi do Torched Courts a projdi oblastí.\n13. Vejdi do Ruined Square.\n14. Vejdi do Ossuary.\n15. Najdi Sign of Purity a vrať se do Ruined Square přes východ.\n16. Najdi The Reliquary.\n17. Najdi všechna Kitaviina muka (Kitava's Torments) a odhlas se nebo se teleportuj do města.\n18. Promluv s NPC pro odměny za questy.\n19. Chystáš se bojovat s Kitavou a dostaneš postih -30 % k odolnostem. Doporučuje se mít elementární odolnosti navýšené zhruba o 30 % nad limit, abys kvůli tomuto postihu neměl v nadcházejícím aktu zbytečné problémy.\n20. Vrať se do Ruined Square přes Waypoint.\n21. Vejdi do Cathedral Rooftop a projdi oblastí.\n22. Vejdi do Cathedral Apex a poraz Kitavu.\n23. Promluv s Lily Roth a odpluj do Wraeclastu.",
      "1. Vyjdi do The Twilight Strand. Vyčisti oblast od všech příšer, odhlas se nebo se teleportuj do města a promluv s Lilly Roth.\n2. Vejdi do The Coast a projdi zónou. Na konci seber Waypoint.\n3. Vejdi do Mud Flats. Najdi a zabij The Dishonored Queen a vezmi Eye of Conquest.\n4. Najdi východ do Karui Fortress. Obvykle je v horní střední části oblasti.\n5. Vejdi do Tukohama's Keep.\n6. Poraz Tukohamu. Promluv se Sinem a vyber si Soul of Tukohama jako svého Pantheon Minor God.\n7. Najdi a vejdi do The Ridge.\n8. Seber Waypoint a vrať se do Lioneye's Watch. Promluv s Tarkleighem, dostaneš odměnu Skill Book.\n9. Vrať se přes Waypoint do The Ridge.\n10. Najdi a vejdi do Lower Prison, hned za vstupem seber Waypoint.\n11. Najdi Labyrinth Trial a dokonči ho.\n12. Najdi a vejdi do Shavronne's Tower.\n13. Stoupej věží, dokud nedojdeš do Prison Rooftop.\n14. Zabij Bruta a Shavronne.\n15. Projdi přes Warden's Chambers a vejdi do Prisoner's Gate. Seber Waypoint.\n16. Najdi Valley of the Fire Drinker a poraz Abberatha. Odhlas se nebo se teleportuj do města a promluv s Bestelem pro odměnu Skill Book. Vrať se přes Waypoint zpět do Prisoner's Gate. Vydej se opačným směrem, než kde jsi našel Valley of the Fire Drinker (např. pokud je Abberath vpravo dole, jdi vpravo nahoru a naopak).\n17. Vejdi do Western Forest. Sleduj hlavní cestu, dokud nenajdeš Waypoint.\n18. Najdi a vejdi do The Riverways. Sleduj hlavní cestu, dokud nenajdeš Waypoint.\n19. Najdi a vejdi do The Wetlands, obvykle v horní části oblasti. Najdi Spawning Ground a zabij Puppet Mistress. Odhlas se nebo se teleportuj do města a promluv s Tarkleighem pro odměnu Skill Book. Vrať se přes Waypoint do The Riverways.\n20. Najdi a vejdi do Southern Forest. Vstup je obvykle uprostřed/vpravo dole v oblasti.\n21. Seber Waypoint, než vyjdeš do Cavern of Anger.\n22. Otevři Flag Chest a vezmi Black Flag.\n23. Vejdi do průchodu a projdi jeskyní, dokud nedojdeš do The Beacon. Vejdi dovnitř a hned získej Waypoint.\n24. Najdi stavbu připomínající pyramidu a vystup po ní. Doprovoď oba sloupy na jejich místa tím, že se postavíš do zářícího kruhu.\n25. Klikni na Ignition Switch a poté znovu na Beacon.\n26. Promluv s Weylam Roth a odpluj do Brine King's Reef. Seber Waypoint.\n27. Najdi a vejdi do Brine King's Throne. Nejsnazší je sledovat levou zeď.\n28. Zabij Brine Kinga. Promluv se Sinem a seber svého Brine King major Pantheon.\n29. Promluv s Weylam Roth a odpluj do Aktu VII.",
      "1. Vejdi do Broken Bridge. Vydej se směrem k levému dolnímu rohu oblasti.\n2. Vejdi do The Crossroads. Sleduj cestu a uprostřed zóny seber Waypoint.\n3. Od Waypointu se vydej dolní odbočkou a vejdi do Fellshrine Ruins.\n4. Vejdi do The Crypt a získej Waypoint.\n5. Najdi Labyrinth Trial a dokonči ho.\n6. Najdi Sarcophagus a sestup do The Crypt (Level Two).\n7. Najdi Container of Sins a vezmi Maligaro's Map.\n8. Vrať se do Bridge Encampment přes portál nebo odhlášením.\n9. Vrať se přes Waypoint do The Crossroads.\n10. Od Waypointu se vydej horní cestou a vejdi do Chamber of Sins (Level 1).\n11. U centrální křižovatky seber Waypoint a vlož Maligaro's Map do Map Device.\n12. Vejdi do Maligaro's Sanctum a pokračuj, dokud nenajdeš Maligaro's Workshop.\n13. Zabij Maligara a vezmi Black Venom. Opusť mapu pomocí Portal Scrollu.\n14. Promluv se Silk a vezmi Obsidian Key.\n15. Najdi a vejdi do Chamber of Sins (Level Two).\n16. Najdi Labyrinth Trial a dokonči ho.\n17. Vejdi do The Den.\n18. Pokračuj a vyjdi do Ashen Fields.\n19. Vejdi do Fortress Encampment.\n20. Zabij Greusta.\n21. Vejdi do Northern Forest.\n22. Seber Waypoint.\n23. Vejdi do Dread Thicket.\n• Vejdi do Den of Despair a zabij Gruthkula, poté se vrať do Dread Thicket.\n• Seber 7 světlušek (Fireflies) po celém Dread Thicketu.\n24. Vrať se do Bridge Encampment a promluv s Eramirem, dostaneš odměnu dvě Books of Skill.\n25. (Volitelné): promluv s Helenou, dostaneš Greust's Necklace. Tento quest odměňuje jen amuletem a obvykle nezabere víc než minutu celkového času, takže je na tobě, jestli ho jako league starter chceš dokončit. Pokud narazíš na Azmeri Shrine v Northern Forest, polož tam náhrdelník a promluv s Helenou, až příště budeš ve městě odevzdávat ostatní questy.\n26. Vrať se přes Waypoint do Northern Forest.\n27. Najdi východ do The Causeway.\n28. Jakmile na něj narazíš, seber Waypoint.\n29. Než opustíš oblast, seber Kishara's Star, obvykle přímo u východu ze zóny, v Kishara's Lockbox.\n30. Vejdi do Vaal City.\n31. Najdi Yeenu. Vaal City je pro některé hráče rozlehlá a matoucí zóna. Vždy je v ní část obklopená slepými uličkami, do které je těžké se dostat (\"střed\" města, ne však oblasti samotné). Yeena a Waypoint se vždy nachází právě tam.\n32. Waypointem se vrať do města a předej Kishara's Star Weylamovi za odměnu Skill Book, poté se vrať do Vaal City.\n33. Promluv s Yeenou a vejdi do Temple of Decay (Level One).\n34. Vejdi do Temple of Decay (Level Two).\n35. Vejdi do Arakaali's Web.\n36. Zabij Arakaali.\n37. Vejdi do Sarn Ramparts.\n38. Vejdi do Sarn Encampment.\n39. Tady doporučujeme udělat druhý Labyrinth.",
      "1. Vejdi do Toxic Conduits.\n2. Najdi a vejdi do Doedre's Cesspool.\n3. Otevři mříž a vejdi do The Cauldron.\n4. Zabij Doedre the Vile.\n5. Vyjdi do Sewer Outlet a seber Waypoint.\n6. Vydej se pravou cestou a vejdi do The Quay.\n7. Otevři Sealed Casket a vezmi Ankh of Eternity. Ankh se obvykle nachází poblíž vstupu do zóny, hledej dlouhý most.\n8. Najdi a vejdi do Ressurection Site a zabij Tolmana.\n9. Promluv s Clarissou.\n10. Vrať se do The Quay.\n11. Vejdi do Grain Gate a seber Waypoint. Jdi \"nahoru\" přes zónu, zhruba podél pravé horní zdi oblasti.\n12. Zabij Gemling Legionnaires.\n13. Vejdi do Imperial Fields a sleduj hlavní cestu, dokud nenajdeš Waypoint.\n14. Vrať se do Sarn Encampment. Promluv s Clarissou a Maramoou pro odměny Book of Skill. Promluv s Harganem pro odměnu prsten.\n15. Vrať se do Imperial Fields.\n16. Vejdi do Solaris Temple (Level One).\n17. Pokud na něj narazíš, získej Waypoint.\n18. Vejdi do Solaris Temple (Level Two).\n19. Zabij Dawn a vezmi Sun Orb. Odhlas se nebo se teleportuj do města.\n20. Vrať se přes Waypoint do Solaris Temple (Level one).\n21. Najdi a vejdi do The Solaris Concourse.\n22. Projdi, získej Waypoint a vejdi do The Harbour Bridge.\n23. Projdi a vejdi do The Lunaris Concourse.\n24. Získej Waypoint a vejdi do The Bath House.\n25. Najdi Labyrinth Trial a dokonči ho.\n26. Vejdi do High Gardens a pokračuj, dokud nenarazíš na Pools of Terror. Vejdi dovnitř a zabij Yugula. Odhlas se nebo se teleportuj do města.\n27. Promluv s Harganem pro odměnu Skill Book. Vrať se přes Waypoint do Lunaris Concourse.\n28. Vejdi do Lunaris Temple (Level 1). Cesta do Lunaris Temple je stejná jako v Aktu III, vždy stačí jít nahoru, dokud na něj nenarazíš.\n29. Získej Waypoint, poté vejdi do Lunaris Temple (Level 2).\n30. Zabij Dusk a vezmi Moon Orb, poté se odhlas nebo se teleportuj do města.\n31. Vrať se přes Waypoint do Lunaris Concourse.\n32. Vejdi do Harbour Bridge.\n33. Vejdi do Sky Shrine.\n34. Zabij Solaris a Lunaris.\n35. Vejdi do Blood Aqueducts.\n36. Vejdi do Highgate.",
      "1. Vejdi do The Descent a vydej se doprava.\n2. Sestupuj přes Supply Hoists, dokud nenajdeš východ do Vastiri Desert.\n3. Najdi a získej Waypoint.\n4. Najdi Storm Weathered Chest. Poraz vlny mumií, které tě přepadnou, poté vezmi Storm Blade.\n5. Vrať se do města pomocí Portal Scrollu a promluv s Petarem a Vanjou. Promluv se Sinem, poté znovu s Petarem a Vanjou, vezmi Bottled Storm. Použij svůj portál a vrať se do Vastiri Desert.\n6. Najdi vstup do The Oasis, který bude nyní přístupný pomocí Bottled Storm.\n7. Projdi oblastí a vejdi do Sand Pit. Zabij Shakariho a odhlas se nebo se teleportuj do města.\n8. Promluv s Irashou pro odměnu Skill Book. Vrať se přes Waypoint do Vastiri Desert.\n9. Vejdi do The Foothills.\n10. Najdi Waypoint, obvykle v horní pravé části oblasti.\n11. Vejdi do Boiling Lake.\n12. Zabij Basiliska a vezmi Basilisk Acid. Poznáš, že jsi v oblasti s Basiliskem, jakmile začneš potkávat skupiny zkamenělých nepřátel.\n13. Odhlas se nebo se teleportuj do města a vrať se přes Waypoint do The Foothills.\n14. Vejdi do The Tunnel, obvykle v horní nebo horní levé části oblasti.\n15. Získej Waypoint.\n16. Najdi Labyrinth Trial a dokonči ho.\n17. Vejdi do The Quarry. Běž rovnou do středu zóny a získej Waypoint.\n18. Tyto kroky lze dokončit v libovolném pořadí, podle toho, na co narazíš dřív.\n• Vejdi do The Refinery.\n• Volitelné: Pokud potřebuješ craft Trigger a Socketed Spell when you Use a Skill, hledej tuto mříž, dostane tě pod zem do oblasti s craftem.\n• Prozkoumej oblast, dokud nenajdeš General Adus, poté ho zabij. Nachází se ve vlastní malé aréně, obvykle v horní nebo horní levé části oblasti. Obvykle ho najdeš rychleji, pokud od začátku oblasti půjdeš levou cestou. Interaguj s Theurgic Precipitate Machine a vezmi Trarthan Powder. Použij portál nebo se odhlas, poté se přes Waypoint vrať do The Quarry.\n• Vejdi do Shrine of the Winds a zabij Garukhana. Vrať se do města přes portál nebo odhlášením, poté promluv s Irashou pro odměnu Skill Book. Vrať se přes Waypoint do The Quarry.\n15. Promluv se Sinem a vejdi do Belly of the Beast.\n16. Vejdi do Rotting Core a projdi oblastí.\n17. Vejdi do Black Core a promluv se Sinem.\n18. Vejdi postupně do všech portálů podle svého výběru a poraz Malachaiovy strážce (Shavronne, Maligaro a Doedre).\n19. Vejdi do Black Heart a zabij Depraved Trinity.\n20. Promluv s Lilly Roth a odpluj do Oriathu.",
      "1. Vejdi do Cathedral Rooftop.\n2. Vejdi do Cathedral Apex, hned nalevo po vstupu do oblasti rooftopu.\n3. Zabij Cultisty a Gargoyly, abys osvobodil Bannona.\n4. Vrať se do Cathedral Rooftop a vydej se doprava.\n5. Vejdi do Ravaged Square.\n6. Jdi dolů a doprava, dokud nenajdeš vstup do Control Blocks, a vejdi dovnitř.\n7. Seber Waypoint, poté najdi Vilentu, zhruba tam, kde byl v Aktu V Miasmeter. Zabij Vilentu, odhlas se nebo se teleportuj do města.\n8. Promluv s Lani pro odměnu Book of Skill a vezmi Waypoint do Control Blocks a vyjdi do Ravaged Square.\n9. Jdi nahoru, dokud nenarazíš na Waypoint, seber ho a vejdi do Ossuary.\n10. Najdi Labyrinth Trial a dokonči ho, je blízko Waypointu, poté se odhlas nebo se teleportuj do města. Volitelně: poblíž Waypointu je i Elixir of Allure (odměna respec body).\n11. Waypointem do Ravaged Square, najdi a vejdi do Torched Courts a projdi oblastí.\n12. Vejdi do Desecrated Chambers, které mají podobný layout jako Chambers of Innocence z Aktu V. Hned seber Waypoint.\n13. Najdi a zabij Avarius, Reassembled.\n14. Vrať se přes Waypoint do Oriath Docks.\n15. Promluv s Bannonem, poté promluv s Lani, dostaneš odměny Flask a Armor.\n16. Tady doporučujeme udělat třetí labyrinth, aby byl hotový, než tě znovu postihne Kitaviino prokletí (Kitava's Affliction). Ujisti se, že máš elementární odolnosti o 30 % nad limitem, abys neměl problémy po Kitavině blížící se smrti.\n17. Promluv s Innocence.\n18. Vrať se do Ravaged Square a jdi nahoru, dokud nenajdeš Innocence. Promluv s ním.\n19. Vejdi do Canals a projdi oblastí.\n20. Vejdi do The Feeding Trough a projdi oblastí.\n21. Promluv se Sinem a vejdi do Altar of Hunger.\n22. Zabij Kitavu.\n23. Promluv s Lani v Oriathu, dostaneš odměnu Skill Book.",
    ],
  },
  home: {
    title: "Hledat buildy",
    subtitle:
      "Meta-vyhledávač buildů pro Path of Exile 1 a 2 napříč Redditem, YouTube, fóry a komunitou.",
    searchPlaceholder: "Hledat v názvu a popisu...",
    classPlaceholder: "Class",
    ascendancyPlaceholder: "Ascendancy",
    creatorPlaceholder: "Content creator (např. Zizaran)",
    mainSkillPlaceholder: "Hlavní skill",
    leaguePlaceholder: "Liga / patch",
    tagsPlaceholder: "Tagy",
    searchButton: "Hledat",
    resetButton: "Vymazat filtry",
    saveFilterButton: "Uložit filtr",
    saveFilterPrompt: "Název pro uložený filtr:",
    saveFilterSuccess: "Filtr uložen — najdeš ho na stránce Účet.",
    saveFilterError: "Uložení filtru se nepovedlo.",
    loadError: "Nepodařilo se načíst buildy.",
    loading: "Načítám...",
    noResults:
      "Žádné buildy neodpovídají zadaným filtrům. Zkus je uvolnit, nebo",
    addYourOwn: "přidej svůj vlastní",
    notFoundHint: "Nenašel jsi, co hledáš? Zkus hledat i na",
    prev: "Předchozí",
    next: "Další",
    pageInfo: "Strana {page} z {totalPages} ({total} buildů)",
  },
  news: {
    title: "PoE novinky",
    subtitle:
      "Nejnovější oficiální oznámení z Path of Exile a Path of Exile 2.",
    viewAll: "Zobrazit všechny novinky",
    source: "Oficiální novinky",
    loading: "Načítám novinky...",
    error: "Novinky se nepodařilo načíst.",
  },
  games: {
    all: "Všechny hry",
    poe1: "Path of Exile 1",
    poe2: "Path of Exile 2",
  },
  sources: {
    all: "Všechny zdroje",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "PoE fórum",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Komunita",
    maxroll: "Maxroll",
    poevault: "PoE Vault",
    mobalytics: "Mobalytics",
  },
  sorts: {
    date: "Nejnovější",
    popularity: "Nejpopulárnější",
    relevance: "Relevance (vyžaduje hledaný výraz)",
  },
  meta: {
    title: "Meta přehled",
    subtitle: "Nejpopulárnější schválené buildy podle ligy/patche.",
    noLeague: "Žádná liga k dispozici",
    loading: "Načítám...",
    noBuilds: "Pro tuhle ligu zatím žádné buildy.",
  },
  favorites: {
    title: "Moje oblíbené buildy",
    loading: "Načítám...",
    loginPrompt: "Pro zobrazení oblíbených buildů se",
    loginLink: "přihlas",
    empty: "Zatím žádné —",
    findBuild: "najdi si nějaký build",
  },
  account: {
    loginTitle: "Přihlášení",
    registerTitle: "Registrace",
    authHint:
      "Účet je potřeba jen pro oblíbené buildy a uložené filtry. Pro vlastní bezpečnost NEPOUŽÍVEJTE žádné své skutečné účty prosím!",
    email: "Email",
    password: "Heslo",
    loginButton: "Přihlásit",
    registerButton: "Zaregistrovat",
    switchToRegister: "Nemáš účet? Zaregistruj se",
    switchToLogin: "Už máš účet? Přihlas se",
    genericError: "Něco se nepovedlo.",
    accountTitle: "Účet",
    logout: "Odhlásit",
    myFavorites: "Moje oblíbené buildy →",
    savedFilters: "Uložené filtry",
    loading: "Načítám...",
    noFilters:
      'Zatím žádné — ulož si filtr na hlavní stránce tlačítkem "Uložit filtr".',
    newMatches: "nových",
    markSeen: "Označit jako viděné",
    delete: "Smazat",
  },
  admin: {
    loginTitle: "Admin přihlášení",
    invalidCreds: "Neplatné přihlašovací údaje.",
    username: "Uživatel",
    password: "Heslo",
    loginButton: "Přihlásit",
    queueTitle: "Buildy čekající na schválení",
    logout: "Odhlásit",
    loading: "Načítám...",
    listError: "Nepodařilo se načíst frontu ke schválení.",
    emptyQueue: "Fronta je prázdná.",
    tags: "Tagy",
    author: "Autor",
    contact: "Kontakt",
    pob: "PoB",
    approve: "Schválit",
    reject: "Zamítnout",
    rejectPrompt: "Poznámka k zamítnutí (nepovinné):",
    actionFailed: "Akce se nepovedla.",
    reportsTitle: "Nahlášený obsah",
    noReports: "Žádná otevřená nahlášení.",
    reason: "Důvod",
    removeBuild: "Odebrat build",
    dismissReport: "Zamítnout nahlášení",
    bulkAddTitle: "Hromadné přidání externích odkazů",
    bulkAddHint:
      "Pro weby, které se nesmí automaticky procházet (např. Maxroll) — projdi web sám a sem vlož jeden build na řádek ve tvaru: název | url | hra (poe1/poe2) | class | typ buildu | liga | poznámka. Povinné je jen název, url a hra, zbytek klidně nech mezi svislítky prázdný. Řádky se publikují rovnou (bez fronty ke schválení).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Tanky, dobrý clear i bossing",
    bulkAddSourceLabel: "Zdrojový web",
    bulkAddSubmit: "Nahrát",
    bulkAddRunning: "Nahrávám...",
    bulkAddResultsTitle: "Výsledky",
    bulkAddSuccess: "přidáno",
    bulkAddError: "selhalo",
  },
  submit: {
    title: "Přidat build",
    subtitle:
      "Vlož odkaz na svůj build (PoB export, YouTube video, reddit post, vlastní guide). Formulář je anonymní — kontakt níže je nepovinný. Build se zobrazí veřejně až po ručním schválení.",
    success: "Díky! Build byl odeslán a čeká na schválení.",
    rateLimited:
      "Z této adresy bylo odesláno příliš mnoho buildů, zkus to prosím později.",
    genericError: "Něco se nepovedlo, zkus to prosím znovu.",
    connectionError: "Nepodařilo se spojit se serverem.",
    titleLabel: "Název buildu",
    linkLabel: "Odkaz (PoB, YouTube, Reddit, guide...)",
    gameLabel: "Hra",
    classLabel: "Class",
    ascendancyLabel: "Ascendancy",
    mainSkillLabel: "Hlavní skill",
    leaguePatchLabel: "Liga / patch",
    leaguePatchPlaceholder: "např. 3.29",
    tagsLabel: "Tagy (odděl čárkou)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Odkaz na PoB export (nepovinné)",
    pobCodeLabel: "PoB export kód (nepovinné, pro automatické staty)",
    pobCodePlaceholder:
      "Vlož kód z Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Nevkládej sem odkaz — jen samotný zkopírovaný kód. Použije se k automatickému doplnění class/ascendancy/hlavního skillu a DPS/Life/EHP, pokud ho vložíš.",
    authorLabel: "Autor buildu (nepovinné)",
    contactLabel: "Tvůj kontakt (nepovinné, jen pro případné dotazy)",
    honeypotLabel: "Nechte prázdné",
    submitButton: "Odeslat ke schválení",
    submitting: "Odesílám...",
  },
  buildCard: {
    addFavorite: "Přidat do oblíbených",
    removeFavorite: "Odebrat z oblíbených",
    reportPrompt: "Proč tenhle build nahlašuješ? (nepovinné)",
    reported: "Nahlášeno",
    report: "Nahlásit",
  },
};

const pl: Dictionary = {
  common: { loading: "Ładowanie..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Przegląd meta",
    submit: "Dodaj build",
    admin: "Admin",
    favorites: "Ulubione",
    campaignGuide: "Przewodnik po kampanii",
    buildAdvisor: "Build Advisor",
    login: "Zaloguj się",
    logout: "Wyloguj się",
  },
  footer: {
    disclaimer:
      "Ta strona nie jest powiązana z Grinding Gear Games ani przez nich wspierana.",
  },
  cookieConsent: {
    message:
      "Używamy plików cookie do wyświetlania reklam. Zaakceptuj, aby zezwolić na spersonalizowane reklamy, lub odrzuć, aby przeglądać bez nich.",
    accept: "Akceptuję",
    decline: "Odrzuć",
  },
  campaignGuide: {
    title: "Przewodnik po kampanii PoE1",
    subtitle:
      "Mapy kluczowych miejsc dla każdego aktu kampanii Path of Exile 1, z odnośnikami do pełnych poradników.",
    videos: {
      secrets: "Sekrety kampanii A1 – A10",
      walkthroughPart1: "Przejście kampanii, część 1",
      walkthroughPart2: "Przejście kampanii, część 2",
    },
    town: "Miasto",
    boss: "Boss aktu",
    fullGuides: "Pełne poradniki",
    enlarge: "Powiększ",
    close: "Zamknij",
    tipsTitle: "Ogólne wskazówki do kampanii",
    terminologyTitle: "Terminologia",
    tips: [
      "Nie traćcie czasu na zabijanie zwykłych potworów — starajcie się jak najszybciej wykonywać questy i zatrzymujcie się tylko przy grupkach niebieskich (magic) potworów. Rare'y (żółte) potwory nie opłacają się, dopóki nie jesteście mniej więcej w Akcie 2 i nie macie przyzwoitego dmg.",
      "Zaplanujcie build z wyprzedzeniem: przygotujcie sobie drzewko pasywne w Path of Building lub gdzie indziej (przynajmniej screen) i trzymajcie je otwarte w drugim oknie, żeby nie zastanawiać się, gdzie wkładać punkty.",
      "Ruch to król. Połączcie movement skill (Flame Dash, Frostblink, blink arrow itp.) z Leap Slam, Shield Charge i naprzemiennie używajcie dwóch Quicksilver Flasek, kiedy tylko biegniecie przez lokację.",
      "Nauczcie się rozkładu poszczególnych stref poprzez powtarzalne granie — przybliżona znajomość, gdzie zwykle znajduje się wyjście względem wejścia, zaoszczędzi znacznie więcej czasu niż jakikolwiek pojedynczy item czy flaska.",
      "Przy każdym przejściu przez miasto sprawdzajcie sprzedawców — szukajcie butów z movement speed (można wyszukać wpisując \"nn\"), pierścieni oraz itemów z Life i resistami oraz przydatnymi linkami — ale nie wracajcie do miasta bez potrzeby, tylko wtedy, gdy kończycie quest.",
      "Pierwszy lab na ascendancy zróbcie od razu, jak tylko będzie to możliwe (koniec aktu 3), zamiast oszczędzać sobie Labyrinth na później, i spróbujcie ukończyć Merciless Labyrinth jeszcze przed walką z Kitavą na końcu Aktu 10 — kara do resistów po niej odczuwalnie utrudni jakikolwiek endgame'owy content.",
      "Priorytet ekwipunku podczas levelowania: najpierw życie i resisty, potem damage. Gdy tylko macie resisty na capie (75%), przesuńcie priorytet na życie, a potem na damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — aktywuje się raz na strefę i umożliwia szybkie przemieszczanie się między dowolnymi dwoma odblokowanymi waypointami, zamiast konieczności ponownego przechodzenia całego poziomu.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — użycie Portal Scrolla, skilla Portal, lub zwykłe wyjście do wyboru postaci i ponowne wczytanie — wszystkie te opcje przenoszą was z powrotem do ostatniego miasta, w którym byliście.",
      },
    ],
    actSummaries: [
      "1. Twilight Strand (trzymaj się plaży przy wodzie), zabij Hillocka, idź do miasta (Lioneye's Watch), porozmawiaj z NPC Tarkleigh, odbierz nagrodę, u Tarkleigh i Nessy sprawdź sklep pod kątem przydatnego ekwipunku.\n2. Idź na Coast, dojdź do waypointu, idź do Mud Flats, zbierz Roseus Glyph, Ammonite Glyph i Haliotis Glyph z gniazd Rhoa, aktywuj Strange Glyph Wall i idź do Submerged Passage.\n3. Waypointem wróć na Coast, idź na Tidal Island, blisko waypointu zabij Hailrakea – zbierz Medicine Chest, wyloguj się i zaloguj ponownie (dzięki temu wrócisz do miasta) i porozmawiaj z NPC Nessa, da ci Quicksilver Flaskę.\n4. Waypointem do Submerged Passage i znajdź Flooded Depths, zabij Dweller of the Deep, użyj łódki w pobliżu, aby wrócić do Submerged Passage, a potem idź do Ledge, tutaj przebiegnij dalej do Climb, znajdź wejście do Lower Prison.\n5. W Lower Prison idź waypointem do miasta, odbierz nagrody za questy i zobacz nowy ekwipunek u NPC, wróć do Lower Prison (raz na ligę: ukończ Trial) i potem idź do Upper Prison, wejdź do Warden's Quarters, śledź krew na podłodze do Warden's Chambers, zabij Bruta, wyloguj się i zaloguj ponownie, odbierz nagrody za quest.\n6. Waypointem do Prisoner's Gate, idź do Ship Graveyard, wejdź do jaskini Ship Graveyard Cave i zbierz Allflame na końcu lokacji. Opuść jaskinię, zabij Fairgravesa i znajdź Cavern of Wrath, waypointem do miasta i odbierz nagrody.\n7. Waypointem do Cavern of Wrath i znajdź wejście do Merveil's Lair, zabij bossa i idź do Aktu II.",
      "1. Idź wyjściem po prawej do The Old Fields.\n2. (Opcjonalnie) Jeśli nie masz jeszcze drugiej Quicksilver Flask, znajdź The Den, znajdź i zabij The Great White Beast i weź wyjście za nim z powrotem do Old Fields. W przeciwnym razie pomiń tę lokację i idź dalej do The Crossroads.\n3. Idź drogą, znajdziesz waypoint, idź w górę do The Chamber of Sins Level 1, znajdź wejście do The Chamber of Sins Level 2, po drodze zbierz waypoint, jeśli na niego natrafisz, znajdź i ukończ Labyrinth Trial, potem idź dalej, znajdź i zabij Fidelitas i zbierz Baleful Gem, wyloguj się i zaloguj ponownie (dzięki temu wrócisz do miasta).\n4. Odbierz nagrodę gem od Gruest i waypointem wróć do The Crossroads. Idź do The Fellshrine Ruins (na mapie w dół), znajdź The Crypt Level 1, znajdź i ukończ Labyrinth Trial, potem idź dalej do The Crypt Level 2, znajdź Archbishop Geofri the Abashed (nie trzeba go zabijać, nie jest częścią questu) i kliknij na ołtarz za nim, aby zdobyć Golden Hand, zbierz go i wyloguj się i zaloguj ponownie (dzięki temu wrócisz do miasta).\n5. Odbierz nagrodę Skill Book od Yeeny i teleportuj się z powrotem do Crossroads, tym razem idź prosto/w prawo i wejdź do Broken Bridge. Idź cały czas drogą, spotkasz Bandytę Kraityn (zabij go lub mu pomóż — zależy od twojego builda), wyloguj się i zaloguj ponownie (dzięki temu wrócisz do miasta).\n6. Idź wyjściem po lewej do Riverways, śledź drogę, spotkasz waypoint. Idź dalej wzdłuż drogi do wyjścia do Western Forest.\n7. Idź dalej drogą, aż znajdziesz waypoint. Zbiegnij do lasu po przeciwnej stronie drogi, poza waypointem. Znajdź ścianę drzew pokrytą pajęczynami i śledź ją, aż znajdziesz wejście do The Weavers Chambers, i wejdź do środka.\n8. Przejdź przez Weavers Chamber, zabij The Weaver, zbierz Maligaros Spike i wyloguj się.\n9. Odbierz nagrodę gem od Slika i teleportuj się z powrotem do Riverways.\n10. Przejdź między 2 kolumnami i idź cały czas w tym kierunku, znajdź wyjście do The Wetlands i wejdź do środka.\n11. Znajdź Oaka, zabij go lub mu pomóż. Idź dalej do waypointu i wróć nim do Western Forest.\n12. Po tej stronie drogi, gdzie jest waypoint, znajdziesz Alirę w jej obozie wzdłuż ściany mapy. Znajdź ją i zabij. Jeśli pomagasz Alirze, zrób to zamiast tego.\n13. Teraz śledź ścianę w lewo, aż znajdziesz obóz Blackguards. Zabij ich przywódcę, zbierz Thaumetic Emblem i użyj go na Thaumetic Seal, potem się wyloguj.\n14. Waypointem do miasta z Aktu 1, odbierz nagrodę Skill Book od Tarkleigha. Wróć do Aktu 2, porozmawiaj z NPC po nagrody i teleportuj się do The Wetlands.\n15. Zatruj korzenie i wejdź do Vaal Ruins, po znalezieniu zniszcz pieczęć i wyjdź do Northern Forest.\n16. Idź dalej w górę przez Northern Forest, aż znajdziesz The Caverns. Dread Thicket pomiń.\n17. Gdy na niego natrafisz, zbierz waypoint.\n18. Znajdź wejście do Ancient Pyramid i wejdź do środka.\n19. Wspinaj się po piętrach piramidy, aż znajdziesz Pyramid Apex.\n20. Zabij Vaal Oversoul i wyjdź do City of Sarn.\n21. Znajdź Blackguardów, którzy nękają Clarissę, zabij ich wszystkich, aby ją uratować, i poczekaj, aż stanie na nogi. Nie zapomnij z nią porozmawiać, zanim odejdziesz.\n22. Zejdź małymi schodami tuż pod Clarissą, śledź brzeg wody, aż znajdziesz Sarn Encampment.",
      "1. Wyjdź do Slums.\n2. Znajdź Crematorium i zbierz Waypoint. Jeśli po drodze natrafisz na Sewer Grating, zapamiętaj jego położenie.\n3. Znajdź Labyrinth Trial w Crematorium i ukończ go.\n4. Znajdź Piety i pokonaj ją. Wejdź w interakcję z Tolmanem i weź Tolman's Bracelet.\n5. Wyloguj się lub teleportuj do miasta. Porozmawiaj z Clarissą, dostaniesz Sewer Keys.\n6. Wejdź do Slums i znajdź Sewer Grating. Otwórz go i wejdź do Sewers.\n7. Znajdź trzy Platinum Busts. Zawsze jeden jest przed Waypointem, a dwa za nim.\n8. Znajdź wyjście do Marketplace.\n9. Zbierz Waypoint.\n10. Na prawo od Waypointu znajduje się wejście do Catacombs. Wejdź do środka, ukończ Labyrinth Trial, potem wyloguj się i przez waypoint wróć do Marketplace.\n11. Znajdź wyjście do Battlefront.\n12. Znajdź Waypoint, zwykle w środku lokacji.\n13. Od Waypointu idź w dół, aż znajdziesz Blackguard Chest (wygląda jak wózek), zbierz z niego Ribbon Spool.\n14. Od waypointu idź w lewo, aż znajdziesz wejście do The Docks.\n15. Opcjonalnie: Jeśli zostajesz w tyle z poziomem, opłaca się zabić jak najwięcej potworów w dokach, aby wyrównać się z poziomem strefy.\n16. Znajdź Supply Container i zbierz z niego Thaumetic Sulphite, potem się wyloguj.\n17. Waypointem wróć do Battlefront i idź w górę, aż znajdziesz wejście do Solaris Temple (Level One).\n18. Przejdź przez świątynię, aż znajdziesz wejście do Solaris Temple (Level Two).\n19. Idź dalej przez świątynię, aż znajdziesz Waypoint.\n20. Porozmawiaj z Lady Diallą, dostaniesz nagrodę: Amulet i Infernal Talc.\n21. Wyloguj się lub teleportuj do miasta, potem porozmawiaj z Harganem, dostaniesz Book of Skill.\n22. Waypointem do Sewers.\n23. Od Waypointu idź w dół/w lewo i spal Undying Blockage. Zawsze jest bardzo blisko waypointu.\n24. Wejdź do Ebony Barracks i zdobądź Waypoint.\n25. Od Waypointu idź w górę przez Ebony Barracks, aż znajdziesz General Gravicius.\n26. Zabij General Gravicius i idź dalej w górę.\n27. Wejdź do Lunaris Temple (Level One).\n28. Zbierz Waypoint i wejdź do Lunaris Temple (Level Two).\n29. Szukaj wznoszących się schodów, dzięki nim szybko znajdziesz właściwą drogę. Śledź schody, aż dojdziesz do wózków. Strona z dwoma wózkami to zawsze ślepy zaułek, strona z jednym wózkiem to właściwa droga.\n31. Zabij Piety i zbierz Tower Key.\n32. Wróć do miasta i porozmawiaj z Grigorem, dostaniesz Book of Skill. Porozmawiaj z Maramoą, dostaniesz nagrodę gem.\n33. Waypointem do Ebony Barracks.\n34. Od Waypointu idź w prawo, aż znajdziesz wejście do Imperial Gardens.\n35. Śledź brukowaną drogę, aż znajdziesz Waypoint.\n36. (Opcjonalnie): Jeśli potrzebujesz konkretnych gemów z questu Library, na potrójnym rozstaju idź górną lewą drogą w górę po schodach. Wejdź do Library i w połowie obszaru zbierz Waypoint. Idź dalej, aż znajdziesz Loose Candle. Kliknij na nią i wejdź do The Archives. Zbierz wszystkie cztery Golden Pages, potem wróć do miasta portalem lub wylogowaniem się. Waypointem wróć do Library i porozmawiaj z Siosą po nagrodę. Waypointem wróć do Imperial Gardens.\n37. Ukończ finałowy Labyrinth Trial dla Normal Lab. Od potrójnego rozstaju tuż nad Waypointem idź w górę i stopniowo posuwaj się zygzakiem w lewo. Labyrinth Trial znajduje się niemal zawsze w najbardziej oddalonym lewym górnym rogu obszaru.\n38. Od potrójnego rozstaju nad waypointem idź w dół w prawo i w górę po schodach. Idź dalej w prawo w górę wzdłuż brukowanej drogi, aż znajdziesz wejście do Sceptre of God.\n39. Wejdź do Sceptre of God i wspinaj się po piętrach, aż znajdziesz Upper Sceptre of God.\n40. Wejdź do Upper Sceptre of God i wspinaj się po piętrach.\n41. Zabij Dominusa.\n42. Wejdź do Aqueduct i przejdź przez obszar.\n43. Wejdź do Highgate.",
      "1. Wejdź do The Dried Lake.\n2. Znajdź Volla, pokonaj go i weź Deshret's Banner. Wyloguj się lub teleportuj do miasta.\n3. Otwórz kopalnie za pomocą Deshret's Banner i wejdź do The Mines (Level One).\n4. Przejdź przez obszar i wejdź do The Mines (Level Two).\n5. Znajdź Deshret's Spirit i uwolnij go.\n6. Wejdź do Crystal Veins.\n7. Znajdź Waypoint na końcu obszaru i wróć do Highgate.\n8. Porozmawiaj z Tasuni, dostaniesz nagrodę Book of Skill. Porozmawiaj z Oyun, dostaniesz nagrodę gem.\n9. Tutaj polecamy ukończyć swój pierwszy Labyrinth i Ascend.\n10. Wróć przez Waypoint do Crystal Veins.\n11. Poniższe kroki można wykonać w dowolnej kolejności, wedle preferencji. My preferujemy najpierw Kaom's Dream, ponieważ boss zwykle jest na niższych poziomach nieco mniej niebezpieczny.\n• Wejdź do Kaom's Dream i przejdź przez obszar, aż dojdziesz do Kaom's Stronghold. Zdobądź Waypoint i idź dalej, aż dojdziesz do Caldera of the King. Pokonaj Kaoma i zbierz Eye of Fury. Wróć do miasta wylogowaniem się lub portalem, potem Waypointem do Crystal Veins.\n• Wejdź do Daresso's Dream i przejdź przez obszar, aż natrafisz na Barkhula. Pokonaj go i jego ochroniarzy, potem wejdź do The Grand Arena i zdobądź Waypoint. Przejdź przez areny, aż natrafisz na The Trio, grupę trzech unikalnych wrogów. Oznacza to, że Daresso jest w następnym obszarze, i jest to sygnał, że jesteś na dobrej drodze. Pokonaj Trio i wejdź do The Ring of Blades. Pokonaj Daressa i weź Eye of Desire. Wyloguj się lub teleportuj do miasta, potem Waypointem do Crystal Veins.\n11. Porozmawiaj z Diallą.\n12. Wejdź do Belly of the Beast (Level One) i przejdź przez obszar.\n13. Wejdź do Belly of the Beast (Level Two) i przejdź przez obszar.\n14. Wejdź do Bowels of the Beast.\n15. Pokonaj Piety.\n16. Wejdź do The Harvest i zdobądź Waypoint.\n17. Zabij 3 strażników Malachaiego: Doedre, Maligaro i Shavronne. Zbierz różne organy, które upuszczą.\n18. Użyj 3 organów, aby wejść do The Black Core, który znajdziesz tuż obok Waypointu.\n19. Zabij Malachaiego.\n20. Wyloguj się lub teleportuj z powrotem do miasta.\n21. Porozmawiaj z Diallą w najwyższej części miasta, dostaniesz nagrodę gem.\n22. Wyjdź do The Ascent, który znajdziesz w górnej prawej części Highgate.\n23. Znajdź resonator, wejdź z nim w interakcję i weź Oriath Portal.",
      "1. Zbierz Waypoint i przejdź przez The Slave Pens.\n2. Zabij Overseer Crow i wejdź po drabinie, która się opuści, do Overseer's Tower.\n3. Porozmawiaj z Lani, dostaniesz nagrodę pierścień.\n4. Wejdź do Control Blocks.\n5. Znajdź Miasmeter. Zwykle ten przedmiot znajduje się mniej więcej w połowie strefy, w najbardziej wysuniętej na lewo części obszaru.\n6. Zabij Justicar Casticuse na końcu obszaru i zbierz Eyes of Zeal.\n7. Wejdź do Oriath Square i zbierz Waypoint.\n8. Znajdź i wejdź do Templar Courts.\n9. Przejdź przez strefę i wejdź do The Chamber of Innocence, po drodze od razu zbierz Waypoint.\n10. Znajdź The Sanctum of Innocence i zabij High Templar Avaria i Innocence.\n11. Wejdź z powrotem do The Chamber of Innocence przez nowo otwarte wyjście.\n12. Wejdź do Torched Courts i przejdź przez obszar.\n13. Wejdź do Ruined Square.\n14. Wejdź do Ossuary.\n15. Znajdź Sign of Purity i wróć do Ruined Square przez wyjście.\n16. Znajdź The Reliquary.\n17. Znajdź wszystkie Kitaviine męki (Kitava's Torments) i wyloguj się lub teleportuj do miasta.\n18. Porozmawiaj z NPC po nagrody za questy.\n19. Szykujesz się do walki z Kitavą i dostaniesz karę -30% do odporności. Zaleca się mieć odporności elementarne podniesione o mniej więcej 30% powyżej limitu, aby przez tę karę nie mieć niepotrzebnych problemów w nadchodzącym akcie.\n20. Wróć do Ruined Square przez Waypoint.\n21. Wejdź do Cathedral Rooftop i przejdź przez obszar.\n22. Wejdź do Cathedral Apex i pokonaj Kitavę.\n23. Porozmawiaj z Lily Roth i odpłyń do Wraeclastu.",
      "1. Wyjdź do The Twilight Strand. Oczyść obszar ze wszystkich potworów, wyloguj się lub teleportuj do miasta i porozmawiaj z Lilly Roth.\n2. Wejdź do The Coast i przejdź przez strefę. Na końcu zbierz Waypoint.\n3. Wejdź do Mud Flats. Znajdź i zabij The Dishonored Queen i weź Eye of Conquest.\n4. Znajdź wyjście do Karui Fortress. Zwykle jest w górnej środkowej części obszaru.\n5. Wejdź do Tukohama's Keep.\n6. Pokonaj Tukohamę. Porozmawiaj z Sinem i wybierz Soul of Tukohama jako swojego Pantheon Minor God.\n7. Znajdź i wejdź do The Ridge.\n8. Zbierz Waypoint i wróć do Lioneye's Watch. Porozmawiaj z Tarkleighem, dostaniesz nagrodę Skill Book.\n9. Wróć przez Waypoint do The Ridge.\n10. Znajdź i wejdź do Lower Prison, tuż za wejściem zbierz Waypoint.\n11. Znajdź Labyrinth Trial i ukończ go.\n12. Znajdź i wejdź do Shavronne's Tower.\n13. Wspinaj się przez wieżę, aż dojdziesz do Prison Rooftop.\n14. Zabij Bruta i Shavronne.\n15. Przejdź przez Warden's Chambers i wejdź do Prisoner's Gate. Zbierz Waypoint.\n16. Znajdź Valley of the Fire Drinker i pokonaj Abberatha. Wyloguj się lub teleportuj do miasta i porozmawiaj z Bestelem po nagrodę Skill Book. Wróć przez Waypoint z powrotem do Prisoner's Gate. Wyrusz w przeciwnym kierunku niż tam, gdzie znalazłeś Valley of the Fire Drinker (np. jeśli Abberath jest na dole po prawej, idź w górę po prawej i odwrotnie).\n17. Wejdź do Western Forest. Śledź główną drogę, aż znajdziesz Waypoint.\n18. Znajdź i wejdź do The Riverways. Śledź główną drogę, aż znajdziesz Waypoint.\n19. Znajdź i wejdź do The Wetlands, zwykle w górnej części obszaru. Znajdź Spawning Ground i zabij Puppet Mistress. Wyloguj się lub teleportuj do miasta i porozmawiaj z Tarkleighem po nagrodę Skill Book. Wróć przez Waypoint do The Riverways.\n20. Znajdź i wejdź do Southern Forest. Wejście jest zwykle w środku/na dole po prawej stronie obszaru.\n21. Zbierz Waypoint, zanim wyjdziesz do Cavern of Anger.\n22. Otwórz Flag Chest i weź Black Flag.\n23. Wejdź do przejścia i idź przez jaskinię, aż dojdziesz do The Beacon. Wejdź do środka i od razu zdobądź Waypoint.\n24. Znajdź budowlę przypominającą piramidę i wejdź na nią. Odprowadź obie kolumny na ich miejsca, stając w świecącym kręgu.\n25. Kliknij na Ignition Switch, a potem ponownie na Beacon.\n26. Porozmawiaj z Weylam Roth i odpłyń do Brine King's Reef. Zbierz Waypoint.\n27. Znajdź i wejdź do Brine King's Throne. Najłatwiej jest śledzić lewą ścianę.\n28. Zabij Brine Kinga. Porozmawiaj z Sinem i zbierz swojego Brine King major Pantheon.\n29. Porozmawiaj z Weylam Roth i odpłyń do Aktu VII.",
      "1. Wejdź do Broken Bridge. Wyrusz w kierunku lewego dolnego rogu obszaru.\n2. Wejdź do The Crossroads. Śledź drogę i w środku strefy zbierz Waypoint.\n3. Od Waypointu wyrusz dolnym odgałęzieniem i wejdź do Fellshrine Ruins.\n4. Wejdź do The Crypt i zdobądź Waypoint.\n5. Znajdź Labyrinth Trial i ukończ go.\n6. Znajdź Sarcophagus i zejdź do The Crypt (Level Two).\n7. Znajdź Container of Sins i weź Maligaro's Map.\n8. Wróć do Bridge Encampment przez portal lub wylogowaniem się.\n9. Wróć przez Waypoint do The Crossroads.\n10. Od Waypointu wyrusz górną drogą i wejdź do Chamber of Sins (Level 1).\n11. Przy centralnym rozstaju zbierz Waypoint i włóż Maligaro's Map do Map Device.\n12. Wejdź do Maligaro's Sanctum i idź dalej, aż znajdziesz Maligaro's Workshop.\n13. Zabij Maligara i weź Black Venom. Opuść mapę za pomocą Portal Scrolla.\n14. Porozmawiaj z Silk i weź Obsidian Key.\n15. Znajdź i wejdź do Chamber of Sins (Level Two).\n16. Znajdź Labyrinth Trial i ukończ go.\n17. Wejdź do The Den.\n18. Idź dalej i wyjdź do Ashen Fields.\n19. Wejdź do Fortress Encampment.\n20. Zabij Greusta.\n21. Wejdź do Northern Forest.\n22. Zbierz Waypoint.\n23. Wejdź do Dread Thicket.\n• Wejdź do Den of Despair i zabij Gruthkula, potem wróć do Dread Thicket.\n• Zbierz 7 świetlików (Fireflies) w całym Dread Thicket.\n24. Wróć do Bridge Encampment i porozmawiaj z Eramirem, dostaniesz nagrodę dwie Books of Skill.\n25. (Opcjonalnie): porozmawiaj z Heleną, dostaniesz Greust's Necklace. Ten quest nagradza tylko amuletem i zwykle nie zajmuje więcej niż minutę całkowitego czasu, więc to od ciebie zależy, czy chcesz go ukończyć jako league starter. Jeśli natrafisz na Azmeri Shrine w Northern Forest, połóż tam naszyjnik i porozmawiaj z Heleną, gdy następnym razem będziesz w mieście oddawać pozostałe questy.\n26. Wróć przez Waypoint do Northern Forest.\n27. Znajdź wyjście do The Causeway.\n28. Gdy na niego natrafisz, zbierz Waypoint.\n29. Zanim opuścisz obszar, zbierz Kishara's Star, zwykle tuż przy wyjściu ze strefy, w Kishara's Lockbox.\n30. Wejdź do Vaal City.\n31. Znajdź Yeenu. Vaal City dla niektórych graczy jest rozległą i mylącą strefą. Zawsze jest w niej część otoczona ślepymi zaułkami, do której trudno się dostać (\"środek\" miasta, ale nie samego obszaru). Yeena i Waypoint zawsze znajdują się właśnie tam.\n32. Waypointem wróć do miasta i przekaż Kishara's Star Weylamowi za nagrodę Skill Book, potem wróć do Vaal City.\n33. Porozmawiaj z Yeeną i wejdź do Temple of Decay (Level One).\n34. Wejdź do Temple of Decay (Level Two).\n35. Wejdź do Arakaali's Web.\n36. Zabij Arakaali.\n37. Wejdź do Sarn Ramparts.\n38. Wejdź do Sarn Encampment.\n39. Tutaj polecamy zrobić drugi Labyrinth.",
      "1. Wejdź do Toxic Conduits.\n2. Znajdź i wejdź do Doedre's Cesspool.\n3. Otwórz kratę i wejdź do The Cauldron.\n4. Zabij Doedre the Vile.\n5. Wyjdź do Sewer Outlet i zbierz Waypoint.\n6. Wyrusz prawą drogą i wejdź do The Quay.\n7. Otwórz Sealed Casket i weź Ankh of Eternity. Ankh zwykle znajduje się w pobliżu wejścia do strefy, szukaj długiego mostu.\n8. Znajdź i wejdź do Ressurection Site i zabij Tolmana.\n9. Porozmawiaj z Clarissą.\n10. Wróć do The Quay.\n11. Wejdź do Grain Gate i zbierz Waypoint. Idź \"w górę\" przez strefę, mniej więcej wzdłuż prawej górnej ściany obszaru.\n12. Zabij Gemling Legionnaires.\n13. Wejdź do Imperial Fields i śledź główną drogę, aż znajdziesz Waypoint.\n14. Wróć do Sarn Encampment. Porozmawiaj z Clarissą i Maramoą po nagrody Book of Skill. Porozmawiaj z Harganem po nagrodę pierścień.\n15. Wróć do Imperial Fields.\n16. Wejdź do Solaris Temple (Level One).\n17. Jeśli na niego natrafisz, zdobądź Waypoint.\n18. Wejdź do Solaris Temple (Level Two).\n19. Zabij Dawn i weź Sun Orb. Wyloguj się lub teleportuj do miasta.\n20. Wróć przez Waypoint do Solaris Temple (Level one).\n21. Znajdź i wejdź do The Solaris Concourse.\n22. Przejdź przez, zdobądź Waypoint i wejdź do The Harbour Bridge.\n23. Przejdź przez i wejdź do The Lunaris Concourse.\n24. Zdobądź Waypoint i wejdź do The Bath House.\n25. Znajdź Labyrinth Trial i ukończ go.\n26. Wejdź do High Gardens i idź dalej, aż natrafisz na Pools of Terror. Wejdź do środka i zabij Yugula. Wyloguj się lub teleportuj do miasta.\n27. Porozmawiaj z Harganem po nagrodę Skill Book. Wróć przez Waypoint do Lunaris Concourse.\n28. Wejdź do Lunaris Temple (Level 1). Droga do Lunaris Temple jest taka sama jak w Akcie III, zawsze wystarczy iść w górę, aż na niego natrafisz.\n29. Zdobądź Waypoint, potem wejdź do Lunaris Temple (Level 2).\n30. Zabij Dusk i weź Moon Orb, potem wyloguj się lub teleportuj do miasta.\n31. Wróć przez Waypoint do Lunaris Concourse.\n32. Wejdź do Harbour Bridge.\n33. Wejdź do Sky Shrine.\n34. Zabij Solaris i Lunaris.\n35. Wejdź do Blood Aqueducts.\n36. Wejdź do Highgate.",
      "1. Wejdź do The Descent i wyrusz w prawo.\n2. Schodź przez Supply Hoists, aż znajdziesz wyjście do Vastiri Desert.\n3. Znajdź i zdobądź Waypoint.\n4. Znajdź Storm Weathered Chest. Pokonaj fale mumii, które cię zaatakują, potem weź Storm Blade.\n5. Wróć do miasta za pomocą Portal Scrolla i porozmawiaj z Petarem i Vanją. Porozmawiaj z Sinem, potem znowu z Petarem i Vanją, weź Bottled Storm. Użyj swojego portalu i wróć do Vastiri Desert.\n6. Znajdź wejście do The Oasis, które teraz będzie dostępne za pomocą Bottled Storm.\n7. Przejdź przez obszar i wejdź do Sand Pit. Zabij Shakariego i wyloguj się lub teleportuj do miasta.\n8. Porozmawiaj z Irashą po nagrodę Skill Book. Wróć przez Waypoint do Vastiri Desert.\n9. Wejdź do The Foothills.\n10. Znajdź Waypoint, zwykle w górnej prawej części obszaru.\n11. Wejdź do Boiling Lake.\n12. Zabij Basiliska i weź Basilisk Acid. Poznasz, że jesteś w obszarze z Basiliskiem, gdy zaczniesz spotykać grupy skamieniałych wrogów.\n13. Wyloguj się lub teleportuj do miasta i wróć przez Waypoint do The Foothills.\n14. Wejdź do The Tunnel, zwykle w górnej lub górnej lewej części obszaru.\n15. Zdobądź Waypoint.\n16. Znajdź Labyrinth Trial i ukończ go.\n17. Wejdź do The Quarry. Biegnij prosto do środka strefy i zdobądź Waypoint.\n18. Te kroki można ukończyć w dowolnej kolejności, w zależności od tego, na co natrafisz wcześniej.\n• Wejdź do The Refinery.\n• Opcjonalnie: Jeśli potrzebujesz skraftować Trigger a Socketed Spell when you Use a Skill, szukaj tej kraty, zaprowadzi cię pod ziemię do obszaru z craftem.\n• Zbadaj obszar, aż znajdziesz General Adus, potem go zabij. Znajduje się we własnej małej arenie, zwykle w górnej lub górnej lewej części obszaru. Zwykle znajdziesz go szybciej, jeśli od początku obszaru pójdziesz lewą drogą. Wejdź w interakcję z Theurgic Precipitate Machine i weź Trarthan Powder. Użyj portalu lub się wyloguj, potem przez Waypoint wróć do The Quarry.\n• Wejdź do Shrine of the Winds i zabij Garukhana. Wróć do miasta przez portal lub wylogowaniem się, potem porozmawiaj z Irashą po nagrodę Skill Book. Wróć przez Waypoint do The Quarry.\n15. Porozmawiaj z Sinem i wejdź do Belly of the Beast.\n16. Wejdź do Rotting Core i przejdź przez obszar.\n17. Wejdź do Black Core i porozmawiaj z Sinem.\n18. Wejdź kolejno do wszystkich portali według własnego wyboru i pokonaj strażników Malachaiego (Shavronne, Maligaro i Doedre).\n19. Wejdź do Black Heart i zabij Depraved Trinity.\n20. Porozmawiaj z Lilly Roth i odpłyń do Oriathu.",
      "1. Wejdź do Cathedral Rooftop.\n2. Wejdź do Cathedral Apex, zaraz po lewej po wejściu do obszaru rooftopu.\n3. Zabij Kultystów i Gargulce, aby uwolnić Bannona.\n4. Wróć do Cathedral Rooftop i wyrusz w prawo.\n5. Wejdź do Ravaged Square.\n6. Idź w dół i w prawo, aż znajdziesz wejście do Control Blocks, i wejdź do środka.\n7. Zbierz Waypoint, potem znajdź Vilentę, mniej więcej tam, gdzie w Akcie V był Miasmeter. Zabij Vilentę, wyloguj się lub teleportuj do miasta.\n8. Porozmawiaj z Lani po nagrodę Book of Skill i weź Waypoint do Control Blocks i wyjdź do Ravaged Square.\n9. Idź w górę, aż natrafisz na Waypoint, zbierz go i wejdź do Ossuary.\n10. Znajdź Labyrinth Trial i ukończ go, jest blisko Waypointu, potem wyloguj się lub teleportuj do miasta. Opcjonalnie: w pobliżu Waypointu znajduje się też Elixir of Allure (nagroda punkty respec).\n11. Waypointem do Ravaged Square, znajdź i wejdź do Torched Courts i przejdź przez obszar.\n12. Wejdź do Desecrated Chambers, które mają podobny układ do Chambers of Innocence z Aktu V. Od razu zbierz Waypoint.\n13. Znajdź i zabij Avarius, Reassembled.\n14. Wróć przez Waypoint do Oriath Docks.\n15. Porozmawiaj z Bannonem, potem porozmawiaj z Lani, dostaniesz nagrody Flask i Armor.\n16. Tutaj polecamy zrobić trzeci labyrinth, aby był gotowy, zanim ponownie dotknie cię Kitaviine przekleństwo (Kitava's Affliction). Upewnij się, że masz odporności elementarne o 30% powyżej limitu, aby nie mieć problemów po zbliżającej się śmierci Kitavy.\n17. Porozmawiaj z Innocence.\n18. Wróć do Ravaged Square i idź w górę, aż znajdziesz Innocence. Porozmawiaj z nim.\n19. Wejdź do Canals i przejdź przez obszar.\n20. Wejdź do The Feeding Trough i przejdź przez obszar.\n21. Porozmawiaj z Sinem i wejdź do Altar of Hunger.\n22. Zabij Kitavę.\n23. Porozmawiaj z Lani w Oriathu, dostaniesz nagrodę Skill Book.",
    ],
  },
  home: {
    title: "Szukaj buildów",
    subtitle:
      "Wyszukiwarka meta buildów do Path of Exile 1 i 2 z Reddita, YouTube, forów i społeczności.",
    searchPlaceholder: "Szukaj w tytule i opisie...",
    classPlaceholder: "Klasa",
    ascendancyPlaceholder: "Ascendancja",
    creatorPlaceholder: "Twórca treści (np. Zizaran)",
    mainSkillPlaceholder: "Główna umiejętność",
    leaguePlaceholder: "Liga / patch",
    tagsPlaceholder: "Tagi",
    searchButton: "Szukaj",
    resetButton: "Wyczyść filtry",
    saveFilterButton: "Zapisz filtr",
    saveFilterPrompt: "Nazwa zapisanego filtra:",
    saveFilterSuccess: "Filtr zapisany — znajdziesz go na stronie Konto.",
    saveFilterError: "Nie udało się zapisać filtra.",
    loadError: "Nie udało się wczytać buildów.",
    loading: "Ładowanie...",
    noResults: "Żaden build nie pasuje do filtrów. Spróbuj je poluzować albo",
    addYourOwn: "dodaj własny",
    notFoundHint: "Nie znalazłeś tego, czego szukasz? Spróbuj też",
    prev: "Poprzednia",
    next: "Następna",
    pageInfo: "Strona {page} z {totalPages} ({total} buildów)",
  },
  news: {
    title: "Nowości PoE",
    subtitle:
      "Najnowsze oficjalne ogłoszenia z Path of Exile i Path of Exile 2.",
    viewAll: "Zobacz wszystkie nowości",
    source: "Oficjalne nowości",
    loading: "Ładowanie nowości...",
    error: "Nie udało się załadować nowości.",
  },
  games: {
    all: "Wszystkie gry",
    poe1: "Path of Exile 1",
    poe2: "Path of Exile 2",
  },
  sources: {
    all: "Wszystkie źródła",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "Forum PoE",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Społeczność",
    maxroll: "Maxroll",
    poevault: "PoE Vault",
    mobalytics: "Mobalytics",
  },
  sorts: {
    date: "Najnowsze",
    popularity: "Najpopularniejsze",
    relevance: "Trafność (wymaga frazy)",
  },
  meta: {
    title: "Przegląd meta",
    subtitle: "Najpopularniejsze zatwierdzone buildy według ligi/patcha.",
    noLeague: "Brak dostępnej ligi",
    loading: "Ładowanie...",
    noBuilds: "Dla tej ligi nie ma jeszcze buildów.",
  },
  favorites: {
    title: "Moje ulubione buildy",
    loading: "Ładowanie...",
    loginPrompt: "Aby zobaczyć ulubione buildy,",
    loginLink: "zaloguj się",
    empty: "Jeszcze nic tu nie ma —",
    findBuild: "znajdź jakiś build",
  },
  account: {
    loginTitle: "Logowanie",
    registerTitle: "Rejestracja",
    authHint:
      "Konto jest potrzebne tylko do ulubionych i zapisanych filtrów. Dla własnego bezpieczeństwa NIE UŻYWAJ żadnych swoich prawdziwych kont!",
    email: "E-mail",
    password: "Hasło",
    loginButton: "Zaloguj się",
    registerButton: "Zarejestruj się",
    switchToRegister: "Nie masz konta? Zarejestruj się",
    switchToLogin: "Masz już konto? Zaloguj się",
    genericError: "Coś poszło nie tak.",
    accountTitle: "Konto",
    logout: "Wyloguj się",
    myFavorites: "Moje ulubione buildy →",
    savedFilters: "Zapisane filtry",
    loading: "Ładowanie...",
    noFilters:
      'Jeszcze nic tu nie ma — zapisz filtr na stronie głównej przyciskiem "Zapisz filtr".',
    newMatches: "nowych",
    markSeen: "Oznacz jako obejrzane",
    delete: "Usuń",
  },
  admin: {
    loginTitle: "Logowanie administratora",
    invalidCreds: "Nieprawidłowe dane logowania.",
    username: "Użytkownik",
    password: "Hasło",
    loginButton: "Zaloguj się",
    queueTitle: "Buildy oczekujące na zatwierdzenie",
    logout: "Wyloguj się",
    loading: "Ładowanie...",
    listError: "Nie udało się wczytać kolejki moderacji.",
    emptyQueue: "Kolejka jest pusta.",
    tags: "Tagi",
    author: "Autor",
    contact: "Kontakt",
    pob: "PoB",
    approve: "Zatwierdź",
    reject: "Odrzuć",
    rejectPrompt: "Notatka odrzucenia (opcjonalna):",
    actionFailed: "Akcja się nie powiodła.",
    reportsTitle: "Zgłoszona treść",
    noReports: "Brak otwartych zgłoszeń.",
    reason: "Powód",
    removeBuild: "Usuń build",
    dismissReport: "Odrzuć zgłoszenie",
    bulkAddTitle: "Masowe dodawanie linków zewnętrznych",
    bulkAddHint:
      "Dla stron, których nie wolno automatycznie przeszukiwać (np. Maxroll) — przejrzyj stronę sam, a potem wklej tutaj jeden build na wiersz: tytuł | url | gra (poe1/poe2) | klasa | typ builda | liga | notatka. Wymagane są tylko tytuł, url i gra, resztę możesz zostawić pustą między znakami |. Wiersze publikują się od razu (bez kolejki moderacji).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Wytrzymały, dobry clear i bossing",
    bulkAddSourceLabel: "Strona źródłowa",
    bulkAddSubmit: "Wyślij",
    bulkAddRunning: "Wysyłanie...",
    bulkAddResultsTitle: "Wyniki",
    bulkAddSuccess: "dodano",
    bulkAddError: "błąd",
  },
  submit: {
    title: "Dodaj build",
    subtitle:
      "Wklej link do swojego builda (eksport PoB, film YouTube, post z Reddita, własny poradnik). Formularz jest anonimowy — kontakt poniżej jest opcjonalny. Build pojawi się publicznie dopiero po ręcznym zatwierdzeniu.",
    success: "Dzięki! Build został wysłany i czeka na zatwierdzenie.",
    rateLimited:
      "Z tego adresu wysłano zbyt wiele buildów, spróbuj ponownie później.",
    genericError: "Coś poszło nie tak, spróbuj ponownie.",
    connectionError: "Nie udało się połączyć z serwerem.",
    titleLabel: "Tytuł builda",
    linkLabel: "Link (PoB, YouTube, Reddit, poradnik...)",
    gameLabel: "Gra",
    classLabel: "Klasa",
    ascendancyLabel: "Ascendancja",
    mainSkillLabel: "Główna umiejętność",
    leaguePatchLabel: "Liga / patch",
    leaguePatchPlaceholder: "np. 3.29",
    tagsLabel: "Tagi (oddziel przecinkiem)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Link do eksportu PoB (opcjonalnie)",
    pobCodeLabel:
      "Kod eksportu PoB (opcjonalnie, dla automatycznych statystyk)",
    pobCodePlaceholder:
      "Wklej kod z Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Nie wklejaj tu linku — tylko sam skopiowany kod. Posłuży do automatycznego uzupełnienia klasy/ascendancji/głównej umiejętności oraz DPS/Life/EHP, jeśli go podasz.",
    authorLabel: "Autor builda (opcjonalnie)",
    contactLabel: "Twój kontakt (opcjonalnie, tylko na ewentualne pytania)",
    honeypotLabel: "Zostaw puste",
    submitButton: "Wyślij do zatwierdzenia",
    submitting: "Wysyłanie...",
  },
  buildCard: {
    addFavorite: "Dodaj do ulubionych",
    removeFavorite: "Usuń z ulubionych",
    reportPrompt: "Dlaczego zgłaszasz ten build? (opcjonalnie)",
    reported: "Zgłoszono",
    report: "Zgłoś",
  },
};

const ru: Dictionary = {
  common: { loading: "Загрузка..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Обзор меты",
    submit: "Добавить билд",
    admin: "Админ",
    favorites: "Избранное",
    campaignGuide: "Гайд по кампании",
    buildAdvisor: "Build Advisor",
    login: "Войти",
    logout: "Выйти",
  },
  footer: {
    disclaimer:
      "Этот сайт не связан с Grinding Gear Games и не поддерживается ими.",
  },
  cookieConsent: {
    message:
      "Мы используем файлы cookie для показа рекламы. Согласитесь, чтобы разрешить персонализированную рекламу, или откажитесь, чтобы просматривать сайт без неё.",
    accept: "Согласен",
    decline: "Отклонить",
  },
  campaignGuide: {
    title: "Гайд по кампании PoE1",
    subtitle:
      "Карты ключевых мест для каждого акта кампании Path of Exile 1, со ссылками на полные текстовые гайды.",
    videos: {
      secrets: "Секреты кампании А1 – А10",
      walkthroughPart1: "Прохождение кампании, часть 1",
      walkthroughPart2: "Прохождение кампании, часть 2",
    },
    town: "Город",
    boss: "Босс акта",
    fullGuides: "Полные гайды",
    enlarge: "Увеличить",
    close: "Закрыть",
    tipsTitle: "Общие советы по кампании",
    terminologyTitle: "Терминология",
    tips: [
      "Не теряйте время на убийство обычных монстров — старайтесь как можно быстрее выполнять квесты и останавливайтесь только ради групп синих (magic) монстров. Rare (жёлтые) монстры не окупаются, пока вы примерно не доберётесь до Акта 2 и не получите приличный dmg.",
      "Спланируйте билд заранее: подготовьте passive tree в Path of Building или где-то ещё (хотя бы скриншот) и держите его открытым во втором окне, чтобы не думать, куда вкладывать очки.",
      "Движение — это король. Комбинируйте movement skill (Flame Dash, Frostblink, blink arrow и т.п.) с Leap Slam, Shield Charge и чередуйте две Quicksilver Flask, когда просто бежите по локации.",
      "Изучайте расположение зон повторным прохождением — приблизительное знание того, где обычно находится выход относительно входа, сэкономит гораздо больше времени, чем любой отдельный item или flask.",
      "При каждом проходе через город проверяйте торговцев — ищите ботинки с movement speed (можно искать по запросу \"nn\"), кольца и предметы с Life и резистами, а также полезными линками — но не возвращайтесь в город без надобности, только когда выполняете квест.",
      "Первый lab для ascendancy делайте сразу, как только это станет возможно (конец Акта 3), вместо того чтобы откладывать Labyrinth на потом, и постарайтесь пройти Merciless Labyrinth ещё до боя с Kitava в конце Акта 10 — штраф к резистам после него заметно усложнит любой endgame контент.",
      "Приоритет экипировки при левелинге: сначала жизни и резисты, потом damage. Как только резисты достигнут кап (75%), переключите приоритет на жизни, а затем на damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — активируется один раз за зону и позволяет быстро перемещаться между любыми двумя разблокированными waypoint'ами, вместо того чтобы заново проходить весь уровень.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — использование Portal Scroll, скилла Portal, либо простой выход в выбор персонажа и повторный вход — все эти варианты вернут вас в последний город, в котором вы были.",
      },
    ],
    actSummaries: [
      "1. Twilight Strand (держитесь пляжа у воды), убейте Hillock, идите в город (Lioneye's Watch), поговорите с NPC Tarkleigh, заберите награду, у Tarkleigh и Nessa посмотрите магазин на предмет полезной экипировки.\n2. Идите на Coast, дойдите до waypoint, идите в Mud Flats, соберите Roseus Glyph, Ammonite Glyph и Haliotis Glyph из гнёзд Rhoa, активируйте Strange Glyph Wall и идите в Submerged Passage.\n3. Waypoint'ом обратно на Coast, идите на Tidal Island, рядом с waypoint убейте Hailrake — заберите Medicine Chest, выйдите и снова зайдите (это вернёт вас в город) и поговорите с NPC Nessa, она даст вам Quicksilver Flask.\n4. Waypoint'ом в Submerged Passage и найдите Flooded Depths, убейте Dweller of the Deep, используйте лодку рядом для возврата в Submerged Passage, а затем идите в Ledge, здесь пройдите дальше в Climb, найдите вход в Lower Prison.\n5. В Lower Prison идите waypoint'ом в город, заберите награды за квесты и посмотрите новую экипировку у NPC, вернитесь в Lower Prison (раз за лигу: пройдите Trial), а затем идите в Upper Prison, вход в Warden's Quarters, следуйте по крови на полу в Warden's Chambers, убейте Brutus, выйдите и снова зайдите, заберите награды за квест.\n6. Waypoint'ом в Prisoner's Gate, идите в Ship Graveyard, вход в пещеру Ship Graveyard Cave и заберите Allflame в конце локации. Покиньте пещеру, убейте Fairgraves и найдите Cavern of Wrath, waypoint'ом в город и заберите награды.\n7. Waypoint'ом в Cavern of Wrath и найдите вход в Merveil's Lair, убейте босса и идите в Акт II.",
      "1. Идите через выход справа в The Old Fields.\n2. (Опционально) Если у вас ещё нет второй Quicksilver Flask, найдите The Den, найдите и убейте The Great White Beast и возьмите выход за ним обратно в Old Fields. Иначе пропустите эту локацию и идите в The Crossroads.\n3. Идите по дороге, найдёте waypoint, идите наверх в The Chamber of Sins Level 1, найдите вход в The Chamber of Sins Level 2, по пути заберите waypoint, если наткнётесь на него, найдите и пройдите Labyrinth Trial, затем продолжайте, найдите и убейте Fidelitas и заберите Baleful Gem, выйдите и снова зайдите (это вернёт вас в город).\n4. Заберите награду gem у Greust и waypoint'ом вернитесь в The Crossroads. Идите в The Fellshrine Ruins (на карте вниз), найдите The Crypt Level 1, найдите и пройдите Labyrinth Trial, затем продолжайте в The Crypt Level 2, найдите Archbishop Geofri the Abashed (убивать его не нужно, он не часть квеста) и кликните на алтарь за ним ради Golden Hand, заберите её и выйдите и снова зайдите (это вернёт вас в город).\n5. Заберите награду Skill Book у Yeena и телепортируйтесь обратно в Crossroads, на этот раз идите прямо/направо и вход в Broken Bridge. Идите всё время по дороге, встретите бандита Kraityn (убейте его или помогите ему — зависит от вашего билда), выйдите и снова зайдите (это вернёт вас в город).\n6. Идите через выход слева в Riverways, следуйте по дороге, встретите waypoint. Продолжайте вдоль дороги к выходу в Western Forest.\n7. Продолжайте по дороге, пока не найдёте waypoint. Зайдите в лес на противоположной стороне дороги, мимо waypoint. Найдите стену деревьев, покрытую паутиной, и следуйте вдоль неё, пока не найдёте вход в The Weavers Chambers, и войдите внутрь.\n8. Пройдите Weavers Chamber, убейте The Weaver, заберите Maligaros Spike и выйдите.\n9. Заберите награду gem у Silk и телепортируйтесь обратно в Riverways.\n10. Пройдите между 2 колоннами и продолжайте всё время в этом направлении, найдите выход в The Wetlands и войдите внутрь.\n11. Найдите Oak, убейте его или помогите ему. Продолжайте к waypoint и вернитесь им в Western Forest.\n12. На той стороне дороги, где находится waypoint, вы найдёте Alira в её лагере вдоль стены карты. Найдите её и убейте. Если вы помогаете Alira, сделайте это вместо убийства.\n13. Теперь следуйте вдоль стены влево, пока не найдёте лагерь Blackguards. Убейте их лидера, заберите Thaumetic Emblem и используйте его на Thaumetic Seal, затем выйдите.\n14. Waypoint'ом в город Акта 1, заберите награду Skill Book у Tarkleigh. Вернитесь в Акт 2, поговорите с NPC ради наград и телепортируйтесь в The Wetlands.\n15. Отравите корни и войдите в Vaal Ruins, после нахождения сломайте печать и выйдите в Northern Forest.\n16. Продолжайте наверх через Northern Forest, пока не найдёте The Caverns. Dread Thicket пропустите.\n17. Как только наткнётесь на него, заберите waypoint.\n18. Найдите вход в Ancient Pyramid и войдите внутрь.\n19. Поднимайтесь по этажам пирамиды, пока не найдёте Pyramid Apex.\n20. Убейте Vaal Oversoul и выйдите в City of Sarn.\n21. Найдите Blackguards, которые донимают Clarissa, убейте их всех, чтобы её спасти, и подождите, пока она не встанет на ноги. Не забудьте поговорить с ней перед уходом.\n22. Спуститесь по маленькой лестнице сразу под Clarissa, следуйте вдоль края воды, пока не найдёте Sarn Encampment.",
      "1. Выйдите в Slums.\n2. Найдите Crematorium и заберите Waypoint. Если по пути наткнётесь на Sewer Grating, запомните его местоположение.\n3. Найдите Labyrinth Trial в Crematorium и пройдите его.\n4. Найдите Piety и победите её. Взаимодействуйте с Tolman и возьмите Tolman's Bracelet.\n5. Выйдите или телепортируйтесь в город. Поговорите с Clarissa, получите Sewer Keys.\n6. Войдите в Slums и найдите Sewer Grating. Откройте его и войдите в Sewers.\n7. Найдите три Platinum Busts. Всегда один находится перед Waypoint и два — за ним.\n8. Найдите выход в Marketplace.\n9. Заберите Waypoint.\n10. Справа от Waypoint находится вход в Catacombs. Войдите внутрь, пройдите Labyrinth Trial, затем выйдите и через waypoint вернитесь в Marketplace.\n11. Найдите выход в Battlefront.\n12. Найдите Waypoint, обычно посередине локации.\n13. От Waypoint идите вниз, пока не найдёте Blackguard Chest (выглядит как повозка), заберите из него Ribbon Spool.\n14. От waypoint идите налево, пока не найдёте вход в The Docks.\n15. Опционально: если вы отстаёте по уровню, стоит убить как можно больше монстров в доках, чтобы сравняться с уровнем зоны.\n16. Найдите Supply Container и заберите из него Thaumetic Sulphite, затем выйдите.\n17. Waypoint'ом обратно в Battlefront и идите наверх, пока не найдёте вход в Solaris Temple (Level One).\n18. Пройдите через храм, пока не найдёте вход в Solaris Temple (Level Two).\n19. Продолжайте через храм, пока не найдёте Waypoint.\n20. Поговорите с Lady Dialla, получите награду Amulet и Infernal Talc.\n21. Выйдите или телепортируйтесь в город, затем поговорите с Hargan, получите Book of Skill.\n22. Waypoint'ом в Sewers.\n23. От Waypoint идите вниз/налево и сожгите Undying Blockage. Он всегда находится совсем рядом с waypoint.\n24. Войдите в Ebony Barracks и получите Waypoint.\n25. От Waypoint идите наверх через Ebony Barracks, пока не найдёте General Gravicius.\n26. Убейте General Gravicius и продолжайте дальше наверх.\n27. Войдите в Lunaris Temple (Level One).\n28. Заберите Waypoint и войдите в Lunaris Temple (Level Two).\n29. Ищите поднимающуюся лестницу, по ней вы быстро найдёте правильный путь. Следуйте по лестнице, пока не дойдёте до повозок. Сторона с двумя повозками всегда тупик, сторона с одной повозкой — правильный путь.\n31. Убейте Piety и заберите Tower Key.\n32. Вернитесь в город и поговорите с Grigor, получите Book of Skill. Поговорите с Maramoa, получите награду gem.\n33. Waypoint'ом в Ebony Barracks.\n34. От Waypoint идите направо, пока не найдёте вход в Imperial Gardens.\n35. Следуйте по мощёной дороге, пока не найдёте Waypoint.\n36. (Опционально): если вам нужны конкретные gem'ы из квеста Library, на тройной развилке идите по верхней левой дороге наверх по лестнице. Войдите в Library и в середине области заберите Waypoint. Продолжайте, пока не найдёте Loose Candle. Кликните на неё и войдите в The Archives. Соберите все четыре Golden Pages, затем вернитесь в город через портал или выход. Waypoint'ом обратно в Library и поговорите с Siosa ради награды. Waypoint'ом обратно в Imperial Gardens.\n37. Пройдите финальный Labyrinth Trial для Normal Lab. От тройной развилки сразу над Waypoint идите наверх и постепенно зигзагом продвигайтесь влево. Labyrinth Trial почти всегда находится в самом дальнем левом верхнем углу области.\n38. От тройной развилки над waypoint идите вниз направо и наверх по лестнице. Продолжайте направо вверх вдоль мощёной дороги, пока не найдёте вход в Sceptre of God.\n39. Войдите в Sceptre of God и поднимайтесь по этажам, пока не найдёте Upper Sceptre of God.\n40. Войдите в Upper Sceptre of God и поднимайтесь по этажам.\n41. Убейте Dominus.\n42. Войдите в Aqueduct и пройдите область.\n43. Войдите в Highgate.",
      "1. Войдите в The Dried Lake.\n2. Найдите Voll, победите его и возьмите Deshret's Banner. Выйдите или телепортируйтесь в город.\n3. Откройте шахты с помощью Deshret's Banner и войдите в The Mines (Level One).\n4. Пройдите область и войдите в The Mines (Level Two).\n5. Найдите Deshret's Spirit и освободите его.\n6. Войдите в Crystal Veins.\n7. Найдите Waypoint в конце области и вернитесь в Highgate.\n8. Поговорите с Tasuni, получите награду Book of Skill. Поговорите с Oyun, получите награду gem.\n9. Здесь рекомендуем пройти свой первый Labyrinth и сделать Ascend.\n10. Вернитесь через Waypoint в Crystal Veins.\n11. Следующие шаги можно выполнить в любом порядке, по предпочтению. Мы предпочитаем сначала Kaom's Dream, потому что босс там обычно немного менее опасен на низких уровнях.\n• Войдите в Kaom's Dream и пройдите область, пока не дойдёте до Kaom's Stronghold. Получите Waypoint и продолжайте, пока не дойдёте до Caldera of the King. Победите Kaom и заберите Eye of Fury. Вернитесь в город через выход или портал, затем Waypoint'ом в Crystal Veins.\n• Войдите в Daresso's Dream и пройдите область, пока не наткнётесь на Barkhul. Победите его и его телохранителей, затем войдите в The Grand Arena и получите Waypoint. Пройдите через арены, пока не наткнётесь на The Trio, группу трёх уникальных врагов. Это значит, что Daresso находится в следующей области, и это сигнал, что вы на правильном пути. Победите Trio и войдите в The Ring of Blades. Победите Daresso и возьмите Eye of Desire. Выйдите или телепортируйтесь в город, затем Waypoint'ом в Crystal Veins.\n11. Поговорите с Dialla.\n12. Войдите в Belly of the Beast (Level One) и пройдите область.\n13. Войдите в Belly of the Beast (Level Two) и пройдите область.\n14. Войдите в Bowels of the Beast.\n15. Победите Piety.\n16. Войдите в The Harvest и получите Waypoint.\n17. Убейте 3 стражей Malachai: Doedre, Maligaro и Shavronne. Заберите различные органы, которые они оставляют после себя.\n18. Используйте 3 органа, чтобы войти в The Black Core, который находится прямо рядом с Waypoint.\n19. Убейте Malachai.\n20. Выйдите или телепортируйтесь обратно в город.\n21. Поговорите с Dialla в самой верхней части города, получите награду gem.\n22. Выйдите в The Ascent, который находится в верхней правой части Highgate.\n23. Найдите резонатор, взаимодействуйте с ним и заберите Oriath Portal.",
      "1. Заберите Waypoint и пройдите The Slave Pens.\n2. Убейте Overseer Krow и заберитесь по лестнице, которая опустится вниз, в Overseer's Tower.\n3. Поговорите с Lani, получите награду кольцо.\n4. Войдите в Control Blocks.\n5. Найдите Miasmeter. Обычно этот предмет находится примерно посередине зоны, в самой левой части области.\n6. Убейте Justicar Casticus в конце области и заберите Eyes of Zeal.\n7. Войдите в Oriath Square и заберите Waypoint.\n8. Найдите и войдите в Templar Courts.\n9. Пройдите зону и войдите в The Chamber of Innocence, по пути сразу заберите Waypoint.\n10. Найдите The Sanctum of Innocence и убейте High Templar Avarius и Innocence.\n11. Вернитесь в The Chamber of Innocence через новый открывшийся выход.\n12. Войдите в Torched Courts и пройдите область.\n13. Войдите в Ruined Square.\n14. Войдите в Ossuary.\n15. Найдите Sign of Purity и вернитесь в Ruined Square через выход.\n16. Найдите The Reliquary.\n17. Найдите все Kitava's Torments и выйдите или телепортируйтесь в город.\n18. Поговорите с NPC ради наград за квесты.\n19. Вы собираетесь сразиться с Kitava и получите штраф -30% к резистам. Рекомендуется иметь elemental резисты повышенными примерно на 30% сверх лимита, чтобы из-за этого штрафа у вас не было лишних проблем в наступающем акте.\n20. Вернитесь в Ruined Square через Waypoint.\n21. Войдите в Cathedral Rooftop и пройдите область.\n22. Войдите в Cathedral Apex и победите Kitava.\n23. Поговорите с Lily Roth и отплывите во Wraeclast.",
      "1. Выйдите в The Twilight Strand. Зачистите область от всех монстров, выйдите или телепортируйтесь в город и поговорите с Lilly Roth.\n2. Войдите в The Coast и пройдите зону. В конце заберите Waypoint.\n3. Войдите в Mud Flats. Найдите и убейте The Dishonoured Queen и заберите Eye of Conquest.\n4. Найдите выход в Karui Fortress. Обычно он в верхней средней части области.\n5. Войдите в Tukohama's Keep.\n6. Победите Tukohama. Поговорите с Sin и выберите Soul of Tukohama в качестве своего Pantheon Minor God.\n7. Найдите и войдите в The Ridge.\n8. Заберите Waypoint и вернитесь в Lioneye's Watch. Поговорите с Tarkleigh, получите награду Skill Book.\n9. Вернитесь через Waypoint в The Ridge.\n10. Найдите и войдите в Lower Prison, сразу за входом заберите Waypoint.\n11. Найдите Labyrinth Trial и пройдите его.\n12. Найдите и войдите в Shavronne's Tower.\n13. Поднимайтесь по башне, пока не дойдёте до Prison Rooftop.\n14. Убейте Brutus и Shavronne.\n15. Пройдите через Warden's Chambers и войдите в Prisoner's Gate. Заберите Waypoint.\n16. Найдите Valley of the Fire Drinker и победите Abberath. Выйдите или телепортируйтесь в город и поговорите с Bestel ради награды Skill Book. Вернитесь через Waypoint обратно в Prisoner's Gate. Отправляйтесь в противоположном направлении от того, где вы нашли Valley of the Fire Drinker (например, если Abberath справа внизу, идите вправо вверх, и наоборот).\n17. Войдите в Western Forest. Следуйте по главной дороге, пока не найдёте Waypoint.\n18. Найдите и войдите в The Riverways. Следуйте по главной дороге, пока не найдёте Waypoint.\n19. Найдите и войдите в The Wetlands, обычно в верхней части области. Найдите Spawning Ground и убейте Puppet Mistress. Выйдите или телепортируйтесь в город и поговорите с Tarkleigh ради награды Skill Book. Вернитесь через Waypoint в The Riverways.\n20. Найдите и войдите в Southern Forest. Вход обычно посередине/справа внизу области.\n21. Заберите Waypoint, прежде чем выйти в Cavern of Anger.\n22. Откройте Flag Chest и заберите Black Flag.\n23. Войдите в проход и пройдите пещеру, пока не дойдёте до The Beacon. Войдите внутрь и сразу получите Waypoint.\n24. Найдите постройку, напоминающую пирамиду, и поднимитесь по ней. Сопроводите обе колонны на их места, встав в светящийся круг.\n25. Кликните на Ignition Switch, а затем снова на Beacon.\n26. Поговорите с Weylam Roth и отплывите в Brine King's Reef. Заберите Waypoint.\n27. Найдите и войдите в Brine King's Throne. Проще всего следовать вдоль левой стены.\n28. Убейте Brine King. Поговорите с Sin и заберите своего Brine King major Pantheon.\n29. Поговорите с Weylam Roth и отплывите в Акт VII.",
      "1. Войдите в Broken Bridge. Отправляйтесь в направлении левого нижнего угла области.\n2. Войдите в The Crossroads. Следуйте по дороге и посередине зоны заберите Waypoint.\n3. От Waypoint отправляйтесь по нижнему ответвлению и войдите в Fellshrine Ruins.\n4. Войдите в The Crypt и получите Waypoint.\n5. Найдите Labyrinth Trial и пройдите его.\n6. Найдите Sarcophagus и спуститесь в The Crypt (Level Two).\n7. Найдите Container of Sins и заберите Maligaro's Map.\n8. Вернитесь в Bridge Encampment через портал или выход.\n9. Вернитесь через Waypoint в The Crossroads.\n10. От Waypoint отправляйтесь по верхней дороге и войдите в Chamber of Sins (Level 1).\n11. На центральном перекрёстке заберите Waypoint и вложите Maligaro's Map в Map Device.\n12. Войдите в Maligaro's Sanctum и продолжайте, пока не найдёте Maligaro's Workshop.\n13. Убейте Maligaro и заберите Black Venom. Покиньте карту с помощью Portal Scroll.\n14. Поговорите с Silk и заберите Obsidian Key.\n15. Найдите и войдите в Chamber of Sins (Level Two).\n16. Найдите Labyrinth Trial и пройдите его.\n17. Войдите в The Den.\n18. Продолжайте и выйдите в Ashen Fields.\n19. Войдите в Fortress Encampment.\n20. Убейте Greust.\n21. Войдите в Northern Forest.\n22. Заберите Waypoint.\n23. Войдите в Dread Thicket.\n• Войдите в Den of Despair и убейте Gruthkul, затем вернитесь в Dread Thicket.\n• Соберите 7 светлячков (Fireflies) по всему Dread Thicket.\n24. Вернитесь в Bridge Encampment и поговорите с Eramir, получите награду две Books of Skill.\n25. (Опционально): поговорите с Helena, получите Greust's Necklace. Этот квест награждает только амулетом и обычно не занимает больше минуты общего времени, так что решать вам, хотите ли вы пройти его как league starter. Если наткнётесь на Azmeri Shrine в Northern Forest, положите туда ожерелье и поговорите с Helena, когда в следующий раз будете в городе сдавать остальные квесты.\n26. Вернитесь через Waypoint в Northern Forest.\n27. Найдите выход в The Causeway.\n28. Как только наткнётесь на него, заберите Waypoint.\n29. Прежде чем покинуть область, заберите Kishara's Star, обычно прямо у выхода из зоны, в Kishara's Lockbox.\n30. Войдите в Vaal City.\n31. Найдите Yeena. Vaal City для некоторых игроков — обширная и запутанная зона. В ней всегда есть часть, окружённая тупиками, до которой трудно добраться (\"центр\" города, но не всей области). Yeena и Waypoint всегда находятся именно там.\n32. Waypoint'ом вернитесь в город и передайте Kishara's Star Weylam ради награды Skill Book, затем вернитесь в Vaal City.\n33. Поговорите с Yeena и войдите в Temple of Decay (Level One).\n34. Войдите в Temple of Decay (Level Two).\n35. Войдите в Arakaali's Web.\n36. Убейте Arakaali.\n37. Войдите в Sarn Ramparts.\n38. Войдите в Sarn Encampment.\n39. Здесь рекомендуем пройти второй Labyrinth.",
      "1. Войдите в Toxic Conduits.\n2. Найдите и войдите в Doedre's Cesspool.\n3. Откройте решётку и войдите в The Cauldron.\n4. Убейте Doedre the Vile.\n5. Выйдите в Sewer Outlet и заберите Waypoint.\n6. Отправляйтесь по правой дороге и войдите в The Quay.\n7. Откройте Sealed Casket и заберите Ankh of Eternity. Ankh обычно находится рядом со входом в зону, ищите длинный мост.\n8. Найдите и войдите в Ressurection Site и убейте Tolman.\n9. Поговорите с Clarissa.\n10. Вернитесь в The Quay.\n11. Войдите в Grain Gate и заберите Waypoint. Идите \"наверх\" через зону, примерно вдоль правой верхней стены области.\n12. Убейте Gemling Legionnaires.\n13. Войдите в Imperial Fields и следуйте по главной дороге, пока не найдёте Waypoint.\n14. Вернитесь в Sarn Encampment. Поговорите с Clarissa и Maramoa ради наград Book of Skill. Поговорите с Hargan ради награды кольцо.\n15. Вернитесь в Imperial Fields.\n16. Войдите в Solaris Temple (Level One).\n17. Если наткнётесь на него, получите Waypoint.\n18. Войдите в Solaris Temple (Level Two).\n19. Убейте Dawn и заберите Sun Orb. Выйдите или телепортируйтесь в город.\n20. Вернитесь через Waypoint в Solaris Temple (Level One).\n21. Найдите и войдите в The Solaris Concourse.\n22. Пройдите, получите Waypoint и войдите в The Harbour Bridge.\n23. Пройдите и войдите в The Lunaris Concourse.\n24. Получите Waypoint и войдите в The Bath House.\n25. Найдите Labyrinth Trial и пройдите его.\n26. Войдите в High Gardens и продолжайте, пока не наткнётесь на Pools of Terror. Войдите внутрь и убейте Yugul. Выйдите или телепортируйтесь в город.\n27. Поговорите с Hargan ради награды Skill Book. Вернитесь через Waypoint в Lunaris Concourse.\n28. Войдите в Lunaris Temple (Level 1). Путь к Lunaris Temple такой же, как в Акте III, всегда достаточно идти наверх, пока не наткнётесь на него.\n29. Получите Waypoint, затем войдите в Lunaris Temple (Level 2).\n30. Убейте Dusk и заберите Moon Orb, затем выйдите или телепортируйтесь в город.\n31. Вернитесь через Waypoint в Lunaris Concourse.\n32. Войдите в Harbour Bridge.\n33. Войдите в Sky Shrine.\n34. Убейте Solaris и Lunaris.\n35. Войдите в Blood Aqueducts.\n36. Войдите в Highgate.",
      "1. Войдите в The Descent и отправляйтесь направо.\n2. Спускайтесь через Supply Hoists, пока не найдёте выход в Vastiri Desert.\n3. Найдите и получите Waypoint.\n4. Найдите Storm Weathered Chest. Победите волны мумий, которые на вас нападут, затем заберите Storm Blade.\n5. Вернитесь в город с помощью Portal Scroll и поговорите с Petarus и Vanja. Поговорите с Sin, затем снова с Petarus и Vanja, заберите Bottled Storm. Используйте свой портал и вернитесь в Vastiri Desert.\n6. Найдите вход в The Oasis, который теперь будет доступен с помощью Bottled Storm.\n7. Пройдите область и войдите в Sand Pit. Убейте Shakari и выйдите или телепортируйтесь в город.\n8. Поговорите с Irasha ради награды Skill Book. Вернитесь через Waypoint в Vastiri Desert.\n9. Войдите в The Foothills.\n10. Найдите Waypoint, обычно в верхней правой части области.\n11. Войдите в Boiling Lake.\n12. Убейте Basilisk и заберите Basilisk Acid. Вы поймёте, что находитесь в области с Basilisk, как только начнёте встречать группы окаменевших врагов.\n13. Выйдите или телепортируйтесь в город и вернитесь через Waypoint в The Foothills.\n14. Войдите в The Tunnel, обычно в верхней или верхней левой части области.\n15. Получите Waypoint.\n16. Найдите Labyrinth Trial и пройдите его.\n17. Войдите в The Quarry. Бегите прямо в центр зоны и получите Waypoint.\n18. Эти шаги можно выполнить в любом порядке, в зависимости от того, на что наткнётесь раньше.\n• Войдите в The Refinery.\n• Опционально: если вам нужен крафт Trigger a Socketed Spell when you Use a Skill, ищите эту решётку, она приведёт вас под землю в область с крафтом.\n• Исследуйте область, пока не найдёте General Adus, затем убейте его. Он находится в собственной небольшой арене, обычно в верхней или верхней левой части области. Обычно вы найдёте его быстрее, если с самого начала области пойдёте по левой дороге. Взаимодействуйте с Theurgic Precipitate Machine и заберите Trarthan Powder. Используйте портал или выйдите, затем через Waypoint вернитесь в The Quarry.\n• Войдите в Shrine of the Winds и убейте Garukhan. Вернитесь в город через портал или выход, затем поговорите с Irasha ради награды Skill Book. Вернитесь через Waypoint в The Quarry.\n15. Поговорите с Sin и войдите в Belly of the Beast.\n16. Войдите в Rotting Core и пройдите область.\n17. Войдите в Black Core и поговорите с Sin.\n18. Войдите поочерёдно во все порталы по своему выбору и победите стражей Malachai (Shavronne, Maligaro и Doedre).\n19. Войдите в Black Heart и убейте Depraved Trinity.\n20. Поговорите с Lilly Roth и отплывите в Oriath.",
      "1. Войдите в Cathedral Rooftop.\n2. Войдите в Cathedral Apex, сразу налево после входа в область rooftop.\n3. Убейте Cultists и Gargoyles, чтобы освободить Bannon.\n4. Вернитесь в Cathedral Rooftop и отправляйтесь направо.\n5. Войдите в Ravaged Square.\n6. Идите вниз и направо, пока не найдёте вход в Control Blocks, и войдите внутрь.\n7. Заберите Waypoint, затем найдите Vilenta, примерно там, где в Акте V был Miasmeter. Убейте Vilenta, выйдите или телепортируйтесь в город.\n8. Поговорите с Lani ради награды Book of Skill и возьмите Waypoint в Control Blocks и выйдите в Ravaged Square.\n9. Идите наверх, пока не наткнётесь на Waypoint, заберите его и войдите в Ossuary.\n10. Найдите Labyrinth Trial и пройдите его, он рядом с Waypoint, затем выйдите или телепортируйтесь в город. Опционально: рядом с Waypoint также есть Elixir of Allure (награда respec point).\n11. Waypoint'ом в Ravaged Square, найдите и войдите в Torched Courts и пройдите область.\n12. Войдите в Desecrated Chambers, которые имеют похожую планировку на Chambers of Innocence из Акта V. Сразу заберите Waypoint.\n13. Найдите и убейте Avarius, Reassembled.\n14. Вернитесь через Waypoint в Oriath Docks.\n15. Поговорите с Bannon, затем поговорите с Lani, получите награды Flask и Armor.\n16. Здесь рекомендуем пройти третий labyrinth, чтобы закончить его до того, как вас снова настигнет Kitava's Affliction. Убедитесь, что ваши elemental резисты на 30% выше лимита, чтобы не иметь проблем после приближающейся смерти Kitava.\n17. Поговорите с Innocence.\n18. Вернитесь в Ravaged Square и идите наверх, пока не найдёте Innocence. Поговорите с ним.\n19. Войдите в Canals и пройдите область.\n20. Войдите в The Feeding Trough и пройдите область.\n21. Поговорите с Sin и войдите в Altar of Hunger.\n22. Убейте Kitava.\n23. Поговорите с Lani в Oriath, получите награду Skill Book.",
    ],
  },
  home: {
    title: "Поиск билдов",
    subtitle:
      "Мета-поисковик билдов для Path of Exile 1 и 2 по Reddit, YouTube, форумам и сообществу.",
    searchPlaceholder: "Поиск по названию и описанию...",
    classPlaceholder: "Класс",
    ascendancyPlaceholder: "Асцендант",
    creatorPlaceholder: "Автор контента (напр. Zizaran)",
    mainSkillPlaceholder: "Основной навык",
    leaguePlaceholder: "Лига / патч",
    tagsPlaceholder: "Теги",
    searchButton: "Искать",
    resetButton: "Сбросить фильтры",
    saveFilterButton: "Сохранить фильтр",
    saveFilterPrompt: "Название сохранённого фильтра:",
    saveFilterSuccess: "Фильтр сохранён — найдёшь его на странице Аккаунт.",
    saveFilterError: "Не удалось сохранить фильтр.",
    loadError: "Не удалось загрузить билды.",
    loading: "Загрузка...",
    noResults: "Ни один билд не подходит под фильтры. Попробуй ослабить их или",
    addYourOwn: "добавь свой",
    notFoundHint: "Не нашёл то, что искал? Попробуй также",
    prev: "Назад",
    next: "Далее",
    pageInfo: "Страница {page} из {totalPages} ({total} билдов)",
  },
  news: {
    title: "Новости PoE",
    subtitle: "Последние официальные анонсы Path of Exile и Path of Exile 2.",
    viewAll: "Все новости",
    source: "Официальные новости",
    loading: "Загрузка новостей...",
    error: "Не удалось загрузить новости.",
  },
  games: { all: "Все игры", poe1: "Path of Exile 1", poe2: "Path of Exile 2" },
  sources: {
    all: "Все источники",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "Форум PoE",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Сообщество",
    maxroll: "Maxroll",
    poevault: "PoE Vault",
    mobalytics: "Mobalytics",
  },
  sorts: {
    date: "Новые",
    popularity: "Популярные",
    relevance: "Релевантность (нужен текст поиска)",
  },
  meta: {
    title: "Обзор меты",
    subtitle: "Самые популярные одобренные билды по лиге/патчу.",
    noLeague: "Нет доступной лиги",
    loading: "Загрузка...",
    noBuilds: "Для этой лиги пока нет билдов.",
  },
  favorites: {
    title: "Мои избранные билды",
    loading: "Загрузка...",
    loginPrompt: "Чтобы увидеть избранные билды,",
    loginLink: "войди",
    empty: "Пока пусто —",
    findBuild: "найди билд",
  },
  account: {
    loginTitle: "Вход",
    registerTitle: "Регистрация",
    authHint:
      "Аккаунт нужен только для избранного и сохранённых фильтров. Ради собственной безопасности НЕ ИСПОЛЬЗУЙТЕ никакие свои настоящие аккаунты!",
    email: "Email",
    password: "Пароль",
    loginButton: "Войти",
    registerButton: "Зарегистрироваться",
    switchToRegister: "Нет аккаунта? Зарегистрируйся",
    switchToLogin: "Уже есть аккаунт? Войти",
    genericError: "Что-то пошло не так.",
    accountTitle: "Аккаунт",
    logout: "Выйти",
    myFavorites: "Мои избранные билды →",
    savedFilters: "Сохранённые фильтры",
    loading: "Загрузка...",
    noFilters:
      "Пока пусто — сохрани фильтр на главной странице кнопкой «Сохранить фильтр».",
    newMatches: "новых",
    markSeen: "Отметить как просмотренное",
    delete: "Удалить",
  },
  admin: {
    loginTitle: "Вход для админа",
    invalidCreds: "Неверные учётные данные.",
    username: "Логин",
    password: "Пароль",
    loginButton: "Войти",
    queueTitle: "Билды, ожидающие одобрения",
    logout: "Выйти",
    loading: "Загрузка...",
    listError: "Не удалось загрузить очередь модерации.",
    emptyQueue: "Очередь пуста.",
    tags: "Теги",
    author: "Автор",
    contact: "Контакт",
    pob: "PoB",
    approve: "Одобрить",
    reject: "Отклонить",
    rejectPrompt: "Комментарий к отклонению (необязательно):",
    actionFailed: "Действие не удалось.",
    reportsTitle: "Жалобы на контент",
    noReports: "Открытых жалоб нет.",
    reason: "Причина",
    removeBuild: "Удалить билд",
    dismissReport: "Отклонить жалобу",
    bulkAddTitle: "Массовое добавление внешних ссылок",
    bulkAddHint:
      "Для сайтов, которые нельзя автоматически сканировать (например, Maxroll) — просмотри сайт сам, затем вставь сюда по одному билду на строку: название | url | игра (poe1/poe2) | класс | тип билда | лига | заметка. Обязательны только название, url и игра, остальное можно оставить пустым между разделителями. Строки публикуются сразу, без очереди модерации.",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Танк, хороший клир и боссинг",
    bulkAddSourceLabel: "Сайт-источник",
    bulkAddSubmit: "Загрузить",
    bulkAddRunning: "Загрузка...",
    bulkAddResultsTitle: "Результаты",
    bulkAddSuccess: "добавлено",
    bulkAddError: "ошибка",
  },
  submit: {
    title: "Добавить билд",
    subtitle:
      "Вставь ссылку на свой билд (экспорт PoB, видео на YouTube, пост на Reddit, собственный гайд). Форма анонимная — контакт ниже необязателен. Билд появится публично только после ручного одобрения.",
    success: "Спасибо! Билд отправлен и ожидает одобрения.",
    rateLimited:
      "С этого адреса отправлено слишком много билдов, попробуй позже.",
    genericError: "Что-то пошло не так, попробуй ещё раз.",
    connectionError: "Не удалось подключиться к серверу.",
    titleLabel: "Название билда",
    linkLabel: "Ссылка (PoB, YouTube, Reddit, гайд...)",
    gameLabel: "Игра",
    classLabel: "Класс",
    ascendancyLabel: "Асцендант",
    mainSkillLabel: "Основной навык",
    leaguePatchLabel: "Лига / патч",
    leaguePatchPlaceholder: "напр. 3.29",
    tagsLabel: "Теги (через запятую)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Ссылка на экспорт PoB (необязательно)",
    pobCodeLabel: "Код экспорта PoB (необязательно, для автостатистики)",
    pobCodePlaceholder:
      "Вставь код из Path of Building → Export Build → Generate & copy code…",
    pobCodeHint:
      "Не вставляй сюда ссылку — только сам скопированный код. Он используется для автозаполнения класса/асценданта/основного навыка и DPS/Life/EHP, если указан.",
    authorLabel: "Автор билда (необязательно)",
    contactLabel: "Твой контакт (необязательно, только для возможных вопросов)",
    honeypotLabel: "Оставь пустым",
    submitButton: "Отправить на одобрение",
    submitting: "Отправка...",
  },
  buildCard: {
    addFavorite: "Добавить в избранное",
    removeFavorite: "Убрать из избранного",
    reportPrompt: "Почему ты жалуешься на этот билд? (необязательно)",
    reported: "Отправлено",
    report: "Пожаловаться",
  },
};

const de: Dictionary = {
  common: { loading: "Lade..." },
  nav: {
    brand: "PoE Build Finder",
    meta: "Meta-Übersicht",
    submit: "Build einreichen",
    admin: "Admin",
    favorites: "Favoriten",
    campaignGuide: "Kampagnenführer",
    buildAdvisor: "Build Advisor",
    login: "Anmelden",
    logout: "Abmelden",
  },
  footer: {
    disclaimer:
      "Diese Seite steht in keiner Verbindung zu Grinding Gear Games und wird nicht von ihnen unterstützt.",
  },
  cookieConsent: {
    message:
      "Wir verwenden Cookies, um Werbung anzuzeigen. Stimme zu, um personalisierte Werbung zuzulassen, oder lehne ab, um ohne sie weiter zu surfen.",
    accept: "Zustimmen",
    decline: "Ablehnen",
  },
  campaignGuide: {
    title: "PoE1 Kampagnenführer",
    subtitle:
      "Karten mit wichtigen Orten für jeden Akt der Path of Exile 1 Kampagne, mit Links zu vollständigen Guides.",
    videos: {
      secrets: "Kampagnen-Geheimnisse A1 – A10",
      walkthroughPart1: "Kampagnen-Walkthrough, Teil 1",
      walkthroughPart2: "Kampagnen-Walkthrough, Teil 2",
    },
    town: "Stadt",
    boss: "Akt-Boss",
    fullGuides: "Vollständige Guides",
    enlarge: "Vergrößern",
    close: "Schließen",
    tipsTitle: "Allgemeine Kampagnen-Tipps",
    terminologyTitle: "Begriffe",
    tips: [
      "Verschwendet keine Zeit mit dem Töten gewöhnlicher Monster — versucht, die Quests so schnell wie möglich zu erledigen, und haltet nur für Gruppen von blauen (magic) Monstern an. Rare (gelbe) Monster lohnen sich erst ab ungefähr Akt 2, wenn ihr anständigen Schaden habt.",
      "Plant euren Build im Voraus: Bereitet euch einen Passiv-Tree in Path of Building oder anderswo vor (zumindest einen Screenshot) und lasst ihn in einem zweiten Fenster geöffnet, damit ihr nicht überlegen müsst, wo ihr Punkte hinsetzt.",
      "Bewegung ist König. Kombiniert einen Movement-Skill (Flame Dash, Frostblink, Blink Arrow o. ä.) mit Leap Slam, Shield Charge und wechselt zwischen zwei Quicksilver Flasks, sobald ihr nur durch eine Zone rennt.",
      "Lernt das Layout der einzelnen Zonen durch wiederholtes Spielen — ein ungefähres Wissen darüber, wo der Ausgang im Verhältnis zum Eingang liegt, spart viel mehr Zeit als jeder einzelne Gegenstand oder jede Flask.",
      "Überprüft bei jedem Stadtdurchgang die Händler — sucht nach Stiefeln mit Movement Speed (lässt sich mit \"nn\" suchen), Ringen und Gegenständen mit Life und Resistances sowie nützlichen Links — kehrt aber nicht unnötig in die Stadt zurück, sondern nur, wenn ihr eine Quest abschließt.",
      "Macht das erste Lab für die Ascendancy, sobald es möglich ist (Ende von Akt 3), anstatt euch das Labyrinth für später aufzuheben, und versucht, das Merciless Labyrinth noch vor dem Kampf gegen Kitava am Ende von Akt 10 abzuschließen — der Resistance-Malus danach erschwert jeglichen Endgame-Content spürbar.",
      "Prioritäten bei der Ausrüstung während des Levelns: zuerst Life und Resistances, dann Damage. Sobald eure Resistances am Cap sind (75 %), verschiebt die Priorität auf Life und danach auf Damage.",
    ],
    terminology: [
      {
        term: "WP",
        meaning:
          "Waypoint — wird einmal pro Zone aktiviert und ermöglicht schnelles Reisen zwischen zwei beliebigen freigeschalteten Waypoints, anstatt die gesamte Ebene erneut durchqueren zu müssen.",
      },
      {
        term: "TP",
        meaning:
          "Teleport/Portal — die Verwendung eines Portal Scrolls, des Skills Portal, oder einfaches Verlassen zur Charakterauswahl und erneutes Laden — all diese Möglichkeiten bringen euch zurück in die letzte Stadt, in der ihr wart.",
      },
    ],
    actSummaries: [
      "1. Twilight Strand (haltet euch am Strand am Wasser), tötet Hillock, geht in die Stadt (Lioneye's Watch), sprecht mit NPC Tarkleigh, holt euch die Belohnung, schaut euch bei Tarkleigh und Nessa nach nützlicher Ausrüstung um.\n2. Geht zur Coast, erreicht den Waypoint, geht zu Mud Flats, sammelt Roseus Glyph, Ammonite Glyph und Haliotis Glyph aus den Rhoa-Nestern, aktiviert die Strange Glyph Wall und geht zu Submerged Passage.\n3. Per Waypoint zurück zur Coast, geht zu Tidal Island, in der Nähe des Waypoints tötet Hailrake – sammelt die Medicine Chest, loggt euch aus und wieder ein (dadurch kehrt ihr in die Stadt zurück) und sprecht mit NPC Nessa, sie gibt euch eine Quicksilver Flask.\n4. Per Waypoint zu Submerged Passage und findet Flooded Depths, tötet den Dweller of the Deep, benutzt das Boot in der Nähe, um zu Submerged Passage zurückzukehren, und geht dann zu Ledge, lauft hier weiter zu Climb, findet den Eingang zu Lower Prison.\n5. Geht in Lower Prison per Waypoint in die Stadt, holt euch die Quest-Belohnungen ab und schaut euch die neue Ausrüstung bei den NPCs an, kehrt zu Lower Prison zurück (einmal pro Liga: schließt den Trial ab) und geht dann zu Upper Prison, betretet Warden's Quarters, folgt dem Blut auf dem Boden zu Warden's Chambers, tötet Brutus, loggt euch aus und wieder ein, holt euch die Quest-Belohnungen.\n6. Per Waypoint zu Prisoner's Gate, geht zu Ship Graveyard, betretet die Höhle Ship Graveyard Cave und sammelt Allflame am Ende der Zone. Verlasst die Höhle, tötet Fairgraves und findet Cavern of Wrath, geht per Waypoint in die Stadt und holt euch die Belohnungen.\n7. Per Waypoint zu Cavern of Wrath und findet den Eingang zu Merveil's Lair, tötet den Boss und geht in Akt II.",
      "1. Geht durch den Ausgang rechts zu The Old Fields.\n2. (Optional) Wenn ihr noch keine zweite Quicksilver Flask habt, findet The Den, findet und tötet The Great White Beast und nehmt den Ausgang dahinter zurück zu Old Fields. Andernfalls überspringt diese Zone und geht weiter zu The Crossroads.\n3. Folgt dem Weg, ihr findet einen Waypoint, geht hinauf zu The Chamber of Sins Level 1, findet den Eingang zu The Chamber of Sins Level 2, sammelt unterwegs den Waypoint, falls ihr darauf stoßt, findet und schließt den Labyrinth Trial ab, dann geht weiter, findet und tötet Fidelitas und sammelt Baleful Gem, loggt euch aus und wieder ein (dadurch kehrt ihr in die Stadt zurück).\n4. Holt euch die Gem-Belohnung von Greust ab und geht per Waypoint zurück zu The Crossroads. Geht zu The Fellshrine Ruins (auf der Karte nach unten), findet The Crypt Level 1, findet und schließt den Labyrinth Trial ab, dann geht weiter zu The Crypt Level 2, findet Archbishop Geofri the Abashed (ihr müsst ihn nicht töten, er ist nicht Teil der Quest) und klickt auf den Altar hinter ihm für die Golden Hand, sammelt sie und loggt euch aus und wieder ein (dadurch kehrt ihr in die Stadt zurück).\n5. Holt euch die Skill-Book-Belohnung von Yeena ab und teleportiert euch zurück zu Crossroads, diesmal geht geradeaus/nach rechts und betretet Broken Bridge. Folgt weiter dem Weg, ihr trefft den Bandit Kraityn (tötet ihn oder helft ihm — abhängig von eurem Build), loggt euch aus und wieder ein (dadurch kehrt ihr in die Stadt zurück).\n6. Geht durch den Ausgang links zu Riverways, folgt dem Weg, ihr trefft einen Waypoint. Folgt weiter dem Weg zum Ausgang nach Western Forest.\n7. Folgt dem Weg, bis ihr einen Waypoint findet. Lauft in den Wald auf der gegenüberliegenden Seite des Weges, abseits des Waypoints. Findet eine mit Spinnweben bedeckte Baumwand und folgt ihr, bis ihr den Eingang zu The Weavers Chambers findet, und betretet ihn.\n8. Durchquert die Weavers Chamber, tötet The Weaver, sammelt Maligaros Spike und loggt euch aus.\n9. Holt euch die Gem-Belohnung von Silk ab und teleportiert euch zurück zu Riverways.\n10. Geht zwischen 2 Säulen hindurch und folgt weiter dieser Richtung, findet den Ausgang zu The Wetlands und betretet ihn.\n11. Findet Oak, tötet ihn oder helft ihm. Geht weiter zum Waypoint und kehrt per Waypoint zurück nach Western Forest.\n12. Auf der Seite des Weges, auf der der Waypoint liegt, findet ihr Alira in ihrem Lager entlang der Kartenwand. Findet sie und tötet sie. Wenn ihr Alira stattdessen helft, tut das.\n13. Folgt nun der Wand nach links, bis ihr das Lager der Blackguards findet. Tötet ihren Anführer, sammelt das Thaumetic Emblem und benutzt es am Thaumetic Seal, dann loggt euch aus.\n14. Per Waypoint in die Stadt von Akt 1, holt euch die Skill-Book-Belohnung von Tarkleigh ab. Kehrt zurück nach Akt 2, sprecht mit den NPCs für Belohnungen und teleportiert euch zu The Wetlands.\n15. Vergiftet die Wurzeln und betretet Vaal Ruins, sobald ihr es gefunden habt, brecht das Siegel und geht hinaus nach Northern Forest.\n16. Geht weiter hinauf durch Northern Forest, bis ihr The Caverns findet. Überspringt Dread Thicket.\n17. Sobald ihr darauf stoßt, sammelt den Waypoint.\n18. Findet den Eingang zu Ancient Pyramid und betretet ihn.\n19. Steigt die Stockwerke der Pyramide hinauf, bis ihr Pyramid Apex findet.\n20. Tötet den Vaal Oversoul und geht hinaus nach City of Sarn.\n21. Findet die Blackguards, die Clarissa belästigen, tötet sie alle, um sie zu retten, und wartet, bis sie wieder auf den Beinen steht. Vergesst nicht, mit ihr zu sprechen, bevor ihr geht.\n22. Geht die kleine Treppe direkt unter Clarissa hinunter, folgt dem Wasserrand, bis ihr Sarn Encampment findet.",
      "1. Geht hinaus zu Slums.\n2. Findet Crematorium und sammelt den Waypoint. Wenn ihr unterwegs auf ein Sewer Grating stoßt, merkt euch seine Position.\n3. Findet den Labyrinth Trial in Crematorium und schließt ihn ab.\n4. Findet Piety und besiegt sie. Interagiert mit Tolman und nehmt Tolman's Bracelet.\n5. Loggt euch aus oder teleportiert euch in die Stadt. Sprecht mit Clarissa, ihr erhaltet die Sewer Keys.\n6. Betretet Slums und findet das Sewer Grating. Öffnet es und betretet Sewers.\n7. Findet drei Platinum Busts. Es befindet sich immer einer vor dem Waypoint und zwei dahinter.\n8. Findet den Ausgang zu Marketplace.\n9. Sammelt den Waypoint.\n10. Rechts vom Waypoint befindet sich der Eingang zu Catacombs. Betretet ihn, schließt den Labyrinth Trial ab, dann loggt euch aus und kehrt per Waypoint zurück zu Marketplace.\n11. Findet den Ausgang zu Battlefront.\n12. Findet den Waypoint, meist in der Mitte der Zone.\n13. Geht vom Waypoint nach unten, bis ihr die Blackguard Chest findet (sieht aus wie ein Wagen), sammelt daraus die Ribbon Spool.\n14. Geht vom Waypoint nach links, bis ihr den Eingang zu The Docks findet.\n15. Optional: Wenn ihr mit dem Level hinterherhinkt, lohnt es sich, in den Docks so viele Monster wie möglich zu töten, um euch auf das Level der Zone anzugleichen.\n16. Findet den Supply Container und sammelt daraus Thaumetic Sulphite, dann loggt euch aus.\n17. Per Waypoint zurück zu Battlefront und geht hinauf, bis ihr den Eingang zu Solaris Temple (Level One) findet.\n18. Durchquert den Tempel, bis ihr den Eingang zu Solaris Temple (Level Two) findet.\n19. Geht weiter durch den Tempel, bis ihr einen Waypoint findet.\n20. Sprecht mit Lady Dialla, ihr erhaltet die Belohnung Amulet und Infernal Talc.\n21. Loggt euch aus oder teleportiert euch in die Stadt, dann sprecht mit Hargan, ihr erhaltet ein Book of Skill.\n22. Per Waypoint zu Sewers.\n23. Geht vom Waypoint nach unten/links und verbrennt die Undying Blockage. Sie befindet sich immer ganz in der Nähe des Waypoints.\n24. Betretet Ebony Barracks und erhaltet den Waypoint.\n25. Geht vom Waypoint hinauf durch Ebony Barracks, bis ihr General Gravicius findet.\n26. Tötet General Gravicius und geht weiter hinauf.\n27. Betretet Lunaris Temple (Level One).\n28. Sammelt den Waypoint und betretet Lunaris Temple (Level Two).\n29. Sucht nach aufsteigenden Treppen, anhand derer ihr schnell den richtigen Weg findet. Folgt den Treppen, bis ihr zu Wagen kommt. Die Seite mit zwei Wagen ist immer eine Sackgasse, die Seite mit einem Wagen ist der richtige Weg.\n31. Tötet Piety und sammelt den Tower Key.\n32. Kehrt in die Stadt zurück und sprecht mit Grigor, ihr erhaltet ein Book of Skill. Sprecht mit Maramoa, ihr erhaltet eine Gem-Belohnung.\n33. Per Waypoint zu Ebony Barracks.\n34. Geht vom Waypoint nach rechts, bis ihr den Eingang zu Imperial Gardens findet.\n35. Folgt dem gepflasterten Weg, bis ihr einen Waypoint findet.\n36. (Optional): Wenn ihr bestimmte Gems aus der Library-Quest braucht, geht an der dreifachen Kreuzung den oberen linken Weg hinauf über die Treppe. Betretet Library und sammelt in der Mitte des Bereichs den Waypoint. Geht weiter, bis ihr eine Loose Candle findet. Klickt darauf und betretet The Archives. Sammelt alle vier Golden Pages, dann kehrt per Portal oder durch Ausloggen in die Stadt zurück. Per Waypoint zurück zu Library und sprecht mit Siosa für eine Belohnung. Per Waypoint zurück zu Imperial Gardens.\n37. Schließt den finalen Labyrinth Trial für das Normal Lab ab. Geht von der dreifachen Kreuzung direkt über dem Waypoint nach oben und bewegt euch schrittweise im Zickzack nach links. Der Labyrinth Trial befindet sich fast immer in der äußersten oberen linken Ecke des Bereichs.\n38. Geht von der dreifachen Kreuzung über dem Waypoint nach unten rechts und die Treppe hinauf. Folgt weiter dem gepflasterten Weg nach oben rechts, bis ihr den Eingang zu Sceptre of God findet.\n39. Betretet Sceptre of God und steigt die Stockwerke hinauf, bis ihr Upper Sceptre of God findet.\n40. Betretet Upper Sceptre of God und steigt die Stockwerke hinauf.\n41. Tötet Dominus.\n42. Betretet Aqueduct und durchquert den Bereich.\n43. Betretet Highgate.",
      "1. Betretet The Dried Lake.\n2. Findet Voll, besiegt ihn und nehmt Deshret's Banner. Loggt euch aus oder teleportiert euch in die Stadt.\n3. Öffnet die Minen mit Deshret's Banner und betretet The Mines (Level One).\n4. Durchquert den Bereich und betretet The Mines (Level Two).\n5. Findet Deshret's Spirit und befreit ihn.\n6. Betretet Crystal Veins.\n7. Findet den Waypoint am Ende des Bereichs und kehrt nach Highgate zurück.\n8. Sprecht mit Tasuni, ihr erhaltet ein Book of Skill als Belohnung. Sprecht mit Oyun, ihr erhaltet eine Gem-Belohnung.\n9. Hier empfehlen wir, euer erstes Labyrinth abzuschließen und zu Ascenden.\n10. Kehrt per Waypoint zurück zu Crystal Veins.\n11. Die folgenden Schritte könnt ihr in beliebiger Reihenfolge erledigen, je nach Vorliebe. Wir bevorzugen zuerst Kaom's Dream, weil der Boss auf niedrigeren Levels meist etwas weniger gefährlich ist.\n• Betretet Kaom's Dream und durchquert den Bereich, bis ihr Kaom's Stronghold erreicht. Erhaltet den Waypoint und geht weiter, bis ihr Caldera of the King erreicht. Besiegt Kaom und sammelt Eye of Fury. Kehrt per Ausloggen oder Portal in die Stadt zurück, dann per Waypoint zu Crystal Veins.\n• Betretet Daresso's Dream und durchquert den Bereich, bis ihr auf Barkhul stoßt. Besiegt ihn und seine Bodyguards, dann betretet The Grand Arena und erhaltet den Waypoint. Durchquert die Arenen, bis ihr auf The Trio stoßt, eine Gruppe von drei einzigartigen Gegnern. Das bedeutet, dass Daresso sich im nächsten Bereich befindet, und ist ein Zeichen, dass ihr auf dem richtigen Weg seid. Besiegt das Trio und betretet The Ring of Blades. Besiegt Daresso und nehmt Eye of Desire. Loggt euch aus oder teleportiert euch in die Stadt, dann per Waypoint zu Crystal Veins.\n11. Sprecht mit Dialla.\n12. Betretet Belly of the Beast (Level One) und durchquert den Bereich.\n13. Betretet Belly of the Beast (Level Two) und durchquert den Bereich.\n14. Betretet Bowels of the Beast.\n15. Besiegt Piety.\n16. Betretet The Harvest und erhaltet den Waypoint.\n17. Tötet Malachais 3 Wächter: Doedre, Maligaro und Shavronne. Sammelt die verschiedenen Organe, die sie fallen lassen.\n18. Benutzt die 3 Organe, um The Black Core zu betreten, das ihr direkt neben dem Waypoint findet.\n19. Tötet Malachai.\n20. Loggt euch aus oder teleportiert euch zurück in die Stadt.\n21. Sprecht mit Dialla im obersten Teil der Stadt, ihr erhaltet eine Gem-Belohnung.\n22. Geht hinaus zu The Ascent, das ihr im oberen rechten Teil von Highgate findet.\n23. Findet den Resonator, interagiert mit ihm und nehmt das Oriath Portal.",
      "1. Sammelt den Waypoint und durchquert The Slave Pens.\n2. Tötet Overseer Crow und klettert die Leiter hinauf, die sich nach unten senkt, zu Overseer's Tower.\n3. Sprecht mit Lani, ihr erhaltet einen Ring als Belohnung.\n4. Betretet Control Blocks.\n5. Findet den Miasmeter. Dieser Gegenstand befindet sich meist ungefähr in der Mitte der Zone, im äußersten linken Teil des Bereichs.\n6. Tötet Justicar Casticus am Ende des Bereichs und sammelt Eyes of Zeal.\n7. Betretet Oriath Square und sammelt den Waypoint.\n8. Findet und betretet Templar Courts.\n9. Durchquert die Zone und betretet The Chamber of Innocence, sammelt unterwegs sofort den Waypoint.\n10. Findet The Sanctum of Innocence und tötet High Templar Avarius und Innocence.\n11. Betretet The Chamber of Innocence erneut durch den neu geöffneten Ausgang.\n12. Betretet Torched Courts und durchquert den Bereich.\n13. Betretet Ruined Square.\n14. Betretet Ossuary.\n15. Findet das Sign of Purity und kehrt über den Ausgang zu Ruined Square zurück.\n16. Findet The Reliquary.\n17. Findet alle Kitavas Qualen (Kitava's Torments) und loggt euch aus oder teleportiert euch in die Stadt.\n18. Sprecht mit den NPCs für Quest-Belohnungen.\n19. Ihr steht kurz vor dem Kampf gegen Kitava und erhaltet einen Malus von -30 % auf die Resistances. Es wird empfohlen, die elementaren Resistances um ungefähr 30 % über das Limit zu erhöhen, damit ihr wegen dieses Malus im kommenden Akt keine unnötigen Probleme habt.\n20. Kehrt per Waypoint zu Ruined Square zurück.\n21. Betretet Cathedral Rooftop und durchquert den Bereich.\n22. Betretet Cathedral Apex und besiegt Kitava.\n23. Sprecht mit Lily Roth und segelt nach Wraeclast.",
      "1. Geht hinaus zu The Twilight Strand. Räumt den Bereich von allen Monstern, loggt euch aus oder teleportiert euch in die Stadt und sprecht mit Lilly Roth.\n2. Betretet The Coast und durchquert die Zone. Am Ende sammelt den Waypoint.\n3. Betretet Mud Flats. Findet und tötet The Dishonored Queen und nehmt Eye of Conquest.\n4. Findet den Ausgang zu Karui Fortress. Er befindet sich meist im oberen mittleren Teil des Bereichs.\n5. Betretet Tukohama's Keep.\n6. Besiegt Tukohama. Sprecht mit Sin und wählt Soul of Tukohama als euren Pantheon Minor God.\n7. Findet und betretet The Ridge.\n8. Sammelt den Waypoint und kehrt nach Lioneye's Watch zurück. Sprecht mit Tarkleigh, ihr erhaltet ein Book of Skill als Belohnung.\n9. Kehrt per Waypoint zu The Ridge zurück.\n10. Findet und betretet Lower Prison, sammelt direkt hinter dem Eingang den Waypoint.\n11. Findet den Labyrinth Trial und schließt ihn ab.\n12. Findet und betretet Shavronne's Tower.\n13. Steigt den Turm hinauf, bis ihr Prison Rooftop erreicht.\n14. Tötet Brutus und Shavronne.\n15. Durchquert Warden's Chambers und betretet Prisoner's Gate. Sammelt den Waypoint.\n16. Findet Valley of the Fire Drinker und besiegt Abberath. Loggt euch aus oder teleportiert euch in die Stadt und sprecht mit Bestel für die Book-of-Skill-Belohnung. Kehrt per Waypoint zurück zu Prisoner's Gate. Geht in die entgegengesetzte Richtung, in der ihr Valley of the Fire Drinker gefunden habt (z. B. wenn Abberath unten rechts liegt, geht oben rechts, und umgekehrt).\n17. Betretet Western Forest. Folgt dem Hauptweg, bis ihr einen Waypoint findet.\n18. Findet und betretet The Riverways. Folgt dem Hauptweg, bis ihr einen Waypoint findet.\n19. Findet und betretet The Wetlands, meist im oberen Teil des Bereichs. Findet den Spawning Ground und tötet die Puppet Mistress. Loggt euch aus oder teleportiert euch in die Stadt und sprecht mit Tarkleigh für die Book-of-Skill-Belohnung. Kehrt per Waypoint zurück zu The Riverways.\n20. Findet und betretet Southern Forest. Der Eingang befindet sich meist in der Mitte/unten rechts im Bereich.\n21. Sammelt den Waypoint, bevor ihr hinaus zu Cavern of Anger geht.\n22. Öffnet die Flag Chest und nehmt die Black Flag.\n23. Betretet den Durchgang und durchquert die Höhle, bis ihr The Beacon erreicht. Betretet sie und erhaltet sofort den Waypoint.\n24. Findet die pyramidenartige Konstruktion und steigt darauf hinauf. Begleitet beide Säulen zu ihren Plätzen, indem ihr euch in den leuchtenden Kreis stellt.\n25. Klickt auf den Ignition Switch und dann erneut auf Beacon.\n26. Sprecht mit Weylam Roth und segelt zu Brine King's Reef. Sammelt den Waypoint.\n27. Findet und betretet Brine King's Throne. Am einfachsten folgt ihr der linken Wand.\n28. Tötet den Brine King. Sprecht mit Sin und sammelt euren Brine King Major Pantheon.\n29. Sprecht mit Weylam Roth und segelt zu Akt VII.",
      "1. Betretet Broken Bridge. Geht in Richtung der unteren linken Ecke des Bereichs.\n2. Betretet The Crossroads. Folgt dem Weg und sammelt in der Mitte der Zone den Waypoint.\n3. Nehmt vom Waypoint aus die untere Abzweigung und betretet Fellshrine Ruins.\n4. Betretet The Crypt und erhaltet den Waypoint.\n5. Findet den Labyrinth Trial und schließt ihn ab.\n6. Findet den Sarcophagus und steigt hinab zu The Crypt (Level Two).\n7. Findet den Container of Sins und nehmt die Maligaro's Map.\n8. Kehrt per Portal oder durch Ausloggen zu Bridge Encampment zurück.\n9. Kehrt per Waypoint zu The Crossroads zurück.\n10. Nehmt vom Waypoint aus den oberen Weg und betretet Chamber of Sins (Level 1).\n11. An der zentralen Kreuzung sammelt den Waypoint und legt die Maligaro's Map in das Map Device.\n12. Betretet Maligaro's Sanctum und geht weiter, bis ihr Maligaro's Workshop findet.\n13. Tötet Maligaro und nehmt Black Venom. Verlasst die Map mit einem Portal Scroll.\n14. Sprecht mit Silk und nehmt den Obsidian Key.\n15. Findet und betretet Chamber of Sins (Level Two).\n16. Findet den Labyrinth Trial und schließt ihn ab.\n17. Betretet The Den.\n18. Geht weiter und hinaus zu Ashen Fields.\n19. Betretet Fortress Encampment.\n20. Tötet Greust.\n21. Betretet Northern Forest.\n22. Sammelt den Waypoint.\n23. Betretet Dread Thicket.\n• Betretet Den of Despair und tötet Gruthkul, dann kehrt zurück zu Dread Thicket.\n• Sammelt 7 Glühwürmchen (Fireflies) im gesamten Dread Thicket.\n24. Kehrt zurück zu Bridge Encampment und sprecht mit Eramir, ihr erhaltet als Belohnung zwei Books of Skill.\n25. (Optional): Sprecht mit Helena, ihr erhaltet Greust's Necklace. Diese Quest belohnt euch nur mit einem Amulett und kostet insgesamt meist nicht mehr als eine Minute, also liegt es an euch, ob ihr sie als League Starter abschließen wollt. Wenn ihr in Northern Forest auf einen Azmeri Shrine stoßt, legt dort das Halsband ab und sprecht mit Helena, wenn ihr das nächste Mal in der Stadt seid, um andere Quests abzugeben.\n26. Kehrt per Waypoint zurück zu Northern Forest.\n27. Findet den Ausgang zu The Causeway.\n28. Sobald ihr darauf stoßt, sammelt den Waypoint.\n29. Bevor ihr den Bereich verlasst, sammelt Kishara's Star, meist direkt am Zonenausgang, in der Kishara's Lockbox.\n30. Betretet Vaal City.\n31. Findet Yeena. Vaal City ist für manche Spieler eine weitläufige und verwirrende Zone. Es gibt immer einen Teil, der von Sackgassen umgeben und schwer zu erreichen ist (die \"Mitte\" der Stadt, nicht des Bereichs selbst). Yeena und der Waypoint befinden sich immer genau dort.\n32. Kehrt per Waypoint in die Stadt zurück und übergebt Kishara's Star an Weylam für die Book-of-Skill-Belohnung, dann kehrt zurück zu Vaal City.\n33. Sprecht mit Yeena und betretet Temple of Decay (Level One).\n34. Betretet Temple of Decay (Level Two).\n35. Betretet Arakaali's Web.\n36. Tötet Arakaali.\n37. Betretet Sarn Ramparts.\n38. Betretet Sarn Encampment.\n39. Hier empfehlen wir, das zweite Labyrinth zu machen.",
      "1. Betretet Toxic Conduits.\n2. Findet und betretet Doedre's Cesspool.\n3. Öffnet das Gitter und betretet The Cauldron.\n4. Tötet Doedre the Vile.\n5. Geht hinaus zu Sewer Outlet und sammelt den Waypoint.\n6. Nehmt den rechten Weg und betretet The Quay.\n7. Öffnet die Sealed Casket und nehmt den Ankh of Eternity. Der Ankh befindet sich meist in der Nähe des Zoneneingangs, sucht nach einer langen Brücke.\n8. Findet und betretet die Resurrection Site und tötet Tolman.\n9. Sprecht mit Clarissa.\n10. Kehrt zurück zu The Quay.\n11. Betretet Grain Gate und sammelt den Waypoint. Geht \"hinauf\" durch die Zone, ungefähr entlang der oberen rechten Wand des Bereichs.\n12. Tötet die Gemling Legionnaires.\n13. Betretet Imperial Fields und folgt dem Hauptweg, bis ihr einen Waypoint findet.\n14. Kehrt zurück zu Sarn Encampment. Sprecht mit Clarissa und Maramoa für die Book-of-Skill-Belohnungen. Sprecht mit Hargan für einen Ring als Belohnung.\n15. Kehrt zurück zu Imperial Fields.\n16. Betretet Solaris Temple (Level One).\n17. Falls ihr darauf stoßt, erhaltet den Waypoint.\n18. Betretet Solaris Temple (Level Two).\n19. Tötet Dawn und nehmt den Sun Orb. Loggt euch aus oder teleportiert euch in die Stadt.\n20. Kehrt per Waypoint zu Solaris Temple (Level one) zurück.\n21. Findet und betretet The Solaris Concourse.\n22. Durchquert, erhaltet den Waypoint und betretet The Harbour Bridge.\n23. Durchquert und betretet The Lunaris Concourse.\n24. Erhaltet den Waypoint und betretet The Bath House.\n25. Findet den Labyrinth Trial und schließt ihn ab.\n26. Betretet High Gardens und geht weiter, bis ihr auf Pools of Terror stoßt. Betretet sie und tötet Yugul. Loggt euch aus oder teleportiert euch in die Stadt.\n27. Sprecht mit Hargan für die Skill-Book-Belohnung. Kehrt per Waypoint zu Lunaris Concourse zurück.\n28. Betretet Lunaris Temple (Level 1). Der Weg zu Lunaris Temple ist derselbe wie in Akt III, geht einfach immer nach oben, bis ihr darauf stoßt.\n29. Erhaltet den Waypoint, dann betretet Lunaris Temple (Level 2).\n30. Tötet Dusk und nehmt den Moon Orb, dann loggt euch aus oder teleportiert euch in die Stadt.\n31. Kehrt per Waypoint zu Lunaris Concourse zurück.\n32. Betretet Harbour Bridge.\n33. Betretet Sky Shrine.\n34. Tötet Solaris und Lunaris.\n35. Betretet Blood Aqueducts.\n36. Betretet Highgate.",
      "1. Betretet The Descent und geht nach rechts.\n2. Steigt durch die Supply Hoists ab, bis ihr den Ausgang zu Vastiri Desert findet.\n3. Findet und erhaltet den Waypoint.\n4. Findet die Storm Weathered Chest. Besiegt die Wellen von Mumien, die euch überfallen, dann nehmt die Storm Blade.\n5. Kehrt mit einem Portal Scroll in die Stadt zurück und sprecht mit Petarra und Vanja. Sprecht mit Sin, dann erneut mit Petarra und Vanja, nehmt die Bottled Storm. Benutzt euer Portal und kehrt zu Vastiri Desert zurück.\n6. Findet den Eingang zu The Oasis, der nun mit der Bottled Storm zugänglich ist.\n7. Durchquert den Bereich und betretet Sand Pit. Tötet Shakari und loggt euch aus oder teleportiert euch in die Stadt.\n8. Sprecht mit Irasha für die Skill-Book-Belohnung. Kehrt per Waypoint zu Vastiri Desert zurück.\n9. Betretet The Foothills.\n10. Findet den Waypoint, meist im oberen rechten Teil des Bereichs.\n11. Betretet Boiling Lake.\n12. Tötet den Basilisk und nehmt Basilisk Acid. Ihr erkennt, dass ihr im Bereich des Basilisken seid, sobald ihr auf Gruppen versteinerter Gegner trefft.\n13. Loggt euch aus oder teleportiert euch in die Stadt und kehrt per Waypoint zu The Foothills zurück.\n14. Betretet The Tunnel, meist im oberen oder oberen linken Teil des Bereichs.\n15. Erhaltet den Waypoint.\n16. Findet den Labyrinth Trial und schließt ihn ab.\n17. Betretet The Quarry. Lauft direkt in die Mitte der Zone und erhaltet den Waypoint.\n18. Diese Schritte könnt ihr in beliebiger Reihenfolge abschließen, je nachdem, worauf ihr zuerst stoßt.\n• Betretet The Refinery.\n• Optional: Wenn ihr Trigger a Socketed Spell when you Use a Skill craften müsst, sucht dieses Gitter, es bringt euch unter die Erde in einen Bereich mit Crafting-Möglichkeiten.\n• Erkundet den Bereich, bis ihr General Adus findet, dann tötet ihn. Er befindet sich in seiner eigenen kleinen Arena, meist im oberen oder oberen linken Teil des Bereichs. Ihr findet ihn meist schneller, wenn ihr vom Zonenanfang aus den linken Weg nehmt. Interagiert mit der Theurgic Precipitate Machine und nehmt Trarthan Powder. Benutzt ein Portal oder loggt euch aus, dann kehrt per Waypoint zu The Quarry zurück.\n• Betretet Shrine of the Winds und tötet Garukhan. Kehrt per Portal oder durch Ausloggen in die Stadt zurück, dann sprecht mit Irasha für die Skill-Book-Belohnung. Kehrt per Waypoint zu The Quarry zurück.\n15. Sprecht mit Sin und betretet Belly of the Beast.\n16. Betretet Rotting Core und durchquert den Bereich.\n17. Betretet Black Core und sprecht mit Sin.\n18. Betretet nacheinander alle Portale nach eurer Wahl und besiegt Malachais Wächter (Shavronne, Maligaro und Doedre).\n19. Betretet Black Heart und tötet die Depraved Trinity.\n20. Sprecht mit Lilly Roth und segelt nach Oriath.",
      "1. Betretet Cathedral Rooftop.\n2. Betretet Cathedral Apex, direkt links nach dem Betreten des Rooftop-Bereichs.\n3. Tötet Cultisten und Gargoyles, um Bannon zu befreien.\n4. Kehrt zurück zu Cathedral Rooftop und geht nach rechts.\n5. Betretet Ravaged Square.\n6. Geht nach unten und rechts, bis ihr den Eingang zu Control Blocks findet, und betretet ihn.\n7. Sammelt den Waypoint, dann findet Vilenta, ungefähr dort, wo in Akt V der Miasmeter war. Tötet Vilenta, loggt euch aus oder teleportiert euch in die Stadt.\n8. Sprecht mit Lani für die Book-of-Skill-Belohnung und nehmt den Waypoint zu Control Blocks und geht hinaus zu Ravaged Square.\n9. Geht nach oben, bis ihr auf einen Waypoint stoßt, sammelt ihn und betretet Ossuary.\n10. Findet den Labyrinth Trial und schließt ihn ab, er befindet sich in der Nähe des Waypoints, dann loggt euch aus oder teleportiert euch in die Stadt. Optional: In der Nähe des Waypoints befindet sich auch ein Elixir of Allure (Belohnung: Respec-Punkte).\n11. Per Waypoint zu Ravaged Square, findet und betretet Torched Courts und durchquert den Bereich.\n12. Betretet Desecrated Chambers, die ein ähnliches Layout wie Chambers of Innocence aus Akt V haben. Sammelt sofort den Waypoint.\n13. Findet und tötet Avarius, Reassembled.\n14. Kehrt per Waypoint zu Oriath Docks zurück.\n15. Sprecht mit Bannon, dann sprecht mit Lani, ihr erhaltet die Belohnungen Flask und Armor.\n16. Hier empfehlen wir, das dritte Labyrinth zu machen, damit es fertig ist, bevor euch Kitavas Fluch (Kitava's Affliction) erneut trifft. Stellt sicher, dass eure elementaren Resistances 30 % über dem Limit liegen, damit ihr nach Kitavas bevorstehendem Tod keine Probleme habt.\n17. Sprecht mit Innocence.\n18. Kehrt zurück zu Ravaged Square und geht nach oben, bis ihr Innocence findet. Sprecht mit ihm.\n19. Betretet Canals und durchquert den Bereich.\n20. Betretet The Feeding Trough und durchquert den Bereich.\n21. Sprecht mit Sin und betretet Altar of Hunger.\n22. Tötet Kitava.\n23. Sprecht mit Lani in Oriath, ihr erhaltet eine Skill-Book-Belohnung.",
    ],
  },
  home: {
    title: "Builds suchen",
    subtitle:
      "Eine Meta-Suchmaschine für Path of Exile 1 und 2 Builds, aus Reddit, YouTube, Foren und der Community.",
    searchPlaceholder: "Titel und Beschreibung durchsuchen...",
    classPlaceholder: "Klasse",
    ascendancyPlaceholder: "Aszendenz",
    creatorPlaceholder: "Content Creator (z. B. Zizaran)",
    mainSkillPlaceholder: "Hauptfähigkeit",
    leaguePlaceholder: "Liga / Patch",
    tagsPlaceholder: "Tags",
    searchButton: "Suchen",
    resetButton: "Filter zurücksetzen",
    saveFilterButton: "Filter speichern",
    saveFilterPrompt: "Name für den gespeicherten Filter:",
    saveFilterSuccess: "Filter gespeichert — zu finden auf der Konto-Seite.",
    saveFilterError: "Filter konnte nicht gespeichert werden.",
    loadError: "Builds konnten nicht geladen werden.",
    loading: "Lade...",
    noResults: "Keine Builds entsprechen den Filtern. Lockere sie, oder",
    addYourOwn: "füge deinen eigenen hinzu",
    notFoundHint: "Nicht gefunden, wonach du suchst? Versuch es auch bei",
    prev: "Zurück",
    next: "Weiter",
    pageInfo: "Seite {page} von {totalPages} ({total} Builds)",
  },
  news: {
    title: "PoE-News",
    subtitle:
      "Die neuesten offiziellen Ankündigungen zu Path of Exile und Path of Exile 2.",
    viewAll: "Alle News anzeigen",
    source: "Offizielle News",
    loading: "News werden geladen...",
    error: "News konnten nicht geladen werden.",
  },
  games: {
    all: "Alle Spiele",
    poe1: "Path of Exile 1",
    poe2: "Path of Exile 2",
  },
  sources: {
    all: "Alle Quellen",
    reddit: "Reddit",
    youtube: "YouTube",
    poe_forum: "PoE-Forum",
    pob_forum: "PoB Community",
    poe_ninja: "poe.ninja",
    community: "Community",
    maxroll: "Maxroll",
    poevault: "PoE Vault",
    mobalytics: "Mobalytics",
  },
  sorts: {
    date: "Neueste",
    popularity: "Beliebteste",
    relevance: "Relevanz (benötigt Suchtext)",
  },
  meta: {
    title: "Meta-Übersicht",
    subtitle: "Die beliebtesten genehmigten Builds nach Liga/Patch.",
    noLeague: "Keine Liga verfügbar",
    loading: "Lade...",
    noBuilds: "Für diese Liga gibt es noch keine Builds.",
  },
  favorites: {
    title: "Meine Lieblings-Builds",
    loading: "Lade...",
    loginPrompt: "Um Lieblings-Builds zu sehen, bitte",
    loginLink: "anmelden",
    empty: "Noch nichts hier —",
    findBuild: "finde einen Build",
  },
  account: {
    loginTitle: "Anmeldung",
    registerTitle: "Registrierung",
    authHint:
      "Ein Konto wird nur für Favoriten und gespeicherte Filter benötigt. Verwende zu deiner eigenen Sicherheit bitte KEINE deiner echten Konten!",
    email: "E-Mail",
    password: "Passwort",
    loginButton: "Anmelden",
    registerButton: "Registrieren",
    switchToRegister: "Kein Konto? Registrieren",
    switchToLogin: "Schon ein Konto? Anmelden",
    genericError: "Etwas ist schiefgelaufen.",
    accountTitle: "Konto",
    logout: "Abmelden",
    myFavorites: "Meine Lieblings-Builds →",
    savedFilters: "Gespeicherte Filter",
    loading: "Lade...",
    noFilters:
      "Noch nichts hier — speichere einen Filter auf der Startseite mit „Filter speichern“.",
    newMatches: "neu",
    markSeen: "Als gesehen markieren",
    delete: "Löschen",
  },
  admin: {
    loginTitle: "Admin-Anmeldung",
    invalidCreds: "Ungültige Anmeldedaten.",
    username: "Benutzer",
    password: "Passwort",
    loginButton: "Anmelden",
    queueTitle: "Builds, die auf Genehmigung warten",
    logout: "Abmelden",
    loading: "Lade...",
    listError: "Die Moderationswarteschlange konnte nicht geladen werden.",
    emptyQueue: "Die Warteschlange ist leer.",
    tags: "Tags",
    author: "Autor",
    contact: "Kontakt",
    pob: "PoB",
    approve: "Genehmigen",
    reject: "Ablehnen",
    rejectPrompt: "Notiz zur Ablehnung (optional):",
    actionFailed: "Aktion fehlgeschlagen.",
    reportsTitle: "Gemeldete Inhalte",
    noReports: "Keine offenen Meldungen.",
    reason: "Grund",
    removeBuild: "Build entfernen",
    dismissReport: "Meldung verwerfen",
    bulkAddTitle: "Externe Links im Sammelimport hinzufügen",
    bulkAddHint:
      "Für Seiten, die nicht automatisch gecrawlt werden dürfen (z. B. Maxroll) — durchsuche die Seite selbst und füge hier pro Zeile einen Build ein: Titel | URL | Spiel (poe1/poe2) | Klasse | Build-Typ | Liga | Notiz. Nur Titel, URL und Spiel sind Pflicht, den Rest kannst du zwischen den Strichen leer lassen. Zeilen werden sofort veröffentlicht (keine Moderationswarteschlange).",
    bulkAddPlaceholder:
      "Righteous Fire Juggernaut League Starter | https://maxroll.gg/poe/build-guides/rf-juggernaut | poe1 | Juggernaut | league starter | 3.25 | Robust, guter Clear und Bossing",
    bulkAddSourceLabel: "Quellseite",
    bulkAddSubmit: "Hochladen",
    bulkAddRunning: "Lädt hoch...",
    bulkAddResultsTitle: "Ergebnisse",
    bulkAddSuccess: "hinzugefügt",
    bulkAddError: "fehlgeschlagen",
  },
  submit: {
    title: "Build einreichen",
    subtitle:
      "Füge einen Link zu deinem Build ein (PoB-Export, YouTube-Video, Reddit-Post, eigener Guide). Das Formular ist anonym — der Kontakt unten ist optional. Der Build erscheint erst nach manueller Genehmigung öffentlich.",
    success: "Danke! Der Build wurde eingereicht und wartet auf Genehmigung.",
    rateLimited:
      "Von dieser Adresse wurden zu viele Builds eingereicht, bitte versuche es später erneut.",
    genericError: "Etwas ist schiefgelaufen, bitte versuche es erneut.",
    connectionError: "Verbindung zum Server fehlgeschlagen.",
    titleLabel: "Build-Titel",
    linkLabel: "Link (PoB, YouTube, Reddit, Guide...)",
    gameLabel: "Spiel",
    classLabel: "Klasse",
    ascendancyLabel: "Aszendenz",
    mainSkillLabel: "Hauptfähigkeit",
    leaguePatchLabel: "Liga / Patch",
    leaguePatchPlaceholder: "z. B. 3.29",
    tagsLabel: "Tags (kommagetrennt)",
    tagsPlaceholder: "League Starter, Bossing, Budget",
    pobLinkLabel: "Link zum PoB-Export (optional)",
    pobCodeLabel: "PoB-Export-Code (optional, für automatische Statistiken)",
    pobCodePlaceholder:
      "Code aus Path of Building → Export Build → Generate & copy code einfügen…",
    pobCodeHint:
      "Füge hier keinen Link ein — nur den kopierten Code selbst. Er wird verwendet, um Klasse/Aszendenz/Hauptfähigkeit sowie DPS/Life/EHP automatisch auszufüllen, falls angegeben.",
    authorLabel: "Build-Autor (optional)",
    contactLabel: "Dein Kontakt (optional, nur für eventuelle Rückfragen)",
    honeypotLabel: "Leer lassen",
    submitButton: "Zur Genehmigung einreichen",
    submitting: "Wird gesendet...",
  },
  buildCard: {
    addFavorite: "Zu Favoriten hinzufügen",
    removeFavorite: "Aus Favoriten entfernen",
    reportPrompt: "Warum meldest du diesen Build? (optional)",
    reported: "Gemeldet",
    report: "Melden",
  },
};

export const DICTIONARIES: Record<Locale, Dictionary> = { en, cs, pl, ru, de };
