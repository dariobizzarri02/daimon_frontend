
# Messages

type 0: guild invitation
type 1: guild application
type 0: the user is lfg, the guild invites the user and the user accepts
type 1: the user applies to the guild and the guild accepts

# Character

if the hairstyle is front and back (type 1):
/cosmetics/hair/0 (colored)
/cosmetics/hair/1 (not colored)

/cosmetics/face/0 (colored)
/cosmetics/face/1 (not colored)

depending on the gender:
/cosmetics/male/0 (colored)
/cosmetics/male/1 (not colored)
or
/cosmetics/female/0 (colored)
/cosmetics/female/1 (not colored)

if facial hair is present:
/cosmetics/facialhair/0 (not colored)

if the hairstyle is front only (type 0):
/cosmetics/hair/0 (colored)
/cosmetics/hair/1 (not colored)
else if the hairstyle is front and back (type 1):
/cosmetics/hair/2 (colored)
/cosmetics/hair/3 (not colored)

all images to color must have #7F7F7F replaced with the hair color

# User Data

Layer 1
- id

Layer 2
- display
- score
- main guild
- lfg

Layer 3
- guildCount
- messageCount
- isLeader
- hasCharacter
- hasLocal
- hasMinecraft
- hasDiscord