import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => (
  <section className={layout.section}>
    <div className={layout.sectionInfo}>
      <h2 className={styles.heading2}>
      Uncover Your Perfect <br className="sm:block hidden" /> Card Deal with Minimal Effort. 
      </h2>
      <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
      Easily find the perfect credit card deal tailored to your needs 
      and preferences with our straightforward and user-friendly process.
      </p>

      <Button styles={`mt-10`} />
    </div>

    <div className={layout.sectionImg}>
      <img src={card} alt="billing" className="w-[100%] h-[100%]" />
    </div>
  </section>
);

export default CardDeal;
