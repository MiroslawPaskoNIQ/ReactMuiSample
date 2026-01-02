import { useState, useEffect } from "react";
import type { Retailer } from '../common/Retailer';
import TableHeader from "./tableHeader";
import TableRow from "./tableRow";
import { LoadRetailers, LoadRetailersPaginated } from "../common/CSVLoader";
import InfiniteScroll from "react-infinite-scroll-component";


export function ReactList() {
  const [retailers, setRetailers] = useState<Retailer[]>([]);

  const perPage:number = 50;
  const [page, setPage] = useState(1);
  const [totalRetailers, setTotalRetailers] = useState(100);
 
  useEffect(() => {
    LoadRetailers("/app/assets/ExcelPage.csv").then((data) => {
        setTotalRetailers(data.length);
    });

    LoadRetailersPaginated("/app/assets/ExcelPage.csv", page, perPage).then((data) => {
        setRetailers(data);
    });
  }, []);

  const handleLoadMoreData = () => {
    console.log("handleLoadMoreData");
    const nextPage = page + 1;

    LoadRetailersPaginated("/app/assets/ExcelPage.csv", nextPage, perPage).then((fetchedRetailers) => {
        setRetailers((prevRetailers) => prevRetailers.concat(fetchedRetailers));
        setPage(nextPage);
    });
  };

  return (
    <main className="flex items-center justify-center pt-16 pb-4">
      <div className="flex-1 flex flex-col items-center gap-16 min-h-0">
        <header className="flex flex-col items-center gap-9">
          <div className="w-[500px] max-w-[100vw] p-4">
            <h1>List of retailers</h1>
          </div>
        </header>
        <div className="max-w-[3000px] w-full space-y-6 px-4">
            <table>
                <thead>
                    <TableHeader />
                </thead>
            </table>
            <InfiniteScroll
                dataLength={retailers.length}
                next={handleLoadMoreData}
                hasMore={totalRetailers > retailers.length}
                loader={<p>Loading...</p>}
                endMessage={<p>No more data to load.</p>}
            >
                <div className="retailer-list">
                    {retailers.map((retailer) => (
                        <div key={retailer.RowId}>
                            {TableRow(retailer)}
                        </div>
                    ))}
                </div>
            </InfiniteScroll>
        </div>
      </div>
    </main>
  );
}