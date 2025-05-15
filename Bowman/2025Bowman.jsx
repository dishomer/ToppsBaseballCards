import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function BowmanChecklistViewer() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("../data/2025BowmanChecklist.json") // 修改為你的實際檔案路徑
      .then((res) => res.json())
      .then((json) => setData(json));
  }, []);

  const filtered = data.filter(
    (entry) =>
      entry.team.toLowerCase().includes(search.toLowerCase()) ||
      entry.player.toLowerCase().includes(search.toLowerCase()) ||
      entry.year.toString().includes(search) ||
      entry.category.toLowerCase().includes(search.toLowerCase()) ||
      entry.cardNumber.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-6 space-y-4">
      <Input
        placeholder="搜尋球員、卡號、球隊、年份或分類"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((entry, idx) => (
          <Card key={idx}>
            <CardContent className="p-4 space-y-2">
              <div className="text-xl font-semibold">{entry.player}</div>
              <div className="text-sm text-muted-foreground">{entry.team}</div>
              <div className="text-sm">Card #: {entry.cardNumber}</div>
              <div className="text-sm">Category: {entry.category}</div>
              <div className="text-sm">Year: {entry.year}</div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}