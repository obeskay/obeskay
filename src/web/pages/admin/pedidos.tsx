import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  DndContext,
  closestCorners,
  DragEndEvent,
  DragStartEvent,
  DragOverEvent,
  DragOverlay,
  DropAnimation,
  defaultDropAnimation,
} from "@dnd-kit/core";
import { sortableKeyboardCoordinates, arrayMove } from "@dnd-kit/sortable";
import { getServerSession } from "next-auth/next";
import { authOptions } from "pages/api/auth/[...nextauth]";
import AdminLayout from "@/components/layouts/admin";
import { Button } from "@/components/ui/button";
import useMeasure from "react-use-measure";
import { cn } from "@/lib/utils";

// Import missing dependencies
import {
  useSensors,
  useSensor,
  PointerSensor,
  KeyboardSensor,
} from "@dnd-kit/core";

// Define missing variables and functions
const findBoardSectionContainer = (columnas: any, id: any) => {
  for (const [section, items] of Object.entries(columnas)) {
    if ((items as string[]).includes(id)) {
      return section;
    }
  }
};

const Pedidos = () => {
  const [columnas, setColumnas] = useState({
    pendientes: ["Pedido 1", "Pedido 2", "Pedido 3"],
    enProceso: [],
    completados: [],
  });

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = ({ active }: DragStartEvent) => {
    // setActiveTaskId(active.id as string);
  };

  const handleDragOver = ({ active, over }: DragOverEvent) => {
    const activeContainer: any = findBoardSectionContainer(
      columnas,
      active.id as string
    );
    const overContainer: any = findBoardSectionContainer(
      columnas,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer === overContainer
    ) {
      return;
    }

    setColumnas((columnas) => {
      const activeItems = columnas[activeContainer];
      const overItems = columnas[overContainer];

      // Fix type annotation for activeIndex
      const activeIndex = activeItems.findIndex(
        (item: any) => item === active.id
      );
      // Fix type annotation for overIndex
      const overIndex = overItems.findIndex((item: any) => item !== over?.id);

      return {
        ...columnas,
        [activeContainer]: [
          ...columnas[activeContainer].filter(
            (item: any) => item !== active.id
          ),
        ],
        [overContainer]: [
          ...columnas[overContainer].slice(0, overIndex),
          columnas[activeContainer][activeIndex],
          ...columnas[overContainer].slice(
            overIndex,
            columnas[overContainer].length
          ),
        ],
      };
    });
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    const activeContainer: any = findBoardSectionContainer(
      columnas,
      active.id as string
    );
    const overContainer: any = findBoardSectionContainer(
      columnas,
      over?.id as string
    );

    if (
      !activeContainer ||
      !overContainer ||
      activeContainer !== overContainer
    ) {
      return;
    }

    const activeIndex = columnas[activeContainer].findIndex(
      (pedido: any) => pedido === active.id
    );
    const overIndex = columnas[overContainer].findIndex(
      (pedido: any) => pedido === over?.id
    );

    if (activeIndex !== overIndex) {
      setColumnas((columnas) => ({
        ...columnas,
        [overContainer]: arrayMove(
          columnas[overContainer],
          activeIndex,
          overIndex
        ),
      }));
    }
  };

  const dropAnimation: DropAnimation = {
    ...defaultDropAnimation,
  };

  const Pedido = ({
    pedido,
    index,
    droppableId,
    heightColumnRef,
    widthColumnRef,
  }: {
    pedido: string;
    index: number;
    droppableId: string;
    heightColumnRef: number;
    widthColumnRef: number;
  }) => {
    return (
      <motion.div
        layout="preserve-aspect"
        layoutId={`pedido-${pedido}`}
        drag
        initial="initial"
        animate="animate"
        exit="exit"
        variants={{
          dragging: {
            scale: 1.05,
            rotate: 5,
            zIndex: 3,
          },
          animate: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              duration: 0.5,
            },
          },
        }}
        dragConstraints={{
          top: 0,
          left: 0,
          right: widthColumnRef,
          bottom: heightColumnRef,
        }}
        dragElastic={0.1}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className={cn(`px-4 py-2 bg-white shadow rounded-2xl mb-2 cursor-move`)}
      >
        <p>{pedido}</p>
        <Button
          onClick={() => {
            const items = Array.from(columnas[droppableId]);
            items.splice(index, 1);
            setColumnas({ ...columnas, [droppableId]: items });
          }}
          className="mt-2"
        >
          Eliminar
        </Button>
      </motion.div>
    );
  };

  const Columna = ({
    title,
    droppableId,
  }: {
    title: string;
    droppableId: string;
  }) => {
    const [ref, { height, width }] = useMeasure();

    return (
      <div className="flex-1 p-4">
        <h2 className="text-lg font-bold mb-4">{title}</h2>
        <div ref={ref} style={{ height }}>
          {columnas[droppableId].map((pedido: string, index: number) => (
            <Pedido
              key={pedido}
              pedido={pedido}
              index={index}
              droppableId={droppableId}
              heightColumnRef={height}
              widthColumnRef={width}
            />
          ))}
        </div>
      </div>
    );
  };

  return (
    <AdminLayout>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-col md:flex-row w-full h-full">
          {Object.entries(columnas).map(([columnId, pedidos]) => (
            <Columna key={columnId} title={columnId} droppableId={columnId} />
          ))}
        </div>
        <DragOverlay dropAnimation={dropAnimation}>
          {/* Fix the reference to task */}
          {/* {task ? <TaskItem task={task} /> : null} */}
        </DragOverlay>
      </DndContext>
    </AdminLayout>
  );
};

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(context.req, context.res, authOptions);
  if (!session) {
    return { redirect: { destination: "/admin/login", permanent: false } };
  }
  return { props: {} };
};

export default Pedidos;
