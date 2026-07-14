import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

// 1. 타입 정의
interface RecipeItem {
  code: string;
  ingredient: string;
  weight: number;
}

interface MenuItem {
  id: number;
  name: string;
  recipe: RecipeItem[];
}

const UNRECEIVED_INGREDIENTS = ["H0001", "AC009", "MNG02"];

const FLAVOR_DATA: Record<string, MenuItem[]> = {
  today: [
    {
      id: 101,
      name: "팥향 A0001",
      recipe: [
        { code: "FC0001", ingredient: "Red Bean Extract", weight: 0.6 },
        { code: "H0001", ingredient: "Hydrophilic Maltol", weight: 2.4 },
        { code: "D0001", ingredient: "Diacetyl Substitute", weight: 7.0 },
      ],
    }, // 총 10.0kg
    {
      id: 102,
      name: "딸기향 F0002",
      recipe: [
        { code: "SB0102", ingredient: "Strawberry Essence", weight: 20 },
        { code: "PG0004", ingredient: "Propylene Glycol", weight: 8 },
        { code: "W0001", ingredient: "Purified Water", weight: 2 },
      ],
    }, // 총 30.0kg
    {
      id: 103,
      name: "바닐라향 V0003",
      recipe: [
        { code: "VN001", ingredient: "Vanillin", weight: 1.5 },
        { code: "ET002", ingredient: "Ethanol 95%", weight: 18.5 },
      ],
    }, // 총 20.0kg
    {
      id: 104,
      name: "초코향 C0004",
      recipe: [
        { code: "CC005", ingredient: "Cocoa Extract Base", weight: 12.0 },
        { code: "ML001", ingredient: "Maltol", weight: 3.5 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 14.5 },
      ],
    }, // 총 30.0kg
    {
      id: 105,
      name: "바나나향 B0005",
      recipe: [
        { code: "BN012", ingredient: "Isoamyl Acetate", weight: 4.2 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 25.8 },
      ],
    }, // 총 30.0kg
    {
      id: 106,
      name: "사과향 A0006",
      recipe: [
        { code: "AP003", ingredient: "Apple Essence", weight: 15.0 },
        { code: "AC009", ingredient: "Acetic Acid", weight: 1.2 },
        { code: "W0001", ingredient: "Purified Water", weight: 3.8 },
      ],
    }, // 총 20.0kg
    {
      id: 107,
      name: "포도향 G0007",
      recipe: [
        { code: "GP055", ingredient: "Grape Juice Conc", weight: 22.0 },
        { code: "ET002", ingredient: "Ethanol 95%", weight: 8.0 },
      ],
    }, // 총 30.0kg
    {
      id: 108,
      name: "오렌지향 O0008",
      recipe: [
        { code: "OR011", ingredient: "Orange Oil Orange", weight: 6.5 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 23.5 },
      ],
    }, // 총 30.0kg
    {
      id: 109,
      name: "민트향 M0009",
      recipe: [
        { code: "MN002", ingredient: "L-Menthol Crystals", weight: 2.8 },
        { code: "ET002", ingredient: "Ethanol 95%", weight: 17.2 },
      ],
    }, // 총 20.0kg
    {
      id: 110,
      name: "커피향 CF0010",
      recipe: [
        { code: "COF01", ingredient: "Coffee Distillate", weight: 35.0 },
        { code: "FUR02", ingredient: "Furfuryl Mercaptan", weight: 0.5 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 4.5 },
      ],
    }, // 총 40.0kg
  ],
  tommorw: [
    {
      id: 201,
      name: "복숭아향 P0011",
      recipe: [
        { code: "PCH01", ingredient: "Peach Aldehyde C-14", weight: 3.8 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 26.2 },
      ],
    },
    {
      id: 202,
      name: "망고향 M0012",
      recipe: [
        { code: "MNG02", ingredient: "Mango Base Note", weight: 11.5 },
        { code: "W0001", ingredient: "Purified Water", weight: 8.5 },
      ],
    },
    {
      id: 203,
      name: "멜론향 ML0013",
      recipe: [
        { code: "MEL05", ingredient: "Melon Extract", weight: 14.0 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 16.0 },
      ],
    },
    {
      id: 204,
      name: "요거트향 Y0014",
      recipe: [
        { code: "YGT01", ingredient: "Lactic Acid 80%", weight: 5.5 },
        { code: "BUT03", ingredient: "Diacetyl Base", weight: 0.5 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 24.0 },
      ],
    },
    {
      id: 205,
      name: "블루베리향 BB0015",
      recipe: [
        { code: "BLU09", ingredient: "Blueberry Base", weight: 18.0 },
        { code: "ET002", ingredient: "Ethanol 95%", weight: 12.0 },
      ],
    },
    {
      id: 206,
      name: "레몬향 L0016",
      recipe: [
        { code: "LMN01", ingredient: "Lemon Oil Cold Pressed", weight: 8.2 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 21.8 },
      ],
    },
    {
      id: 207,
      name: "체리향 C0017",
      recipe: [
        { code: "CH004", ingredient: "Benzaldehyde", weight: 2.5 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 27.5 },
      ],
    },
    {
      id: 208,
      name: "파인애플향 PA0018",
      recipe: [
        { code: "PA077", ingredient: "Allyl Caproate", weight: 3.2 },
        { code: "ET002", ingredient: "Ethanol 95%", weight: 26.8 },
      ],
    },
    {
      id: 209,
      name: "녹차향 GT0019",
      recipe: [
        { code: "GTC01", ingredient: "Green Tea Oleoresin", weight: 9.0 },
        { code: "W0001", ingredient: "Purified Water", weight: 21.0 },
      ],
    },
    {
      id: 210,
      name: "밀크향 MK0020",
      recipe: [
        { code: "MK002", ingredient: "Milk Lactone", weight: 1.2 },
        { code: "VAN01", ingredient: "Vanillin", weight: 0.8 },
        { code: "PG004", ingredient: "Propylene Glycol", weight: 28.0 },
      ],
    },
  ],
};

