import { GetStaticProps } from 'next';
import Link from 'next/link';

import { AiOutlineCalendar, AiOutlineUser } from 'react-icons/ai';
import { getPrismicClient } from '../services/prismic';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home(): JSX.Element {
  return (
    <section className={styles.sectionPosts}>
      <Link href="/" passHref>
        <div className={styles.postCard}>
          <h2>Como utilizar Hooks</h2>
          <h4>Pensando em sincronização em vez de ciclos de vida.</h4>
          <div className={styles.createdAt}>
            <span>
              <AiOutlineCalendar fontSize="18" /> <p>15 Mar 2021</p>
            </span>
            <span>
              <AiOutlineUser fontSize="18" /> <p>Joseph de Oliveira</p>
            </span>
          </div>
        </div>
      </Link>

      <Link href="/" passHref>
        <div className={styles.postCard}>
          <h2>Como utilizar Hooks</h2>
          <h4>Pensando em sincronização em vez de ciclos de vida.</h4>
          <div className={styles.createdAt}>
            <span>
              <AiOutlineCalendar fontSize="18" /> <p>15 Mar 2021</p>
            </span>
            <span>
              <AiOutlineUser fontSize="18" /> <p>Joseph de Oliveira</p>
            </span>
          </div>
        </div>
      </Link>
    </section>
  );
}

// export const getStaticProps = async () => {
//   // const prismic = getPrismicClient();
//   // const postsResponse = await prismic.query(TODO);

//   // TODO
// };
