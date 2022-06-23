import styles from "./Banner.module.css";

export default function Banner({ text }) {
  return <span className={styles.banner}>{text}</span>;
}
