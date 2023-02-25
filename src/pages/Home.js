import React, {useState} from 'react';
import Button from '../components/Button'
import CardRow from '../components/CardRow';

const Home = () => {
    return <div
        className='container rounded d-flex flex-column justify-content-start align-items-center mt-3 px-0'
        style={{
            maxWidth: '100vw'
        }}>
        <TopSearchBox/>
        <TopMainNavBox/>
        <TopImgBox/>
        <BottomHotBox/>
    </div>

}

const TopSearchBox = () => {
    const buttonEvent = () => {
        console.log('hi')
    }
    return <div className='mb-3 w-100 d-flex justify-content-center align-items-center'>
        <form class="my-2 d-flex justify-content-center align-items-center">
            <input
                type="text"
                class="form-control w-75 me-2"
                id="search"
                placeholder="검색어를 입력해주세요."/>
            <Button className='w-25' buttonEvent={buttonEvent} message={'검색'}/>
        </form>
    </div>
}

const TopMainNavBox = () => {
    return <div className='mb-5 w-100 d-flex justify-content-center align-items-center'>
        <ul
            class="nav nav-pills w-75 d-flex justify-content-center align-items-center p-3 fs-3">
            <li
                class="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
                <a class="nav-link active" aria-current="page" href="#!">MY페이지</a>
            </li>
            <li
                class="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
                <a class="nav-link" href="#!">레시피</a>
            </li>
            <li
                class="nav-item dropdown flex-grow-1 d-flex justify-content-center align-items-center">
                <a
                    class="nav-link dropdown-toggle"
                    data-bs-toggle="dropdown"
                    href="#!"
                    role="button"
                    aria-expanded="false">칵테일맛집</a>
                <ul class="dropdown-menu ">
                    <li>
                        <a class="dropdown-item" href="#!">서울/경기</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#!">광역시</a>
                    </li>
                    <li>
                        <a class="dropdown-item" href="#!">그외</a>
                    </li>
                </ul>
            </li>
            <li
                class="nav-item flex-grow-1 d-flex justify-content-center align-items-center">
                <a class="nav-link disabled" href="#!" tabindex="-1" aria-disabled="true">미정</a>
            </li>
        </ul>
    </div>
}

const TopImgBox = () => {
    return <div className='w-100 text-center bg-secondary mb-5'>
        <img className='w-100 ' src={'img/KakaoTalk_20230225_174505991.png'} alt="1"/>
    </div>
}

const BottomHotBox = () => {
    const [rowCount, setRowCount] = useState(1)
    const upRowCount = () => {
        setRowCount(rowCount + 1)
    }
    const rowList = Array(rowCount)
        .fill(1)
        .map((x, i) => x = x + i)
    console.log(rowList)
    const cardList = Array(4)
        .fill(1)
        .map((x, i) => x = x + i)
    return <div className='w-75 my-5'>
        <div className='ps-3 fs-1 '>
            인기레시피
        </div>
        <div className='my-3 w-100'>
            {
                rowList.map(x =>< CardRow key = {
                    x
                }
                cardList = {
                    cardList
                } />)
            }
        </div>
        <div className='d-flex justify-content-center align-items-center w-100'>
            <Button message={'더보기'} size={'lg'} addStyle='px-5' buttonEvent={upRowCount}/>
        </div>
    </div>
}

export default Home;