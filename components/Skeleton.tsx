import Skeleton from "@mui/material/Skeleton";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";

export default function SkeletonLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Stack spacing={1}>
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />

        <Skeleton variant="circular" width={40} height={40} />
        <Skeleton variant="rectangular" width={610} height={60} />
        <Skeleton variant="rectangular" width={610} height={60} />
      </Stack>
    </Box>
  );
}
