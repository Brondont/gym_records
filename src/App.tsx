import React, { useMemo, useState } from "react";
import {
  Box,
  ThemeProvider,
  keyframes,
  Typography,
  TableContainer,
  TableCell,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  IconButton,
  Tooltip,
  Switch,
  FormControlLabel,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { lightTheme, darkTheme } from "./theme";
import "@fontsource/metal-mania";

type RecordItem = {
  type: "Bench" | "Deadlift" | "Squat";
  value: number;
};

type Hero = {
  name: string;
  Records: RecordItem[];
};

const heroesSeed: Hero[] = [
  {
    name: "Kadi",
    Records: [
      { type: "Bench", value: 140 },
      { type: "Deadlift", value: 220 },
      { type: "Squat", value: 220 },
    ],
  },
];

// Enhanced aanking number component
const RankingNumber = ({ rank }: { rank: number }) => {
  const getRankStyle = (position: number) => {
    if (position === 1) {
      return {
        background: "linear-gradient(135deg, #FFD700, #FFA500)", // Gold
        border: "2px solid #FFD700",
        boxShadow:
          "0 4px 15px rgba(255, 215, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
        color: "#000000",
        textShadow: "0 1px 2px rgba(255,255,255,0.3)",
      };
    } else if (position === 2) {
      return {
        background: "linear-gradient(135deg, #C0C0C0, #A0A0A0)", // Silver
        border: "2px solid #C0C0C0",
        boxShadow:
          "0 4px 15px rgba(192, 192, 192, 0.5), inset 0 1px 0 rgba(255,255,255,0.3)",
        color: "#000000",
        textShadow: "0 1px 2px rgba(255,255,255,0.3)",
      };
    } else if (position === 3) {
      return {
        background: "linear-gradient(135deg, #CD7F32, #B8860B)", // Bronze
        border: "2px solid #CD7F32",
        boxShadow:
          "0 4px 15px rgba(205, 127, 50, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
        color: "#000000",
        textShadow: "0 1px 2px rgba(255,255,255,0.2)",
      };
    } else {
      return {
        background: "linear-gradient(135deg, #444444, #222222)",
        border: "2px solid #666666",
        boxShadow:
          "0 4px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)",
        color: "#ffffff",
        textShadow: "0 1px 2px rgba(0,0,0,0.8)",
      };
    }
  };

  const rankStyle = getRankStyle(rank);

  return (
    <Box
      sx={{
        width: 44,
        height: 44,
        borderRadius: 2,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: 900,
        fontSize: 18,
        position: "relative",
        transition: "all 200ms ease",
        "&:hover": {
          transform: "scale(1.1)",
          filter: "brightness(1.1)",
        },
        ...rankStyle,
      }}
    >
      {rank}
    </Box>
  );
};

const computeTotal = (h: Hero) => h.Records.reduce((s, r) => s + r.value, 0);

const App: React.FC = () => {
  const [heroes] = useState<Hero[]>(heroesSeed);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const ranked = useMemo(
    () =>
      heroes
        .map((h) => ({ ...h, total: computeTotal(h) }))
        .sort((a, b) => b.total - a.total),
    [heroes]
  );

  const filteredAndRanked = useMemo(() => {
    if (!searchQuery.trim()) return ranked;

    const filtered = ranked.filter((hero) =>
      hero.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Keep original ranks for filtered results
    return filtered.map((hero) => ({
      ...hero,
      originalRank: ranked.findIndex((h) => h.name === hero.name) + 1,
    }));
  }, [ranked, searchQuery]);

  return (
    <ThemeProvider theme={darkTheme}>
      <Box
        sx={{
          minHeight: "100vh",
          width: "100%",
          p: 4,
          boxSizing: "border-box",
          backgroundImage: `url(${process.env.PUBLIC_URL}/images/gymbackground.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: 6,
            width: "100%",
            maxWidth: 960,
          }}
        >
          <Box sx={{ position: "relative" }}>
            <img src={`${process.env.PUBLIC_URL}/images/fireTitle.gif`} />
          </Box>

          {/* Search Box */}
          <Box sx={{ width: "100%", maxWidth: 500, mb: 2 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Search heroes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "rgba(255,255,255,0.6)" }} />
                  </InputAdornment>
                ),
                sx: {
                  backgroundColor: "rgba(0,0,0,0.7)",
                  borderRadius: 2,
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.2)",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "rgba(255,255,255,0.4)",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#ff4444",
                  },
                  color: "#ffffff",
                },
              }}
              sx={{
                "& .MuiInputBase-input::placeholder": {
                  color: "rgba(255,255,255,0.5)",
                  opacity: 1,
                },
              }}
            />
          </Box>

          <TableContainer
            component={Paper}
            elevation={6}
            sx={{
              borderRadius: 3,
              overflow: "visible",
              position: "relative",
              background: "rgba(10,10,10,0.55)",
              boxShadow: (theme) =>
                `0 8px 40px rgba(0,0,0,0.6), inset 0 1px 0 rgba(255,255,255,0.02)`,
            }}
          >
            {/* Bloody overlay */}
            <Box
              sx={{
                position: "absolute",
                inset: 0,
                zIndex: 0,
                pointerEvents: "none",
                opacity: 0.25,
                backgroundImage: `radial-gradient(circle at 10% 20%, rgba(120,0,0,0.6), transparent 10%), radial-gradient(circle at 80% 40%, rgba(90,0,0,0.5), transparent 8%)`,
                mixBlendMode: "multiply",
              }}
            />

            <Table sx={{ minWidth: 700, position: "relative", zIndex: 1 }}>
              <TableHead>
                <TableRow
                  sx={{
                    background: "linear-gradient(90deg,#111,#1b1b1b)",
                    borderBottom: "1px solid rgba(255,255,255,0.03)",
                  }}
                >
                  <TableCell sx={{ color: "#ddd", fontWeight: 700 }}>
                    Rank
                  </TableCell>
                  <TableCell sx={{ color: "#ddd", fontWeight: 700 }}>
                    Hero
                  </TableCell>
                  <TableCell
                    align="right"
                    sx={{ color: "#ddd", fontWeight: 700 }}
                  >
                    Total
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {filteredAndRanked.map((hero, i) => {
                  const actualRank =
                    "originalRank" in hero ? hero.originalRank : i + 1;
                  return (
                    <TableRow
                      key={hero.name}
                      sx={{
                        position: "relative",
                        background:
                          actualRank === 1
                            ? "linear-gradient(90deg, rgba(255,215,0,0.08), rgba(0,0,0,0.4))"
                            : actualRank === 2
                            ? "linear-gradient(90deg, rgba(192,192,192,0.08), rgba(0,0,0,0.4))"
                            : actualRank === 3
                            ? "linear-gradient(90deg, rgba(205,127,50,0.08), rgba(0,0,0,0.4))"
                            : "linear-gradient(90deg, rgba(255,255,255,0.02), rgba(0,0,0,0.35))",
                        borderBottom: "1px solid rgba(255,255,255,0.03)",
                        transition: "transform 180ms ease",
                        "&:hover": {
                          transform: "translateY(-3px)",
                          boxShadow: (theme) => "0 12px 40px rgba(0,0,0,0.6)",
                        },
                      }}
                    >
                      <TableCell>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <RankingNumber rank={actualRank as number} />
                        </Box>
                      </TableCell>

                      <TableCell>
                        <Box
                          sx={{ display: "flex", gap: 2, alignItems: "center" }}
                        >
                          <Box
                            sx={{
                              width: 56,
                              height: 56,
                              borderRadius: 1,
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontWeight: 800,
                              background:
                                "linear-gradient(180deg,#d6d6d6,#9a9a9a)",
                              color: "#111",
                              boxShadow: "inset 0 2px 6px rgba(0,0,0,0.5)",
                            }}
                          >
                            {hero.name[0]}
                          </Box>
                          <Box>
                            <Typography sx={{ fontWeight: 700 }}>
                              {hero.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{ color: "rgba(255,255,255,0.6)" }}
                            >
                              {hero.Records.map(
                                (r) => `${r.type} ${r.value}kg`
                              ).join(" • ")}
                            </Typography>
                          </Box>
                        </Box>
                      </TableCell>

                      <TableCell align="right">
                        <Typography
                          sx={{
                            fontWeight: 900,
                            letterSpacing: 1.2,
                            color:
                              actualRank === 1
                                ? "#FFD700"
                                : actualRank === 2
                                ? "#C0C0C0"
                                : actualRank === 3
                                ? "#CD7F32"
                                : "#ffd9d9",
                          }}
                        >
                          {hero.total} KG
                        </Typography>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
