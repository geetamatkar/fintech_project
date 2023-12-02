import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Uncover Your Perfect <br className="sm:block hidden" /> Card Deal
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Find your personalized credit card solution hassle-free by utilizing our user-friendly and straightforward approach.
      </p>

      <Button styles={`mt-10`} />
    </div>
    
    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
    
  </section>
);

export default CardDeal;
