import React from 'react'

export default function Banner() {
  return (
    <div className='w-[1320px] h-[336px] rounded-[12px] bg-white m-auto flex relative'>
    <div>
        <h2 className='text-[48px] font-bold pt-[48px] pl-[72px] leading-[58px]'>Смартфоны в <br /> рассрочку</h2>
        <p className='pt-[16px] pl-[72px] text-[16px] leading-[26px]'>Купить любимые смартфоны в рассрочку</p>
        <button className='w-[174px] h-[48px] mt-[42px] ml-[72px] text-[#FFFFFF] bg-[#FF9910] hover:bg-[#ee9623] flex items-center justify-center border border-none rounded-[12px]'>
            Смотреть все
        </button>
    </div>
    <div className='ml-[229px] mt-[28px]'>
        <img src="/images/carousel-image.jpg" alt="Carousel section image"/>
    </div>
</div>
  )
}