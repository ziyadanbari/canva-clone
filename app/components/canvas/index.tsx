import { useAppDispatch, useAppSelector } from "@/app/hooks/app";
import { Items, Shape, Shapes } from "@/app/types";
import Konva from "konva";
import React, { useState, useRef, useEffect, Fragment } from "react";
import { Stage, Layer, Rect, Circle } from "react-konva";
import ShapeComponent from "./Shape";
import Text from "./Text";
import Image from "./Image";
import { selectItem } from "@/app/store/reducers/canvaDataReducer";

const CanvasDataVisualizer = () => {
  const canvasData = useAppSelector((state) => state.canvas);
  const dispatch = useAppDispatch();
  const { items, history } = canvasData;
  const [uniqueItems, setUniqueItems] = useState<string[]>([]);
  useEffect(() => {
    if (canvasData.items)
      setUniqueItems(
        Object.entries(canvasData.items)
          .map(
            ([key, value]) =>
              ["images", "texts", "shapes"].includes(key as Shapes) &&
              value.map((v: any) => v.id)
          )
          .filter((ele) => ele)
          .flat() as string[]
      );
  }, [items]);

  return (
    <>
      {uniqueItems.map((itemId) => {
        const items = history.filter(
          (ele) => ele.id === itemId && !ele.disabled
        );
        const recentItemData = items.sort(
          (a, b) => b.timestamp - a.timestamp
        )[0];
        return (
          <Fragment key={itemId}>
            {(() => {
              switch (recentItemData?.type) {
                case Items.shape:
                  return (
                    <ShapeComponent
                      isSelected={canvasData.items.selectedItem === itemId}
                      onSelect={() => dispatch(selectItem({ id: itemId }))}
                      shapeProps={{ ...(recentItemData.data as Shape) }}
                    />
                  );
                case Items.text:
                  return <Text />;
                case Items.image:
                  return <Image />;
                default:
                  return <></>;
              }
            })()}
          </Fragment>
        );
      })}
    </>
  );
};

const CenteredLayer = () => {
  const [scale, setScale] = useState<number>(1); // Initial scale
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [lastPos, setLastPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const stageRef = useRef<Konva.Stage>(null);

  const stageWidth = 440;
  const stageHeight = 400;

  const handleWheel = (event: Konva.KonvaEventObject<WheelEvent>) => {
    event.evt.preventDefault(); // Prevent default scrolling behavior

    const scaleBy = 1.1;
    const newScale =
      event.evt.deltaY > 0
        ? Math.max(scale / scaleBy, 0.1) // Zoom out
        : Math.min(scale * scaleBy, 10); // Zoom in

    setScale(newScale);
  };

  const handleMouseDown = (event: Konva.KonvaEventObject<MouseEvent>) => {
    setIsDragging(true);
    const { x, y } = event.target.getStage()!.getPointerPosition()!;
    setLastPos({ x, y });
  };

  useEffect(() => {
    if (isDragging) {
      document.body.classList.add("cursor-grabbing");
    } else {
      document.body.classList.remove("cursor-grabbing");
    }
  }, [isDragging]);

  const handleMouseMove = (event: Konva.KonvaEventObject<MouseEvent>) => {
    if (!isDragging) return;

    const { x, y } = event.target.getStage()!.getPointerPosition()!;
    const dx = x - lastPos.x;
    const dy = y - lastPos.y;

    if (stageRef.current) {
      const newPos = {
        x: stageRef.current.x() + dx,
        y: stageRef.current.y() + dy,
      };

      stageRef.current.position(newPos);
      setLastPos({ x, y });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div>
      <Stage
        width={stageWidth}
        height={stageHeight}
        className="w-[440px] h-[400px] bg-main-background"
        scaleX={scale}
        scaleY={scale}
        onWheel={handleWheel}
        // onMouseDown={handleMouseDown}
        // onMouseMove={handleMouseMove}
        // onMouseUp={handleMouseUp}
        ref={stageRef}
        x={stageWidth / 2}
        y={stageHeight / 2}
        offsetX={stageWidth / 2}
        offsetY={stageHeight / 2}>
        <Layer>
          <CanvasDataVisualizer />
        </Layer>
      </Stage>
    </div>
  );
};

export default CenteredLayer;
