import {
  Button,
  Collapse,
  FormHelperText,
  Pagination,
  Stack,
} from "@mui/material";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import MenuItem from "@mui/material/MenuItem";
import Paper from "@mui/material/Paper";
import Select from "@mui/material/Select";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import * as React from "react";
import { useSearchParams } from "react-router";
import Filters, {
  type BgFilter,
  type DoFilter,
  type FtFilter,
  type RuFilter,
  type SpFilter,
} from "../forms/Filters";
import BackgroundResults from "../utils/BackgroundResults";
import FeatResults from "../utils/FeatResults";
import Nothing from "../utils/Nothing";
import ReferenceResults from "../utils/ReferenceResults";
import RuleResults from "../utils/RuleResults";
import SpeciesResults from "../utils/SpeciesReuslts";
import Thinking from "../utils/Thinking";
import {
  fetchBackgrounds,
  fetchFeats,
  fetchReferences,
  fetchRules,
  fetchSpecies,
} from "../workhorse/Queries";

export type Topics =
  | ""
  | "spells"
  | "items"
  | "species"
  | "classes"
  | "backgrounds"
  | "feats"
  | "creatures"
  | "rules"
  | "references";

export async function clientLoader() {
  // Lore page loader
}

export default function PublicLore() {
  const [searchParams, setSearchParams] = useSearchParams();
  if (!searchParams) {
    setSearchParams({ topic: "" });
  }
  const topic = searchParams.get("topic") as Topics;
  const [bgFilters, setBgFilters] = React.useState<BgFilter | undefined>(
    undefined,
  );
  const [ftFilters, setFtFilters] = React.useState<FtFilter | undefined>(
    undefined,
  );
  const [ruFilters, setRuFilters] = React.useState<RuFilter | undefined>(
    undefined,
  );
  const [doFilters, setDoFilters] = React.useState<DoFilter | undefined>(
    undefined,
  );
  const [spFilters, setSpFilters] = React.useState<SpFilter | undefined>(
    undefined,
  );
  const [filtered, setFiltered] = React.useState(false);
  // Used for pagination.
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(20);
  const [sort, setSort] = React.useState("name");
  // const [topic, setTopic] = React.useState<Topics>("");
  const display = topic === "" ? "none" : "flex";
  let query: any;
  let sorts: string[] = [];
  let resultComponent;

  // Background query
  let bgName = bgFilters?.name || "";
  let bgGameSystem = bgFilters?.gameSystem || [];
  let bgExact = bgFilters?.exact || false;
  const bgLimit = limit;
  const bgPage = page;
  const bgOrdering = sort;
  const qBackgrounds = useQuery({
    queryKey: [
      "fetchBackgrounds",
      bgName,
      bgGameSystem,
      bgExact,
      bgLimit,
      bgPage,
      bgOrdering,
    ],
    queryFn: () =>
      fetchBackgrounds(
        bgName,
        bgGameSystem,
        bgExact,
        bgLimit,
        bgPage,
        bgOrdering,
      ),
    enabled: !!(topic === "backgrounds"),
    placeholderData: keepPreviousData,
  });

  // Feats query
  let ftName = ftFilters?.name || "";
  let ftGameSystem = ftFilters?.gameSystem || [];
  let ftExact = ftFilters?.exact || false;
  let ftType = ftFilters?.featType || [];
  let ftPrereqs = ftFilters?.prereqs || [];
  const ftLimit = limit;
  const ftPage = page;
  const ftOrdering = sort;
  const qFeats = useQuery({
    queryKey: [
      "fetchFeats",
      ftName,
      ftGameSystem,
      ftExact,
      ftType,
      ftPrereqs,
      ftLimit,
      ftPage,
      ftOrdering,
    ],
    queryFn: () =>
      fetchFeats(
        ftName,
        ftGameSystem,
        ftExact,
        ftType,
        ftPrereqs,
        ftLimit,
        ftPage,
        ftOrdering,
      ),
    enabled: !!(topic === "feats"),
    placeholderData: keepPreviousData,
  });

  // Rules query
  let ruName = ruFilters?.name || "";
  let ruGameSystem = ruFilters?.gameSystem || [];
  let ruExact = ruFilters?.exact || false;
  const ruLimit = limit;
  const ruPage = page;
  const ruOrdering = sort;
  const qRules = useQuery({
    queryKey: [
      "fetchRules",
      ruName,
      ruGameSystem,
      ruExact,
      ruLimit,
      ruPage,
      ruOrdering,
    ],
    queryFn: () =>
      fetchRules(ruName, ruGameSystem, ruExact, ruLimit, ruPage, ruOrdering),
    enabled: !!(topic === "rules"),
    placeholderData: keepPreviousData,
  });

  // Documents query
  let doName = doFilters?.name || "";
  let doGameSystem = doFilters?.gameSystem || [];
  let doExact = doFilters?.exact || false;
  let doLicense = doFilters?.license || [];
  let doPublisher = doFilters?.publisher || [];
  const doLimit = limit;
  const doPage = page;
  const doOrdering = sort;
  const qReferences = useQuery({
    queryKey: [
      "fetchReferences",
      doName,
      doGameSystem,
      doExact,
      doPublisher,
      doLicense,
      doLimit,
      doPage,
      doOrdering,
    ],
    queryFn: () =>
      fetchReferences(
        doName,
        doGameSystem,
        doExact,
        doPublisher,
        doLicense,
        doLimit,
        doPage,
        doOrdering,
      ),
    enabled: !!(topic === "references"),
    placeholderData: keepPreviousData,
  });

  // Species query
  let spName = spFilters?.name || "";
  let spGameSystem = spFilters?.gameSystem || [];
  let spExact = spFilters?.exact || false;
  let spHasSubspecies = spFilters?.hasSubspecies || "unknown";
  let spSubspecies = spFilters?.subspecies || [];
  const spLimit = limit;
  const spPage = page;
  const spOrdering = sort;
  const qSpecies = useQuery({
    queryKey: [
      "fetchSpecies",
      spName,
      spGameSystem,
      spExact,
      spHasSubspecies,
      spSubspecies,
      spLimit,
      spPage,
      spOrdering,
    ],
    queryFn: () =>
      fetchSpecies(
        spName,
        spGameSystem,
        spExact,
        spHasSubspecies,
        spSubspecies,
        spLimit,
        spPage,
        spOrdering,
      ),
    enabled: !!(topic === "species"),
    placeholderData: keepPreviousData,
  });

  // query and sort switch
  switch (topic) {
    case "species":
      query = qSpecies;
      sorts = ["name", "document", "description"];
      break;
    case "backgrounds":
      query = qBackgrounds;
      sorts = ["name", "document"];
      break;
    case "feats":
      query = qFeats;
      sorts = ["name", "document", "type", "prerequisite"];
      break;
    case "rules":
      query = qRules;
      sorts = ["name", "document", "rules"];
      break;
    case "references":
      query = qReferences;
      sorts = ["name", "gamesystem", "publisher", "licenses"];
      break;
  }
  const { isLoading, data, error, refetch, isFetching } = query || {};
  const results = query?.data?.results || [];
  const totalResults = query?.data?.count || 0;

  // Component switch (because it uses results)
  switch (topic) {
    case "species":
      resultComponent = <SpeciesResults results={results} />;
      break;
    case "backgrounds":
      resultComponent = <BackgroundResults results={results} />;
      break;
    case "feats":
      resultComponent = (
        <FeatResults results={results} featType={ftType} prereqs={ftPrereqs} />
      );
      break;
    case "rules":
      resultComponent = <RuleResults results={results} />;
      break;
    case "references":
      resultComponent = <ReferenceResults results={results} />;
      break;
  }

  React.useEffect(() => {
    if (refetch) {
      refetch();
    }
  }, [
    bgFilters,
    ftFilters,
    ruFilters,
    doFilters,
    spFilters,
    page,
    sort,
    limit,
  ]);

  const filterRef = React.useRef(null);

  const handleSearch = () => {
    switch (topic) {
      case "species":
        if (filterRef.current) {
          const filter = filterRef.current;
          setSpFilters(filter);
        }
        break;
      case "backgrounds":
        if (filterRef.current) {
          const filter = filterRef.current;
          setBgFilters(filter);
        }
        break;
      case "feats":
        if (filterRef.current) {
          const filter = filterRef.current;
          setFtFilters(filter);
        }
        break;
      case "rules":
        if (filterRef.current) {
          const filter = filterRef.current;
          setRuFilters(filter);
        }
        break;
      case "references":
        if (filterRef.current) {
          const filter = filterRef.current;
          setDoFilters(filter);
        }
        break;
    }
  };

  if (error) {
    console.log(
      "Something went wrong here.\nError message: %s\nReturned Data: %s",
      JSON.stringify(error.message),
      JSON.stringify(data),
    );
  }

  return (
    <Grid container spacing={1}>
      <Divider sx={{ my: 2 }} variant="middle" />
      <Typography variant="h3" sx={{ textAlign: "center", width: 1, py: 3 }}>
        The Lore of Kothis and Worlds Beyond...
      </Typography>
      <Divider sx={{ my: 2 }} variant="middle" />
      <Typography
        variant="h6"
        sx={{ textAlign: "center", width: 0.8, mx: "auto", my: 4 }}
      >
        With a special thanks to{" "}
        <Link
          href="https://open5e.com/"
          target="_blank"
          rel="noopener noreferrer"
          underline="none"
          color="secondary"
        >
          Open5e
        </Link>
        {", "} I can provide the entirety of the 5e SRD and other content
        covered by the OGL! Be patient with my UI as I work to integrate this
        API into the site.
      </Typography>
      <Divider variant="middle" sx={{ my: 4, width: 0.9, mx: "auto" }} />
      <Grid
        size={{ xs: 12, md: 6 }}
        sx={{ px: 3, mt: 3, alignContent: "center" }}
      >
        <Typography variant="body1">
          What do we want to look at today?
        </Typography>
      </Grid>
      {/* <div style={{ width: "100%" }}> */}
      <Grid size={{ xs: 12, md: 6 }} sx={{ px: 3, mt: 3 }}>
        <FormControl variant="standard" sx={{ width: { xs: 1 } }}>
          <InputLabel id="search-topic-label">Topic</InputLabel>
          <Select
            labelId="search-topic-label"
            id="search-topic"
            value={topic}
            onChange={(e) =>
              setSearchParams({
                topic: (e.target.value as string) ? e.target.value : "",
              })
            }
            label="Topic"
          >
            <MenuItem value="">Select a topic...</MenuItem>
            <MenuItem value="spells" disabled>
              Spells
            </MenuItem>
            <MenuItem value="items" disabled>
              Items
            </MenuItem>
            <MenuItem value="species">Species</MenuItem>
            <MenuItem value="classes" disabled>
              Classes
            </MenuItem>
            <MenuItem value="backgrounds">Backgrounds</MenuItem>
            <MenuItem value="feats">Feats</MenuItem>
            <MenuItem value="creatures" disabled>
              Creatures
            </MenuItem>
            <MenuItem value="rules">Rules</MenuItem>
            <MenuItem value="references">References</MenuItem>
          </Select>
        </FormControl>
        <Button
          type="button"
          variant="contained"
          sx={{ mt: 2, width: 1 }}
          onClick={() => handleSearch()}
        >
          Search
        </Button>
      </Grid>
      <Grid size={{ xs: 12 }} sx={{ px: 1, mt: 3 }}>
        <FormControlLabel
          control={
            <Switch
              checked={filtered}
              onChange={(e) => setFiltered(e.target.checked)}
              sx={{ mx: 3 }}
            />
          }
          sx={{ width: 1, justifyContent: "space-between", display: display }}
          label="Any filters?"
          labelPlacement="start"
        />
      </Grid>
      <Grid size={12}>
        <Collapse orientation="vertical" sx={{ mx: 3 }} in={filtered}>
          <Paper
            variant="elevation"
            elevation={10}
            sx={{
              width: 1,
            }}
          >
            <Filters
              topic={topic}
              bgRef={filterRef}
              ftRef={filterRef}
              ruRef={filterRef}
              doRef={filterRef}
              spRef={filterRef}
            />
          </Paper>
        </Collapse>
      </Grid>
      <Grid size={12}>
        <Paper variant="elevation" elevation={10} sx={{ m: 3, py: 3 }}>
          {isLoading ? (
            <Thinking sizing={"large"} />
          ) : results && results.length > 0 ? (
            <>
              <Stack
                spacing={2}
                direction={{ xs: "column", sm: "row" }}
                sx={{ justifyContent: "space-between", alignItems: "center" }}
              >
                <FormControl size="small" sx={{ p: 2 }}>
                  <InputLabel id="sort-page-label" sx={{ pl: "20px" }}>
                    Sort
                  </InputLabel>
                  <Select
                    labelId="sort-page-label"
                    id="sort-page"
                    variant="outlined"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    label="sort"
                  >
                    {sorts.map((srt) => {
                      const exSrt = "Reference";
                      return [
                        <MenuItem value={srt} key={srt}>
                          {srt === "document"
                            ? exSrt + " (A-Z)"
                            : srt
                                .replace("_", " ")
                                .charAt(0)
                                .toUpperCase()
                                .concat(srt.substring(1)) + " (A-Z)"}
                        </MenuItem>,
                        <MenuItem value={"-" + srt} key={"-" + srt}>
                          {srt === "document"
                            ? exSrt + " (Z-A)"
                            : srt
                                .replace("_", " ")
                                .charAt(0)
                                .toUpperCase()
                                .concat(srt.substring(1)) + " (Z-A)"}
                        </MenuItem>,
                      ];
                    })}
                  </Select>
                </FormControl>
                {isFetching ? (
                  <Thinking sizing="small" />
                ) : (
                  <Stack>
                    <Pagination
                      size="large"
                      page={page}
                      onChange={(
                        _e: React.ChangeEvent<unknown>,
                        value: number,
                      ) => setPage(value)}
                      count={Math.ceil(totalResults / limit)}
                      sx={{ px: 2 }}
                    />
                    <Typography
                      variant="body2"
                      sx={{ textAlign: "center", my: 2 }}
                    >
                      Found {totalResults}{" "}
                      {topic.charAt(0).toUpperCase() + topic.slice(1)}
                    </Typography>
                  </Stack>
                )}
                <FormControl size="small" sx={{ p: 2 }}>
                  <InputLabel id="limit-page-label" sx={{ pl: "11px" }}>
                    Results
                  </InputLabel>
                  <Select
                    labelId="limit-page-label"
                    id="limit-page"
                    variant="outlined"
                    value={limit}
                    onChange={(e) => setLimit(e.target.value)}
                    label="Results"
                  >
                    <MenuItem value="10">10</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="50">50</MenuItem>
                    <MenuItem value="100">100</MenuItem>
                  </Select>
                  <FormHelperText>per page</FormHelperText>
                </FormControl>
              </Stack>
              {resultComponent}
            </>
          ) : (
            <Nothing />
          )}
        </Paper>
      </Grid>
    </Grid>
  );
}
