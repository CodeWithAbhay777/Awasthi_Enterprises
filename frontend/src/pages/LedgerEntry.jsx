import AddEntryModal from "@/components/AddEntryModal";
import { Share2, SquarePen, Trash2, UserPlus } from "lucide-react";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../components/ui/pagination";
import fetchEntries from "@/utils/api/fetchEntries";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";
import ConfirmDeleteEntry from "@/components/ConfirmDeleteEntry";
import formatLedgerForWhatsapp from "@/utils/formatLedgerForWhatsapp";
import { Button } from "@/components/ui/button";


const LedgerEntry = () => {
  const { aid } = useParams();
  const location = useLocation();
  const orgName = useRef(location.state?.orgName);
  const orgContact = useRef(location.state?.orgContact);
  const [allEntries, setAllEntries] = useState([]);
  const [addEntryModal, setAddEntryModal] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState({
    state: false,
    id: null,
    name: null,
  });
  const limit = useRef(20);

  const totalPages = useMemo(() => Math.ceil(total / limit.current), [total]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetchEntries(aid, page);

        if (!response.success)
          return toast.error(
            response.res || "Something went wrong : while fetching data"
          );

        setAllEntries(response.res);
        setTotal(response.total);
        setLoading(false);
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    };
    fetchData();
  }, [page]);

  const pageNumbers = useMemo(() => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  }, [totalPages]);

  return (
    <div className='className="w-full min-h-screen bg-gradient-to-br from-[#414141] to-black mt-16 flex flex-col'>
      {addEntryModal && (
        <AddEntryModal
          setAddEntryModal={setAddEntryModal}
          setAllEntries={setAllEntries}
          aid={aid}
          page={page}
          setTotal={setTotal}
        />
      )}

      {confirmDeleteModal.state && (
        <ConfirmDeleteEntry
          id={confirmDeleteModal.id}
          name={confirmDeleteModal.name}
          setConfirmDeleteModal={setConfirmDeleteModal}
          setAllEntries={setAllEntries}
          aid={aid}
          page={page}
          setTotal={setTotal}
        />
      )}

      <div className=" fixed h-20 w-full border border-white p-2 text-bold text-white bg-black text-xl flex justify-between">
        <div className="flex flex-col h-full w-[70%] justify-around">
          <h1 className="truncate">{orgName.current}</h1>
          <h1 className="truncate">Contact : {orgContact.current}</h1>
        </div>

        <div className="h-full w-[30%] flex items-center justify-end mr-2">
          <Button
            onClick={() => {
              const formatted = formatLedgerForWhatsapp(
                allEntries,
                orgName.current
              );
              const whatsappUrl = `https://wa.me/?text=${formatted}`;
              window.open(whatsappUrl, "_blank");
            }}
            className=" bg-green-500 text-white"
          >
            <Share2 /> Share
          </Button>
        </div>
      </div>
      <div className="overflow-auto flex-1 mt-22 px-2">
        {!loading ? (
          allEntries.map((e, i) => (
            <div
              key={i}
              className="h-[11rem] w-full border border-white rounded p-1 my-1 flex bg-gradient-to-br from-black to-[#212121] shadow-2xl"
            >
              <div className="w-[80%] flex flex-col justify-around border-r-1 p-1">
                <div className="p-1 mt-1 bg-gray-900 rounded">
                  <h1 className="text-xl font-bold text-gray-300 truncate">
                    Particulars :{" "}
                    <span className="text-xl font-medium text-white truncate">
                      {e.particulars}
                    </span>
                  </h1>
                </div>

                {e.creditAmount !== 0 && (
                  <div className="p-1 mt-1 bg-gray-900 rounded">
                    <h1 className="text-xl font-bold text-gray-300 truncate">
                      Credit amount :{" "}
                      <span className="text-xl font-medium text-green-500 truncate">
                        ₹ {e.creditAmount}
                      </span>
                    </h1>
                  </div>
                )}
                {e.debitAmount !== 0 && (
                  <div className="p-1 mt-1 bg-gray-900 rounded">
                    <h1 className="text-xl font-bold text-gray-300 truncate">
                      Debit amount :{" "}
                      <span className="text-xl font-medium text-red-500 truncate">
                        ₹ {e.debitAmount}
                      </span>
                    </h1>
                  </div>
                )}
                <div className="p-1 mt-1 bg-gray-900 rounded">
                  <h1 className="text-xl font-bold text-gray-300 truncate">
                    Date :{" "}
                    <span className="text-xl font-medium text-white truncate">
                      {e.date}
                    </span>
                  </h1>
                </div>
                <div className="p-1 mt-1 bg-gray-900 rounded">
                  <h1 className="text-xl font-bold text-gray-300 truncate">
                    Balance :{" "}
                    <span className="text-xl font-medium text-white truncate">
                      ₹ {e.currentBalance}
                    </span>
                  </h1>
                </div>
              </div>

              <div className="w-[20%] h-full flex flex-col justify-evenly items-center">
                <SquarePen className="text-blue-500 w-8 h-8" onClick={() => toast.info('Under development')}/>
                <Trash2
                  onClick={() =>
                    setConfirmDeleteModal({
                      state: true,
                      id: e._id,
                      name: e.particulars,
                    })
                  }
                  className="text-red-500 w-8 h-8"
                />
              </div>
            </div>
          ))
        ) : (
          <div className=" flex flex-col h-full w-full">
            <Skeleton className="h-40 w-full my-1 bg-gray-600 " />
            <Skeleton className="h-40 w-full my-1 bg-gray-600 " />
            <Skeleton className="h-40 w-full my-1 bg-gray-600 " />
            <Skeleton className="h-40 w-full my-1 bg-gray-600 " />
            <Skeleton className="h-40 w-full my-1 bg-gray-600 " />
          </div>
        )}
      </div>

      <div className="flex justify-center mt-6 bg-gray-900 text-white">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (page > 1) setPage((p) => p - 1);
                }}
              />
            </PaginationItem>

            {pageNumbers.map((p) => (
              <PaginationItem key={p}>
                <PaginationLink
                  className="text-black font-medium"
                  isActive={page === p}
                  onClick={(e) => {
                    e.preventDefault();
                    setPage(p);
                  }}
                >
                  {p}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && (
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
            )}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (page < totalPages) setPage((p) => p + 1);
                }}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
      <div
        onClick={() => setAddEntryModal(true)}
        className="fixed bg-black h-15 w-15 rounded-full right-3 bottom-5 border-2 border-white flex items-center justify-center"
      >
        <UserPlus className="text-white" />
      </div>
    </div>
  );
};

export default LedgerEntry;
