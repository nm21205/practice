import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../config/constants';
import './Products.scss';

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let url = `${API_URL}/products`;
    axios.get(url).then((result) => {
      const products = result.data.products;
      console.log(products);
      setProducts(products);
    }).catch((error) => {
      console.log(error);
    });
  }, []);

  return (
    <div className='products'>
      <h1>미끼 선택 게시판</h1> {/* 게시판 제목 */}
      <h2>게시글 목록</h2> {/* 게시글 목록 제목 */}
      <table className="post-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>작성시간</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan="3" className="no-posts">아직 게시글이 없습니다.</td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id} onClick={() => navigate(`/products/${product.id}`)}>
                <td>{product.name}</td>
                <td>{product.price}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      <div className="add-post-container">
        <button onClick={() => navigate('/uploadpage')} className="add-post-button">상품 업로드</button>
      </div>
    </div>
  );
};

export default Products;