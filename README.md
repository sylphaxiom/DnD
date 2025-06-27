# One DnD site to rule them all...

## Description:

This application is something I have been wanting to do for a long time now. I want a singular platform that all of my players can come to where they can see everything for my campaign. I want them to be able to keep their own lore, character sheets, documents, everything relating to their character on their page. Yes, I want them to have their own page so they can manage their characters and knowledge. I want to have a knowledge base where I can restrict information to someone in a GM role or a Player role. Might want something in between as well for people who assist with GMing or who are doing special or other things. I would like to be able to post information about games and have a game schedule board I can post. I would like for most aspects to be interactive. I would actually like this to eventually be able to take the place of DnDBeyond for managing our campaign and repository. It would be nice also to host games on the site, but I think that would have issues and would be best to keep with Roll20. However, some APIs to Roll20 would be a great addition to integrate information into the VTT as we play. Perhaps we could set up an API that allowed Roll20 to pull information from my world repository in the website. I want to build this with scale in mind so I want things to be modular. That means multiple worlds, characters, players, roles, and games.

## Frameworks and Components:

- React.js 19.1.0
- Typescript 5.8.3
- Bootstrap 5.3.7
- eslint 9.29.0

## Planning Documentation:

### Pages

#### Home (index)

- Sign-in
- Quick Calendar
- Anouncements
- Public Links
  - World information (public version)
  - Open games
  - Request registration link
  - Contact
  - Public character/party info

#### Sign-in

- Sign in
- Password reset
- Request registration link
- Sign in as GM or Player

#### Profile

- All your characters
  - Possibly set up as tabs or cards
- All your game schedules
  - collapsing card for upcoming game sessions
- Options to edit characters
  - Certain edits will need GM approval
- All your documents
- Links
  - Lore Library
  - Game Central
  - Homebrewery
  - Community board
  - Personal Notes/Info

#### Lore Library

- World information (per world)
  - Limited to user permission level
  - Character view to see what information different characters might know
  - Organize by subjects
