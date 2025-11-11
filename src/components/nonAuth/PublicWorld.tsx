import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import InteractiveKothis from "../InteractiveKothis";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";

export default function PublicWorld() {
  // non-authenticated landing page for World tab

  return (
    <Grid
      container
      spacing={3}
      id="public_worldBody"
      sx={{ alignItems: "center" }}
    >
      <Grid size={12} sx={{ textAlign: "center" }}>
        <Divider sx={{ my: 2 }} variant="middle" />
        --- This is the public world page ---
        <Divider sx={{ my: 2 }} variant="middle" />
      </Grid>
      <Grid size={4}>
        <Typography variant="subtitle2" sx={{ textIndent: "3em", my: 2 }}>
          The world of Kothis is a fantasy world of diversity, magic, and
          wonder. The nations of Kothis live in peace with one another, for the
          most part, but there is always something to threaten the status quo.
          After all, without bad guys, who would you adventurers inconvenience
          wth your antics? Below is a brief overview of the various nations and
          locations within Kothis. If you would like more information on the
          world or to play in a Kothis campaign, log in or sign up and gain
          access to all that Kothis has to offer!
        </Typography>
        <Grid container>
          <Grid size={6}>
            <Typography variant="h6" sx={{ my: 1 }}>
              Continents
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Borodir
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Dramir
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Florian
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Elandra
            </Typography>
          </Grid>
          <Grid size={6}>
            <Typography variant="h6" sx={{ my: 1 }}>
              Nations
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Herzog Kingdom
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Rokesh
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Praetorian Empire
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Draconia
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Elandir
            </Typography>
            <Typography variant="subtitle2" sx={{}}>
              Faena
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid size={8}>
        <Card
          id="interactive_map_card"
          sx={{ textAlign: "center", borderRadius: 3 }}
        >
          <CardHeader
            title="Explore the nations of Kothis"
            subheader="Sign in or Sign up for an account to explore more about each nation and city in the world."
          />
          <CardContent>
            <InteractiveKothis />
          </CardContent>
        </Card>
      </Grid>
      <Divider
        flexItem
        orientation="horizontal"
        sx={{ width: 0.87, my: 3 }}
        variant="inset"
      />
      <Grid container size={10} offset={1} sx={{ my: 2 }}>
        <Grid size={2}>
          <Typography variant="h4">Borodir</Typography>
        </Grid>
        <Grid size={9} offset={1}>
          <Typography>
            The continent of Borodir has 2 nations within it; the Herzog Empire
            and Rokesh. These 2 nations are constantly at war with eachother.
            Rokesh is almost entirely composed of Orcs, a tribal and violent
            species, which have a constant feud with the Dwarves of the Herzog
            Kingdom. A mountainous continent with rich ores and the unique
            element only found here, Geheimstaub.
          </Typography>
        </Grid>
      </Grid>
      <Grid container size={10} offset={1} sx={{ my: 2 }}>
        <Grid size={2}>
          <Typography variant="h4">Dramir</Typography>
        </Grid>
        <Grid size={9} offset={1}>
          <Typography>
            A dark and mysterious island on the northern edge of the Wandering
            Sea, Dramir is a taboo around the world of Kothis. This collection
            of islands was the home of an ancient evil which stole the history
            from the world. This great evil is a primary antagonist for one of
            the campaigns that are being ran in Kothis. After 742 years, this
            island is avoided by everyone, even the pirates who claim the deadly
            Wandering Sea as their home avoid this dark place.
          </Typography>
        </Grid>
      </Grid>
      <Grid container size={10} offset={1} sx={{ my: 2 }}>
        <Grid size={2}>
          <Typography variant="h4">Florian</Typography>
        </Grid>
        <Grid size={9} offset={1}>
          <Typography>
            Florian is the largest continent on Kothis and the only one that can
            call 3 nations home: The Praetorian Empire, Draconia, and Elandir.
            The Praetorian Empire is the most diverse of the nations, at least
            as far as non-Fae species! Draconia is the home of anyone with
            Draconic blood or appearance, it is also the most isolationist of
            the nations. Elandir is the home of the Elven people, the longest
            living race on Kothis (that we are aware of!). Consisting of wide,
            open plains, Praetor is commonly home to many nomadic peoples and
            species that value a peaceful existance, like the Halflings.
          </Typography>
        </Grid>
      </Grid>
      <Grid container size={10} offset={1} sx={{ my: 2 }}>
        <Grid size={2}>
          <Typography variant="h4">Elandra</Typography>
        </Grid>
        <Grid size={9} offset={1}>
          <Typography>
            Elandra is the most wild and untamed continent on Kothis. Widly
            considered the "entryway to the Feywild", Elandra is riddled with
            planar breaches which have become so numerous, even the landscape is
            starting to turn Fae. There is only one "natoin" on Elandra, Faena.
            I use the quotes because Faena is more of a loose collection of
            gangs and territories that consider themselves a nation. This is
            also the continent where you are most likely to run into the Fae
            creatures that have made their way into this plane from the Feywild.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}