const OPERATORS = [
  "김현철(식향)",
  "최훈",
  "옥인직",
  "임진규",
  "강민성",
  "하준구",
  "카오민드엉",
];

// [신규 로직] 총 중량을 기준으로 20kg, 10kg, 5kg 통이 몇 개 필요한지 계산하는 함수
function calculateContainers(totalWeight: number) {
  let remaining = Math.round(totalWeight * 100) / 100; // 소수점 오차 방지
  const containers: { spec: number; count: number }[] = [];

  const specs = [20, 10, 5]; // 큰 통부터 우선 배정

  for (const spec of specs) {
    if (remaining >= spec) {
      const count = Math.floor(remaining / spec);
      containers.push({ spec, count });
      remaining = Math.round((remaining % spec) * 100) / 100;
    }
  }

  // 만약 5kg 미만의 애매한 잔량이 남았다면 가장 작은 5kg 통 1개에 담도록 처리
  if (remaining > 0) {
    const existing5 = containers.find((c) => c.spec === 5);
    if (existing5) {
      existing5.count += 1;
    } else {
      containers.push({ spec: 5, count: 1 });
    }
  }

  return containers;
}

export default function MomstouchKiosk() {
  const [activeCategory, setActiveCategory] = useState<string>("today");
  const [detailFlavor, setDetailFlavor] = useState<MenuItem | null>(null);
  const [isOperatorModalOpen, setIsOperatorModalOpen] =
    useState<boolean>(false);
  const [completedFlavors, setCompletedFlavors] = useState<number[]>([]);
  const [receiptData, setReceiptData] = useState<{
    flavor: MenuItem;
    operator: string;
    date: string;
    totalWeight: number;
    containers: { spec: number; count: number }[];
  } | null>(null);

  const categories = [
    { key: "today", vale: "7월15일" },
    { key: "tommorw", vale: "7월16일" },
  ];

  const currentMenu = (FLAVOR_DATA[activeCategory] || []).filter(
    (menu) => !completedFlavors.includes(menu.id)
  );

  const getUnreceivedIngredientsInMenu = (menu: MenuItem) => {
    return menu.recipe.filter((r) => UNRECEIVED_INGREDIENTS.includes(r.code));
  };

  const handleAssignOperator = (operator: string) => {
    if (!detailFlavor) return;

    const totalWeight = detailFlavor.recipe.reduce(
      (sum, r) => sum + r.weight,
      0
    );
    const containers = calculateContainers(totalWeight);

    setReceiptData({
      flavor: detailFlavor,
      operator: operator,
      date: new Date().toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      totalWeight: totalWeight,
      containers: containers,
    });

    setCompletedFlavors((prev) => [...prev, detailFlavor.id]);
    setIsOperatorModalOpen(false);
  };

  const handleCloseReceipt = () => {
    setReceiptData(null);
    setDetailFlavor(null);
  };

  const currentUnreceivedList = detailFlavor
    ? getUnreceivedIngredientsInMenu(detailFlavor)
    : [];
  const isDetailFlavorDisabled = currentUnreceivedList.length > 0;

  // 제품 상세창 전용 중량 및 통 계산
  const detailTotalWeight = detailFlavor
    ? detailFlavor.recipe.reduce((sum, r) => sum + r.weight, 0)
    : 0;
  const detailContainers = detailFlavor
    ? calculateContainers(detailTotalWeight)
    : [];

  return (
    <div className="flex flex-col min-h-screen md:h-screen bg-gray-50 font-sans select-none overflow-x-hidden relative">
      {/* 상단 브랜딩 바 */}
      <header className="bg-orange-500 text-white px-4 py-3 md:px-6 md:py-4 flex flex-wrap justify-between items-center gap-2 shadow-md shrink-0 print:hidden">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="bg-white text-orange-600 font-black px-2.5 py-1 rounded-xl text-base md:text-lg shadow-sm">
            FLAVOR KIOSK
          </span>
        </div>
        <div className="text-xs md:text-sm font-bold bg-orange-600 px-3 py-1.5 rounded-xl text-orange-100">
          대기:{" "}
          <span className="text-white font-black text-sm md:text-base">
            {currentMenu.length}
          </span>
          건
        </div>
      </header>

      {/* 중앙 레이아웃 */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden print:hidden">
        {/* CASE A: 상세 페이지 화면 */}
        {detailFlavor ? (
          <div className="flex-1 flex flex-col bg-white p-4 md:p-8 overflow-y-auto md:overflow-hidden animate-fadeIn">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-3 mb-4 gap-2">
              <div>
                <button
                  onClick={() => setDetailFlavor(null)}
                  className="text-xs font-bold text-gray-400 hover:text-gray-600 mb-1 block"
                >
                  ← 목록으로 돌아가기
                </button>
                <h2 className="text-2xl md:text-3xl font-black text-gray-900">
                  {detailFlavor.name}
                </h2>
              </div>
              <div className="flex flex-col items-end gap-1 w-full sm:w-auto">
                <div className="bg-orange-50 text-orange-600 px-4 py-1.5 rounded-xl border border-orange-200 text-sm md:text-lg font-black w-full sm:w-auto text-center">
                  총 중량: {detailTotalWeight.toFixed(2)} kg
                </div>
                {/* [추가] 제품 설명 영역 통 정보 노출 */}
                <div className="text-xs text-amber-900 font-bold bg-amber-50 px-3 py-1 rounded-lg border border-amber-200">
                  필요 배합통:{" "}
                  {detailContainers
                    .map((c) => `${c.spec}kg x ${c.count}개`)
                    .join(", ")}
                </div>
              </div>
            </div>

            {/* 미입고 경고창 */}
            {isDetailFlavorDisabled && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4 text-red-700 text-xs md:text-sm font-bold">
                ⚠️ 자재 미입고로 제조가 일시 중단되었습니다.
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {currentUnreceivedList.map((r) => (
                    <span
                      key={r.code}
                      className="bg-red-200 text-red-900 text-[11px] px-2 py-0.5 rounded"
                    >
                      [{r.code}] {r.ingredient}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* 상세 배합비 테이블 */}
            <div className="flex-1 border rounded-xl bg-gray-50/50 p-2 md:p-4 overflow-x-auto">
              <div className="min-w-[500px] md:min-w-full">
                <table className="w-full text-left border-collapse bg-white rounded-lg overflow-hidden shadow-sm">
                  <thead>
                    <tr className="bg-amber-950 text-white text-xs md:text-sm">
                      <th className="p-2.5 md:p-4 font-bold w-12">No.</th>
                      <th className="p-2.5 md:p-4 font-bold w-28">코드</th>
                      <th className="p-2.5 md:p-4 font-bold">원재료명</th>
                      <th className="p-2.5 md:p-4 font-bold w-20">상태</th>
                      <th className="p-2.5 md:p-4 font-bold text-right w-24">
                        중량
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 text-xs md:text-sm">
                    {detailFlavor.recipe.map((r, index) => {
                      const isUnreceived = UNRECEIVED_INGREDIENTS.includes(
                        r.code
                      );
                      return (
                        <tr
                          key={index}
                          className={
                            isUnreceived
                              ? "bg-red-50/60 text-red-900"
                              : "hover:bg-gray-50 text-gray-700"
                          }
                        >
                          <td className="p-2.5 md:p-4 font-bold text-gray-400">
                            {index + 1}
                          </td>
                          <td className="p-2.5 md:p-4 font-mono font-bold text-orange-600">
                            [{r.code}]
                          </td>
                          <td className="p-2.5 md:p-4 font-medium truncate max-w-[150px] md:max-w-none">
                            {r.ingredient}
                          </td>
                          <td className="p-2.5 md:p-4">
                            {isUnreceived ? (
                              <span className="bg-red-600 text-white px-1.5 py-0.5 rounded text-[10px] font-bold">
                                미입고
                              </span>
                            ) : (
                              <span className="bg-green-100 text-green-700 px-1.5 py-0.5 rounded text-[10px] font-bold">
                                정상
                              </span>
                            )}
                          </td>
                          <td className="p-2.5 md:p-4 text-right font-black">
                            {r.weight.toFixed(1)}kg
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* 하단 제어 버튼 */}
            <div className="mt-4 grid grid-cols-4 gap-2 pb-4 md:pb-0">
              <Button
                variant="outline"
                className="h-14 md:h-20 text-sm md:text-xl font-bold rounded-xl border-gray-300 text-gray-600"
                onClick={() => setDetailFlavor(null)}
              >
                목록
              </Button>
              <Button
                className={`col-span-3 h-14 md:h-20 text-base md:text-2xl font-black rounded-xl shadow-md ${
                  isDetailFlavorDisabled
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-orange-500 text-white hover:bg-orange-600"
                }`}
                disabled={isDetailFlavorDisabled}
                onClick={() => setIsOperatorModalOpen(true)}
              >
                {isDetailFlavorDisabled
                  ? "❌ 제조 불가 (자재 미입고)"
                  : "🚀 제조 시작 (담당자)"}
              </Button>
            </div>
          </div>
        ) : (
          /* CASE B: 향료 목록 화면 */
          <>
            <div className="flex flex-row md:flex-col gap-2 p-2 bg-amber-50 border-b md:border-b-0 md:border-r overflow-x-auto md:overflow-x-visible shrink-0 w-full md:w-32">
              {categories.map((category) => (
                <Button
                  key={category.key}
                  variant={
                    activeCategory === category.key ? "default" : "ghost"
                  }
                  className={`flex-1 md:flex-initial h-14 md:h-24 text-base md:text-xl font-black rounded-xl transition-all whitespace-nowrap px-6 md:px-2 ${
                    activeCategory === category.key
                      ? "bg-orange-500 text-white shadow-md"
                      : "text-amber-900 hover:bg-amber-100/70"
                  }`}
                  onClick={() => setActiveCategory(category.key)}
                >
                  {category.vale}
                </Button>
              ))}
            </div>

            <ScrollArea className="flex-1 p-4 md:p-6 bg-white overflow-y-auto">
              {currentMenu.length === 0 ? (
                <div className="py-20 flex flex-col items-center justify-center text-center bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                  <span className="text-3xl mb-2">🎉</span>
                  <h3 className="text-base md:text-xl font-black text-gray-800">
                    모든 제조 배정 완료!
                  </h3>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pb-6">
                  {currentMenu.map((menu) => {
                    const menuTotalWeight = menu.recipe.reduce(
                      (sum, r) => sum + r.weight,
                      0
                    );
                    const unreceivedInMenu =
                      getUnreceivedIngredientsInMenu(menu);
                    const hasUnreceived = unreceivedInMenu.length > 0;
                    const menuContainers = calculateContainers(menuTotalWeight);

                    return (
                      <div
                        key={menu.id}
                        onClick={() => setDetailFlavor(menu)}
                        className={`cursor-pointer border rounded-xl p-4 transition-all flex flex-col justify-between h-44 shadow-sm hover:shadow-md ${
                          hasUnreceived
                            ? "border-red-200 bg-red-50/10"
                            : "border-gray-200 bg-white hover:border-orange-500"
                        }`}
                      >
                        <div>
                          <div className="flex justify-between items-start gap-2">
                            <h3
                              className={`font-black text-base tracking-tight leading-tight truncate max-w-[65%] ${
                                hasUnreceived
                                  ? "text-red-900 line-through opacity-60"
                                  : "text-gray-800"
                              }`}
                            >
                              {menu.name}
                            </h3>
                            <span
                              className={`text-[11px] font-black px-2 py-0.5 rounded border shrink-0 ${
                                hasUnreceived
                                  ? "bg-red-100 text-red-700 border-red-200"
                                  : "bg-orange-50 text-orange-600 border-orange-200"
                              }`}
                            >
                              {hasUnreceived
                                ? "정지"
                                : `${menuTotalWeight.toFixed(1)}kg`}
                            </span>
                          </div>

                          {hasUnreceived ? (
                            <div className="mt-2 bg-red-50 border border-red-100 rounded-lg p-2">
                              <p className="text-[10px] font-bold text-red-700">
                                🚫 미입고:{" "}
                                {unreceivedInMenu.map((r) => r.code).join(", ")}
                              </p>
                            </div>
                          ) : (
                            <div className="mt-2">
                              <p className="text-[11px] font-bold text-orange-600 bg-orange-50/50 px-1.5 py-0.5 rounded inline-block">
                                🪣{" "}
                                {menuContainers
                                  .map((c) => `${c.spec}kg x ${c.count}`)
                                  .join(" / ")}
                              </p>
                              <p className="text-xs text-gray-400 mt-1 line-clamp-1 font-mono">
                                {menu.recipe.map((r) => r.code).join(", ")}
                              </p>
                            </div>
                          )}
                        </div>

                        <div
                          className={`text-right text-xs font-bold border-t pt-2 mt-2 ${
                            hasUnreceived ? "text-red-500" : "text-orange-500"
                          }`}
                        >
                          {hasUnreceived
                            ? "사유 확인 →"
                            : "상세 배합 조회 & 제조 →"}
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </ScrollArea>
          </>
        )}
      </div>

      {/* 담당 제조자 지정 모달 */}
      {isOperatorModalOpen && detailFlavor && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4 print:hidden">
          <div className="bg-white rounded-2xl w-full max-w-sm md:max-w-xl shadow-2xl overflow-hidden border border-gray-100 max-h-[90vh] flex flex-col">
            <div className="bg-amber-950 p-4 md:p-6 text-white flex justify-between items-center shrink-0">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                  Assign Operator
                </span>
                <h2 className="text-lg md:text-2xl font-black">
                  {detailFlavor.name}
                </h2>
              </div>
              <button
                onClick={() => setIsOperatorModalOpen(false)}
                className="text-amber-200 hover:text-white text-xl font-bold px-2"
              >
                ✕
              </button>
            </div>

            <div className="p-4 md:p-6 overflow-y-auto flex-1">
              <p className="text-xs md:text-sm font-bold text-gray-500 mb-3">
                제조 담당 조원을 선택하세요.
              </p>
              <div className="grid grid-cols-2 gap-2">
                {OPERATORS.map((operator) => (
                  <button
                    key={operator}
                    onClick={() => handleAssignOperator(operator)}
                    className="h-12 md:h-16 text-sm md:text-lg font-black bg-gray-50 text-gray-800 rounded-xl border border-gray-200 hover:border-orange-500 active:scale-95 flex items-center justify-center shadow-sm"
                  >
                    {operator}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 제조지시 영수증 출력 팝업 모달 */}
      {receiptData && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-50 p-4 overflow-y-auto print:p-0 print:bg-white print:absolute">
          <div className="bg-white text-black w-full max-w-md shadow-2xl p-6 rounded-2xl border-2 border-dashed border-gray-300 font-mono text-sm leading-relaxed print:shadow-none print:border-none print:p-0">
            {/* 영수증 헤더 */}
            <div className="text-center border-b border-dashed border-gray-400 pb-4 mb-4">
              <h2 className="text-xl font-black tracking-wider">
                제 조 지 시 서 (영수증)
              </h2>
              <p className="text-xs text-gray-500 mt-1">
                Flavor Manufacturing Token
              </p>
            </div>

            {/* 메인 제품 정보 */}
            <div className="space-y-1.5 border-b border-dashed border-gray-400 pb-4 mb-4 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-500">지시 일시:</span>{" "}
                <span className="font-bold">{receiptData.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">제조 담당:</span>{" "}
                <span className="font-bold text-base bg-gray-100 px-2 rounded">
                  {receiptData.operator}
                </span>
              </div>
              <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
                <span className="text-gray-900 font-bold text-sm">
                  제 품 명 :
                </span>
                <span className="font-black text-base text-orange-600">
                  {receiptData.flavor.name}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold text-sm">
                  총 중 량 :
                </span>
                <span className="font-black text-lg bg-orange-50 text-orange-600 px-2.5 py-0.5 rounded border border-orange-200">
                  {receiptData.totalWeight.toFixed(2)} kg
                </span>
              </div>

              {/* [신규 반영] 영수증 중앙에 필요한 배합통 규격 및 개수 노출 */}
              <div className="mt-3 p-3 bg-amber-50 rounded-xl border border-amber-200 flex flex-col gap-1">
                <span className="text-amber-950 font-black text-xs">
                  ⚠️ [공정 포장 안내] 배합통 준비 규격
                </span>
                <div className="flex flex-wrap gap-2 mt-0.5">
                  {receiptData.containers.map((container, idx) => (
                    <span
                      key={idx}
                      className="bg-amber-950 text-white font-black text-xs px-2.5 py-1 rounded-md"
                    >
                      {container.spec}kg 통 ➔{" "}
                      <span className="text-yellow-400 font-black text-sm">
                        {container.count}
                      </span>
                      개
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* 원료 투입 상세 리스트 */}
            <div className="mb-6">
              <p className="font-black text-gray-900 mb-2 text-xs">
                ▼ 원재료 배합 처방 리스트
              </p>
              <div className="border-t border-b border-gray-300 py-2 space-y-3 text-xs">
                {receiptData.flavor.recipe.map((ingredient, idx) => (
                  <div key={idx} className="flex flex-col gap-0.5">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>
                        {idx + 1}. [{ingredient.code}]
                      </span>
                      <span className="font-black text-sm">
                        {ingredient.weight.toFixed(2)} kg
                      </span>
                    </div>
                    <div className="text-gray-500 pl-4 truncate">
                      {ingredient.ingredient}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 영수증 하단 안내 */}
            <div className="text-center text-[11px] text-gray-400 space-y-1 border-t border-dashed border-gray-400 pt-4 print:hidden">
              <p>지정된 배합통 규격 수량을 사전에 정렬해 주십시오.</p>
            </div>

            {/* 제어 버튼 */}
            <div className="mt-6 flex gap-2 print:hidden">
              <Button
                variant="outline"
                className="flex-1 h-12 font-bold border-gray-300 text-gray-700 rounded-xl"
                onClick={handleCloseReceipt}
              >
                창 닫기 (완료)
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
