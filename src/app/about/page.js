'use client';

import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from '../../store/slices/authSlice';

export default function AboutSlugPage({ params }) {
  const { slug } = params;
  const isLogin = useSelector((state) => state.auth.isLogin);
  const dispatch = useDispatch();

  return (
    <section className="space-y-2">
      <h1 className="text-2xl font-semibold">About: {slug}</h1>
      <p>หน้านี้ dynamic /about/{slug}</p>

      <p>สถานะ: {isLogin ? 'ล็อกอินแล้ว ✅' : 'ยังไม่ได้ล็อกอิน ❌'}</p>

      <button 
        className="px-3 py-1 bg-green-500 text-white rounded"
        onClick={() => dispatch(login())}
      >
        Login
      </button>
      
      <button 
        className="px-3 py-1 bg-red-500 text-white rounded ml-2"
        onClick={() => dispatch(logout())}
      >
        Logout
      </button>
    </section>
  );
}
