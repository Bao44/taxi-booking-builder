// import React, { useEffect, useState } from "react";

// function AutocompleteAddress() {
//   const [source, setSource] = useState<any>();
//   const [sourceChange, setSourceChange] = useState<any>(false);
//   const [destinationChange, setDestinationChange] = useState<any>(false);

//   const [addressList, setAddressList] = useState<any>([]);
//   const [destination, setDestination] = useState<any>();

//   useEffect(() => {
//     const delayDebounceFn = setTimeout(() => {
//       getAddressList();
//     }, 1000);
//     return () => clearTimeout(delayDebounceFn);
//   }, [source, destination]);

//   const getAddressList = async () => {
//     const res = await fetch("/api/search-address?q=" + source, {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });

//     const result = await res.json();
//     setAddressList(result);
//   };

//   return (
//     <div className="mt-5">
//       <div className="relative">
//         <label className="text-gray-400">Where From?</label>
//         <input
//           type="text"
//           className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
//           value={source}
//           onChange={(e) => setSource(e.target.value)}
//         />
//         {addressList?.suggestions&&sourceChange ? (
//           <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
//             {addressList?.suggestions.map((item: any, index: number) => {
//               <h2
//                 key={index}
//                 className="p-3 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setSource(item.full_address);
//                   setAddressList([]);setSourceChange(false);
//                 }}
//               >
//                 {item.full_address}
//               </h2>;
//             })}
//           </div>
//         ) : null}
//       </div>

//       <div className="mt-3">
//         <label className="text-gray-400">Where To?</label>
//         <input
//           type="text"
//           className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
//           value={destination}
//           onChange={(e) => setDestination(e.target.value)}
//         />

//         {addressList?.suggestions && destinationChange ? (
//           <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
//             {addressList?.suggestions.map((item: any, index: number) => {
//               <h2
//                 key={index}
//                 className="p-3 hover:bg-gray-100 cursor-pointer"
//                 onClick={() => {
//                   setDestination(item.full_address);
//                   setAddressList([]); setDestinationChange(false);
//                 }}
//               >
//                 {item.full_address}
//               </h2>;
//             })}
//           </div>
//         ) : null}
//       </div>
//     </div>
//   );
// }

// export default AutocompleteAddress;

import React, { useEffect, useState } from "react";

function AutocompleteAddress() {
  const [source, setSource] = useState(""); // Khởi tạo với chuỗi rỗng
  const [destination, setDestination] = useState(""); // Khởi tạo với chuỗi rỗng

  const [addressList, setAddressList] = useState<any>([]);
  const [sourceChange, setSourceChange] = useState(false); // Đặt giá trị mặc định là false
  const [destinationChange, setDestinationChange] = useState(false); // Đặt giá trị mặc định là false

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (source.trim()) {
        getAddressList("source"); // Gọi API cho 'Where From'
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [source]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (destination.trim()) {
        getAddressList("destination"); // Gọi API cho 'Where To'
      }
    }, 1000);
    return () => clearTimeout(delayDebounceFn);
  }, [destination]);

  const getAddressList = async (type: "source" | "destination") => {
    const query = type === "source" ? source : destination;
    const res = await fetch("/api/search-address?q=" + query, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    const result = await res.json();
    setAddressList(result);
  };

  return (
    <div className="mt-5">
      <div className="relative z-10">
        <label className="text-gray-400">Where From?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
          value={source}
          onChange={(e) => {
            setSource(e.target.value);
            setSourceChange(true); // Đảm bảo trạng thái sourceChange được set
          }}
        />
        {addressList?.suggestions && sourceChange && source.trim() !== "" ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white z-20">
            {addressList.suggestions.map((item: any, index: number) => {
              return (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setSource(item.full_address);
                    setAddressList([]); // Xóa danh sách địa chỉ khi chọn
                    setSourceChange(false); // Đặt lại trạng thái
                  }}
                >
                  {item.full_address}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>

      <div className="mt-3 relative">
        <label className="text-gray-400">Where To?</label>
        <input
          type="text"
          className="bg-white p-1 border-[1px] w-full rounded-md outline-none focus:border-yellow-300"
          value={destination}
          onChange={(e) => {
            setDestination(e.target.value);
            setDestinationChange(true); // Đảm bảo trạng thái destinationChange được set
          }}
        />

        {addressList?.suggestions &&
        destinationChange &&
        destination.trim() !== "" ? (
          <div className="shadow-md p-1 rounded-md absolute w-full bg-white">
            {addressList.suggestions.map((item: any, index: number) => {
              return (
                <h2
                  key={index}
                  className="p-3 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    setDestination(item.full_address);
                    setAddressList([]); // Xóa danh sách địa chỉ khi chọn
                    setDestinationChange(false); // Đặt lại trạng thái
                  }}
                >
                  {item.full_address}
                </h2>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default AutocompleteAddress;
