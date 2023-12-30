import React, { useState, useEffect } from "react";
import axios from "axios";
import "chart.js/auto";
import $ from "jquery";

import stockDataLocal from "./stockData";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

const Stock = ({ itemsPerPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [stockData, setStockData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        var url =
          "https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-09?adjusted=true&apiKey=QC71XMAASqqx5llIl2Lu9rn1NehyxbSZ";
        const response = await axios.get(url);
        console.log(response.data);
        setStockData(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStockData();
  }, []);
  var stockDataL = stockData;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = stockDataL.slice(indexOfFirstItem, indexOfLastItem);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading stock data...</p>;
  }

  if (error) {
    return <p>Error loading stock data: {error.message}</p>;
  }

  const tableStyle = {
    width: "90%",
    margin: "auto",
    borderCollapse: "collapse",
    border: "1px solid grey",
  };

  const getRowColorClass = (openingPrice, closingPrice) => {
    if (openingPrice > closingPrice) {
      return "text-success";
    } else if (openingPrice < closingPrice) {
      return "text-danger";
    } else {
      return "";
    }
  };

  $(document).ready(function () {
    $("#searchInput").on("keyup", function () {
      var searchText = $(this).val().toLowerCase();

      $("#dataTable tbody tr").each(function () {
        var rowText = $(this).text().toLowerCase();
        $(this).toggle(rowText.includes(searchText));
      });
    });
  });

  return (
    <div>
      <h1 className="my-3">Stock Dashboard</h1>
      <div>
        <input
          className="form-control w-25 ms-5"
          type="text"
          id="searchInput"
          placeholder="Stock Name"
        />
      </div>
      <div>
        <table
          id="dataTable"
          className="table table-striped my-4"
          style={tableStyle}
        >
          <thead className="thead-dark py-5">
            <th>stock</th>
            <th>volumne</th>
            <th>volume-weighted </th>
            <th>opening price </th>
            <th>closing price</th>
            <th>highest price</th>
            <th>lowest price</th>
            <th>timestamp</th>
            <th>number of trades</th>
          </thead>
          <tbody>
            {currentItems.map((item, i) => {
              return [
                <tr key={i} className={getRowColorClass(item.o, item.c)}>
                  <td>{item.T}</td>
                  <td>{item.v}</td>
                  <td>{item.vw}</td>
                  <td>{item.o}</td>
                  <td>{item.c}</td>
                  <td>{item.h}</td>
                  <td>{item.l}</td>
                  <td>{item.t}</td>
                  <td>{item.n}</td>
                </tr>,
              ];
            })}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="pull-right my-4">
          <button
            className="btn btn-light me-2"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <span>{currentPage}</span>
          <button
            className="btn btn-light ms-2"
            onClick={() => paginate(currentPage + 1)}
            disabled={indexOfLastItem >= stockDataLocal.length}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stock;
