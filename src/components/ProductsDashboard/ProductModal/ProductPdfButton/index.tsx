import React, { useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { Product, Sale } from "../../../../../types";

type PdfButtonProps = {
  Component: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLDivElement> & { sales: Sale[] }&
    {columns:any[]} & {product:Product}
  >;
  sales: Sale[];
  product: Product;
  columns:any[]
};

const ProductPdfButton = ({ Component, sales,product,columns }: PdfButtonProps) => {
  const tableRef = useRef(null);

  const handlePrint = useReactToPrint({ contentRef: tableRef });

  return (
    <>
      <button
        title="Exportar detalhes do produto para PDF"
        className="btn bg-transparent text-gray-500 border-gray-500"
        onClick={() => handlePrint()}
      >
        <svg
          enableBackground="new 0 0 500 500"
          height="50px"
          id="Layer_1"
          version="1.1"
          viewBox="0 0 500 500"
          width="50px"
        >
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="133.661"
            x2="233.206"
            y1="126.169"
            y2="126.169"
          />
          <path
            d="  M233.206,126.169c7.22,0,13.136,5.94,13.136,13.112"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="246.342"
            x2="246.342"
            y1="139.281"
            y2="321.88"
          />
          <path
            d="  M246.342,321.88c0,7.184-5.94,13.111-13.136,13.111"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="233.206"
            x2="89.991"
            y1="334.991"
            y2="334.991"
          />
          <path
            d="  M89.991,334.991c-7.16,0-13.112-5.916-13.112-13.111"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <polyline
            fill="none"
            points="  76.879,321.88 76.879,178.7 133.661,126.169 "
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="136.341"
            x2="136.341"
            y1="126.169"
            y2="173.437"
          />
          <path
            d="  M136.341,173.437c0,3.852-3.2,7.039-7.039,7.039"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="129.302"
            x2="76.879"
            y1="180.476"
            y2="180.476"
          />
          <g>
            <path
              clipRule="evenodd"
              d="M319.217,285.176c4.117,3.43,6.182,8.741,6.182,15.865   c0,7.159-2.125,12.411-6.314,15.743c-4.202,3.309-10.637,4.999-19.317,4.999h-10.492v17.325h-9.973v-59.1h20.296   C308.568,280.009,315.1,281.747,319.217,285.176L319.217,285.176z M312.166,309.589L312.166,309.589   c1.992-2.137,2.981-5.24,2.981-9.333s-1.255-6.99-3.791-8.681c-2.56-1.69-6.507-2.535-11.952-2.535h-10.13v23.688h11.591   C306.383,312.728,310.149,311.665,312.166,309.589z"
              fill="#000"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d="M381.865,287.76c5.699,5.119,8.536,12.315,8.536,21.515   c0,9.164-2.765,16.444-8.271,21.805c-5.529,5.361-13.98,8.029-25.378,8.029h-19.619v-59.1h20.295   C368.029,280.009,376.179,282.568,381.865,287.76L381.865,287.76z M380.345,309.517L380.345,309.517   c0-13.522-7.764-20.308-23.254-20.308h-9.973v40.519h11.071c7.147,0,12.641-1.703,16.456-5.096   C378.449,321.203,380.345,316.181,380.345,309.517z"
              fill="#000"
              fillRule="evenodd"
            />
            <polygon
              clipRule="evenodd"
              fill="#000"
              fillRule="evenodd"
              points="413.22,289.306 413.22,305.544 439.443,305.544    439.443,314.756 413.22,314.756 413.22,339.108 403.247,339.108 403.247,280.009 442.655,280.009 442.57,289.306  "
            />
          </g>
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="279.772"
            x2="455.706"
            y1="245.262"
            y2="245.262"
          />
          <path
            clipRule="evenodd"
            d="  M455.706,245.262c10.674,0,19.294,8.645,19.294,19.293"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="475"
            x2="475"
            y1="264.555"
            y2="354.563"
          />
          <path
            clipRule="evenodd"
            d="  M475,354.563c0,10.648-8.62,19.269-19.294,19.269"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="455.706"
            x2="44.293"
            y1="373.831"
            y2="373.831"
          />
          <path
            clipRule="evenodd"
            d="  M44.293,373.831c-10.648,0-19.293-8.62-19.293-19.269"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="25"
            x2="25"
            y1="354.563"
            y2="264.555"
          />
          <path
            clipRule="evenodd"
            d="  M25,264.555c0-10.648,8.645-19.293,19.293-19.293"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
          />
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="163.349"
            x2="163.349"
            y1="186.874"
            y2="303.673"
          />
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="163.349"
            x2="200.317"
            y1="303.673"
            y2="266.691"
          />
          <line
            clipRule="evenodd"
            fill="none"
            fillRule="evenodd"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeMiterlimit="2.6131"
            strokeWidth="10"
            x1="163.349"
            x2="122.903"
            y1="303.673"
            y2="263.203"
          />
        </svg>
      </button>
      <div className="hidden">
        <Component ref={tableRef} sales={sales} product={product} columns={columns}/>
      </div>
    </>
  );
};

export default ProductPdfButton;
