import React, { useState, useEffect } from "react";
import { BentoGrid, BentoGridItem } from "@components/ui/bento-grid";
import useSwr from "swr";
import { payload } from "@/lib/payload";
import { useRouter } from "next/router";
import StickersStack from "./StickersStack";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function BentoGridAdmin() {
  const [periodo, setPeriodo] = useState("todos");
  const [startDate, setStartDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const [endDate, setEndDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  const router = useRouter();

  useEffect(() => {
    const { startDate, endDate } = router.query;

    if (startDate) {
      setStartDate(formatDate(startDate as string));
    }
    if (endDate) {
      setEndDate(formatDate(endDate as string));
    }
  }, [router.query]);

  useEffect(() => {
    if (periodo === "hoy") {
      setStartDate(new Date().toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    } else if (periodo === "ayer_y_hoy") {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      setStartDate(yesterday.toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    } else if (periodo === "esta_semana") {
      const today = new Date();
      const firstDay = new Date(
        today.setDate(today.getDate() - today.getDay())
      );
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    } else if (periodo === "este_mes") {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth(), 1);
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    } else if (periodo === "el_mes_pasado") {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), today.getMonth() - 1, 1);
      const lastDay = new Date(today.getFullYear(), today.getMonth(), 0);
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(lastDay.toISOString().split("T")[0]);
    } else if (periodo === "este_año") {
      const today = new Date();
      const firstDay = new Date(today.getFullYear(), 0, 1);
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(new Date().toISOString().split("T")[0]);
    } else if (periodo === "el_año_pasado") {
      const today = new Date();
      const firstDay = new Date(today.getFullYear() - 1, 0, 1);
      const lastDay = new Date(today.getFullYear() - 1, 11, 31);
      setStartDate(firstDay.toISOString().split("T")[0]);
      setEndDate(lastDay.toISOString().split("T")[0]);
    }
  }, [periodo]);

  function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toISOString().split("T")[0];
  }

  function handleDateChange(dateType: "start" | "end", value: string) {
    const formattedDate = formatDate(value);

    if (dateType === "start") {
      setStartDate(formattedDate);
    } else {
      setEndDate(formattedDate);
    }

    const newQuery = { ...router.query, [`${dateType}Date`]: formattedDate };
    router.push({ pathname: router.pathname, query: newQuery }, undefined, {
      shallow: true,
    });
  }

  function generateFetchUrl() {
    let url = `/orders?where[paid][equals]=true&sort=-createdAt&limit=200&page=1`;

    if (startDate) {
      url += `&startDate=${startDate}&where[or][0][and][0][createdAt][greater_than]=${new Date(
        startDate
      ).toISOString()}`;
    }

    if (endDate) {
      url += `&endDate=${endDate}&where[or][0][and][1][createdAt][less_than]=${new Date(
        endDate
      ).toISOString()}`;
    }

    return url;
  }

  const fetchUrl = generateFetchUrl();
  const { data: dataVentas, error: errorVentas }: any = useSwr(
    fetchUrl,
    payload
  );

  if (errorVentas) return <div>failed to load</div>;
  if (!dataVentas) return <div>loading...</div>;

  const ventas = dataVentas?.data?.docs || [];

  return (
    <div className="space-y-6 text-left text-balance">
      <div className="grid grid-cols-3 gap-6">
        <div className="mt-auto">
          <Select name="periodo" value={periodo} onValueChange={setPeriodo}>
            <span>Periodo:</span>
            <SelectTrigger className="h-[50px] bg-muted">
              <SelectValue placeholder="Periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Corto plazo</SelectLabel>
                <SelectItem value="hoy">Hoy</SelectItem>
                <SelectItem value="ayer_y_hoy">Ayer y hoy</SelectItem>
                <SelectItem value="esta_semana">Esta semana</SelectItem>
              </SelectGroup>
              <SelectGroup>
                <SelectLabel>Largo plazo</SelectLabel>
                <SelectItem value="este_mes">Este mes</SelectItem>
                <SelectItem value="el_mes_pasado">El mes pasado</SelectItem>
                <SelectItem value="este_año">Este año</SelectItem>
                <SelectItem value="el_año_pasado">El año pasado</SelectItem>
                <SelectItem value="todos">Todos</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <label htmlFor="startDate">Desde:</label>
          <input
            type="date"
            id="startDate"
            value={startDate}
            onChange={(e) => handleDateChange("start", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="endDate">Hasta:</label>
          <input
            type="date"
            id="endDate"
            value={endDate}
            onChange={(e) => handleDateChange("end", e.target.value)}
          />
        </div>
      </div>
      <BentoGrid className="w-full">
        <BentoGridItem
          className="card text-primary"
          title={"Ventas Totales"}
          description={"durante este periodo"}
          header={<div className="text-7xl font-bold">{ventas.length}</div>}
        />
        <BentoGridItem
          className="card col-span-2 !p-0"
          header={
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Comprador
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Productos
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Fecha y Hora
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Monto
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {ventas.map((venta, i) => (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 cursor-pointer"
                      key={`${venta.id}-${i}`}
                    >
                      <td
                        className="px-6 py-4"
                        onClick={() =>
                          router.push(`/admin/pedidos/${venta.id}`)
                        }
                      >
                        {venta.name}
                      </td>
                      <td className="px-6 py-4">
                        <StickersStack stickers={venta?.items as any} />
                      </td>
                      <td
                        className="px-6 py-4"
                        onClick={() =>
                          router.push(`/admin/pedidos/${venta.id}`)
                        }
                      >
                        {new Date(venta.createdAt).toLocaleString("es-ES", {
                          dateStyle: "long",
                          timeStyle: "short",
                        })}
                      </td>
                      <td
                        className="px-6 py-4 font-bold text-lg"
                        onClick={() =>
                          router.push(`/admin/pedidos/${venta.id}`)
                        }
                      >
                        ${venta.total}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        />
      </BentoGrid>
    </div>
  );
}
