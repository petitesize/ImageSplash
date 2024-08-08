import styles from "./styles/index.module.scss";
import CommonHeader from "@/components/common/header/CommonHeader";
import CommonSearchBar from "@/components/common/searchBar/CommonSearchBar";
import CommonNav from "@/components/common/navigation/CommonNav";
import CommonFooter from "@/components/common/footer/CommonFooter";
import Card from "./components/Card";
import DetailDialog from "@/components/common/dialog/DetailDialog";
import { useState } from "react";
import { imageData } from "@/recoil/selectors/imageSelector";
import { CardDTO } from "./types/card";
import { useRecoilValue } from "recoil";

function index() {
  const imgSelector = useRecoilValue(imageData);
  const [imgData, setImgData] = useState<CardDTO>();
  const [open, setOpen] = useState<boolean>(false); // 이미지 상세 다이얼로그 발생 관리 상태

  const CARD_LIST = imgSelector.data.results.map((card: CardDTO) => {
    return (
      <Card
        data={card}
        key={card.id}
        handleDialog={setOpen}
        handleSetData={setImgData}
      />
    );
  });

  return (
    <div className={styles.page}>
      <CommonHeader />
      <CommonNav />
      <div className={styles.page__contents}>
        <div className={styles.page__contents__introBox}>
          <div className={styles.wrapper}>
            <span className={styles.wrapper__title}>PhotoSplash</span>
            <span className={styles.wrapper__desc}>
              인터넷의 시각 자료 출처입니다. <br />
              모든 지역에 있는 크리에이터들의 지원을 받습니다.
            </span>
            {/* 검색창 UI 부분 */}
            <CommonSearchBar />
          </div>
        </div>
        <div className={styles.page__contents__imageBox}>{CARD_LIST}</div>
      </div>
      <CommonFooter />
      {open && <DetailDialog data={imgData} handleDialog={setOpen} />}
    </div>
  );
}

export default index;
