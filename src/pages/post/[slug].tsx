import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

import { RichText } from 'prismic-dom';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import {
  AiOutlineUser,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from 'react-icons/ai';

interface Post {
  first_publication_date: string | null;
  data: {
    title: string;
    banner: {
      url: string;
    };
    author: string;
    content: {
      heading: string;
      body: {
        text: string;
      }[];
    }[];
  };
}

interface PostProps {
  post: Post;
}

export default function Post({ post }: PostProps): JSX.Element {
  console.log(post);

  return (
    <>
      <main className={styles.imgPost}>
        <img src={post.data.banner.url} alt="Banner Post" />
      </main>

      <section className={styles.postContent}>
        <div className={styles.postHeader}>
          <h1>{post.data.title}</h1>
          <div className={styles.descriptions}>
            <span>
              <AiOutlineCalendar fontSize="18" />
              <p>{post.first_publication_date}</p>
            </span>
            <span>
              <AiOutlineUser fontSize="18" />
              <p>{post.data.author}</p>
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

export const getStaticPaths: GetStaticPaths = async () => {
  /* const prismic = getPrismicClient();
  const posts = await prismic.query(TODO); */

  return {
    paths: [],
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    first_publication_date: format(new Date(), 'PP', { locale: ptBR }),
    data: {
      title: response.data.title,
      banner: response.data.banner.url,
      author: response.data.author,
      content: {
        heading: response.data.content[0].heading,
        body: RichText.asHtml(response.data.content[0].body),
      },
    },
  };

  return {
    props: { post },
  };
};
