import React from "react";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid2";
import StarIcon from "@mui/icons-material/Star";
import { useAppDispatch } from "@/app/hooks/app";
import { addItemToCanvas } from "@/app/store/reducers/canvaDataReducer";
import { defaultShapes } from "@/app/constants";
import { Items } from "@/app/types";

const ShapeDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const shapes = [
    {
      id: "square",
      style: {
        width: "50px",
        height: "50px",
        backgroundColor: "blue",
      },
      onClick: () => {
        dispatch(
          addItemToCanvas({
            type: Items.shape,
            item: { ...defaultShapes.square },
          })
        );
      },
    },
    {
      id: "circle",
      style: {
        width: "50px",
        height: "50px",
        backgroundColor: "red",
        borderRadius: "50%",
      },
      onClick: () => {
        dispatch(
          addItemToCanvas({
            type: Items.shape,
            item: { ...defaultShapes.circle },
          })
        );
      },
    },
    {
      id: "star",
      component: <StarIcon style={{ fontSize: 50, color: "gold" }} />,
      onClick: () => {
        dispatch(
          addItemToCanvas({
            type: Items.shape,
            item: { ...defaultShapes.star },
          })
        );
      },
    },
  ];

  return (
    <Grid container spacing={2} columns={{ xs: 2 }} alignItems="center">
      {shapes.map((shape) => (
        <Grid key={shape.id} size={1}>
          <Paper
            elevation={3}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100px",
              cursor: "pointer",
            }}
            className="hover:bg-[var(--palette-main-background)]"
            onClick={shape.onClick}>
            {shape.component || <div style={shape.style} />}
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default ShapeDrawer;
