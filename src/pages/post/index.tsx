import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from 'react-icons/ai';

import styles from './post.module.scss';

export default function Post(): JSX.Element {
  return (
    <>
      <main className={styles.imgPost}>
        <img src="/banner.jpg" alt="Banner Post" />
      </main>

      <section className={styles.postContent}>
        <div className={styles.postHeader}>
          <h1>Criando um app CRA do zero</h1>
          <div className={styles.descriptions}>
            <span>
              <AiOutlineCalendar fontSize="18" />
              <p>15 Mar 2021</p>
            </span>
            <span>
              <AiOutlineUser fontSize="18" />
              <p>Joseph de Oliveira</p>
            </span>
            <span>
              <AiOutlineClockCircle fontSize="18" />
              <p>4 min</p>
            </span>
          </div>
        </div>
        <div className={styles.post}>
          <h3>Proin et varius</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam ac nibh
            non mauris tincidunt vestibulum ut nec dolor. Sed nec sapien vel
            dolor euismod pharetra. Proin hendrerit massa non tincidunt aliquam.
            Aliquam lobortis purus lorem, eget tincidunt diam sollicitudin at.
            Donec cursus nunc sit amet dolor dapibus imperdiet. Quisque blandit
            libero sed massa mollis, quis tempor tortor dapibus. Vivamus
            efficitur urna eu lacinia mollis. Vivamus semper dolor in purus
            elementum posuere. Aliquam orci nisl, feugiat sed finibus non,
            ultrices id nisl. Morbi vel odio sit amet risus facilisis elementum.
            Nam sit amet convallis libero. Ut sed convallis arcu. Pellentesque
            gravida accumsan mi vitae efficitur. Phasellus vitae est nec tellus
            vehicula tincidunt. Cras eget volutpat tellus, sit amet blandit
            sapien.
          </p>
        </div>
      </section>
    </>
  );
}
