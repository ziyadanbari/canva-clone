import { useRef, useEffect } from "react";
import { useAppDispatch } from "@/app/hooks/app";
import { updateItemInCanvas } from "@/app/store/reducers/canvaDataReducer";
import { Items, Shapes, type Shape } from "@/app/types";
import React from "react";
import { Rect, Circle, Star, Transformer } from "react-konva";

const Shape = ({
  shapeProps,
  isSelected,
  onSelect,
}: {
  shapeProps: Shape;
  isSelected: boolean;
  onSelect: () => void;
}) => {
  const dispatch = useAppDispatch();
  const shapeRef = useRef<any>(null);
  const transformerRef = useRef<any>(null);

  const updateItemData = (itemId: string, dataToUpdate: Partial<Shape>) => {
    dispatch(
      updateItemInCanvas({
        itemId,
        dataToUpdate,
        itemType: Items.shape,
      })
    );
  };

  useEffect(() => {
    if (isSelected) {
      transformerRef.current.nodes([shapeRef.current]);
      transformerRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);

  return (
    <>
      {(() => {
        const {
          id,
          position = { x: 0, y: 0 },
          fill = "#c4c4c4",
          type,
        } = shapeProps;
        const { x, y } = position;

        switch (type) {
          case Shapes.circle:
            const { radius = 20 } = shapeProps.circleProps || {};
            return (
              <>
                <Circle
                  ref={shapeRef}
                  onClick={onSelect}
                  onDragEnd={(e) => {
                    const { x, y } = { x: e.target.x(), y: e.target.y() };
                    updateItemData(id, { position: { x, y } });
                  }}
                  onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // Apply changes
                    updateItemData(id, {
                      position: {
                        x: node.x(),
                        y: node.y(),
                      },
                      circleProps: {
                        radius: Math.max(20, node.width() * scaleX) / 2,
                      },
                    });

                    node.scaleX(1);
                    node.scaleY(1);
                  }}
                  draggable={true}
                  x={x}
                  y={y}
                  fill={fill as string}
                  radius={radius}
                />
                {isSelected && <Transformer ref={transformerRef} />}
              </>
            );

          case Shapes.square:
            const { width = 50, height = 50 } = shapeProps;
            return (
              <>
                <Rect
                  ref={shapeRef}
                  onClick={onSelect}
                  onDragEnd={(e) => {
                    const { x, y } = { x: e.target.x(), y: e.target.y() };
                    updateItemData(id, { position: { x, y } });
                  }}
                  onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();
                    
                    // Apply changes
                    updateItemData(id, {
                      position: { x: node.x(), y: node.y() },
                      width: Math.max(5, node.width() * scaleX),
                      height: Math.max(5, node.height() * scaleY),
                    });

                    node.scaleX(1);
                    node.scaleY(1);
                  }}
                  draggable={true}
                  x={x}
                  y={y}
                  fill={fill as string}
                  width={width}
                  height={height}
                />
                {isSelected && <Transformer ref={transformerRef} />}
              </>
            );

          case Shapes.star:
            const { starProps = {} } = shapeProps;
            const { numPoints = 5,innerRadius = 20,outerRadius = 40 } = starProps;
            return (
              <>
                <Star
                  ref={shapeRef}
                  onClick={onSelect}
                  onDragEnd={(e) => {
                    const { x, y } = { x: e.target.x(), y: e.target.y() };
                    updateItemData(id, { position: { x, y } });
                  }}
                  onTransformEnd={(e) => {
                    const node = shapeRef.current;
                    const scaleX = node.scaleX();
                    const scaleY = node.scaleY();

                    // Apply changes
                    updateItemData(id, {
                      position: { x: node.x(), y: node.y() },
                      starProps: {innerRadius: innerRadius * Math.max(scaleX, scaleY),
                      outerRadius: outerRadius * Math.max(scaleX, scaleY)},
                    });

                    node.scaleX(1);
                    node.scaleY(1);
                  }}
                  draggable={true}
                  x={x}
                  y={y}
                  fill={fill as string}
                  innerRadius={innerRadius}
                  outerRadius={outerRadius}
                  numPoints={numPoints}
                />
                {isSelected && <Transformer ref={transformerRef} />}
              </>
            );

          default:
            return null;
        }
      })()}
    </>
  );
};

export default Shape;
