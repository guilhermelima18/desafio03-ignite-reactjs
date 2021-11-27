import { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';

import { getPrismicClient } from '../../services/prismic';
import { RichText } from 'prismic-dom';

import commonStyles from '../../styles/common.module.scss';
import styles from './post.module.scss';

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
  const readTime = useMemo(() => {
    const totalWords = Math.round(
      post.data.content.reduce(
        (acc, contentItem) =>
          acc +
          contentItem.heading.split(' ').length +
          contentItem.body.reduce(
            (acc2, bodyItem) => acc2 + bodyItem.text.split(' ').length,
            0
          ),
        0
      )
    );

    // Retorna o valor do tempo de leitura arredondado pra cima
    return Math.ceil(totalWords / 200);
  }, []);

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
              <p>{readTime} min</p>
            </span>
          </div>
        </div>
        {post.data.content.map(({ heading, body }) => (
          <div className={styles.post}>
            <h3>{heading}</h3>
            {body.map(({ text }) => (
              <p>{text}</p>
            ))}
          </div>
        ))}
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  /* const prismic = getPrismicClient();
  const posts = await prismic.query(); */

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
    first_publication_date: format(
      new Date(response.first_publication_date),
      'PP',
      { locale: ptBR }
    ),
    data: {
      title: response.data.title,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content,
    },
  };

  return {
    props: { post },
    revalidate: 60 * 30, // 30 minutos
  };
};
