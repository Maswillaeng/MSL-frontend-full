import React, {useEffect, useState} from 'react';
import CardRow from '../components/CardRow';
import Loading from '../components/Loading';
import {infinityScroll} from '../function/infinityScroll';

export default function Board() {
    //클라이언트의 현재 스크롤 체크
    const [scroll, setScroll] = useState(0)
    window.addEventListener('scroll', () => {
        setScroll(document.documentElement.scrollTop)
        console.log(scroll)
    })
    //카드 카운트
    const [rowCount, setRowCount] = useState(1)
    //api가 생기면 활용할 로딩
    const [loading, setLoading] = useState(false)
    const loadingHandeler = () => {
        setLoading(!loading)
    }
    useEffect(() => {
        infinityScroll(setRowCount, scroll, rowCount)
    }, [scroll])
    return <div
        className='container rounded d-flex flex-column justify-content-center align-items-center my-5'
        style={{
            maxWidth: '90vw',
            minHeight: '85vh'
        }}>
        <BoardTop/>
        <BoardMiddle rowCount={rowCount}/>
        <BoardBottom loading={loading}/>
    </div>
}

const BoardTop = () => {
    return <div className={`d-flex flex-column justify-content-flex w-100 mt-1 `}>
        <h1 className='ps-5'>자유게시판</h1>
    </div>
}

const BoardMiddle = ({rowCount}) => {
    //카드리스트 데이터를 4개씩 짤라서 전달해야할듯?
    const cardList = Array(4)
        .fill(1)
        .map((x, i) => x = x + i)
    const cardRowList = Array(rowCount).fill(1)
    return <div
        className={`d-flex flex-column justify-content-start align-items-center w-100 flex-grow-1 mt-5`}>
        <div className="container text-center">
            {cardRowList.map(x => <CardRow cardList={cardList} key={x}/>)}
        </div>
    </div>
}

const BoardBottom = ({loading}) => {
    const loadingArr = Array(3).fill(1)
    return <div
        className={`d-flex justify-content-center align-items-center w-100 mt-5 mb-5 fs-3`}>
        {
            loading && loadingArr.map((x, i) =>< Loading key = {
                i
            }
            addStyle = {
                'mx-5'
            } />)
        }
    </div>
}