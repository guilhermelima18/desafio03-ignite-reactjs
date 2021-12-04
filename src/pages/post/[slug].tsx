import { useMemo } from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';

import { getPrismicClient } from '../../services/prismic';
import Prismic from '@prismicio/client';
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

export default function Post({ post }: PostProps) {
  const router = useRouter();

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

    return Math.ceil(totalWords / 200);
  }, []);

  const dateFormat = format(new Date(post.first_publication_date), 'PP', {
    locale: ptBR,
  });

  if (router.isFallback) {
    return <p style={{ color: '#FFF' }}>Carregando...</p>;
  }

  return (
    <>
      <Head>
        <title>{`${post.data.title} | spacetravelling.`}</title>
      </Head>
      <main className={styles.imgPost}>
        <img src={post.data.banner.url} alt="imagem" />
      </main>

      <section className={styles.postContent}>
        <div className={styles.postHeader}>
          <h1>{post.data.title}</h1>
          <div className={styles.descriptions}>
            <span>
              <AiOutlineCalendar fontSize="18" />
              <p>{dateFormat}</p>
            </span>
            <span>
              <AiOutlineUser fontSize="18" />
              <p>{post.data.author}</p>
            </span>
            <span>
              <AiOutlineClockCircle fontSize="18" />
              <p>{`${readTime} min`}</p>
            </span>
          </div>
        </div>
        {post.data.content.map(({ heading, body }, index) => (
          <div key={index} className={styles.post}>
            <h3>{heading}</h3>
            <div dangerouslySetInnerHTML={{ __html: RichText.asHtml(body) }} />
          </div>
        ))}
      </section>
    </>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const prismic = getPrismicClient();
  const posts = await prismic.query([
    Prismic.Predicates.at('document.type', 'posts'),
  ]);

  const paths = posts.results.map(post => {
    return {
      params: { slug: post.uid },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params;
  const prismic = getPrismicClient();
  const response = await prismic.getByUID('posts', String(slug), {});

  const post = {
    uid: response.uid,
    first_publication_date: response.first_publication_date,
    data: {
      title: response.data.title,
      subtitle: response.data.subtitle,
      banner: {
        url: response.data.banner.url,
      },
      author: response.data.author,
      content: response.data.content.map(content => {
        return {
          heading: content.heading,
          body: [...content.body],
        };
      }),
    },
  };

  return {
    props: { post },
  };
};
