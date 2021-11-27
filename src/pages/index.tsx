import { useState } from 'react';
import { GetStaticProps } from 'next';
import Link from 'next/link';

import { format } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

import Prismic from '@prismicio/client';

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

export default function Home({ postsPagination }: HomeProps) {
  const [newPost, setNewPost] = useState<PostPagination>();

  const loadingPosts = async () => {
    const response = await fetch(postsPagination.next_page);
    const data = await response.json();

    setNewPost(data);
  };

  return (
    <section className={styles.sectionPosts}>
      {postsPagination.results.map(post => (
        <Link key={post.uid} href={`post/${post.uid}`} passHref>
          <a className={commonStyles.a}>
            <div className={styles.postCard}>
              <h2>{post.data.title}</h2>
              <h4>{post.data.subtitle}</h4>
              <div className={styles.createdAt}>
                <span>
                  <AiOutlineCalendar fontSize="18" />{' '}
                  <p>{post.first_publication_date}</p>
                </span>
                <span>
                  <AiOutlineUser fontSize="18" /> <p>{post.data.author}</p>
                </span>
              </div>
            </div>
          </a>
        </Link>
      ))}
      {postsPagination.next_page !== null && (
        <>
          {newPost &&
            newPost.results.map(post => (
              <Link key={post.uid} href={`post/${post.uid}`} passHref>
                <a className={commonStyles.a}>
                  <div className={styles.postCard}>
                    <h2>{post.data.title}</h2>
                    <h4>{post.data.subtitle}</h4>
                    <div className={styles.createdAt}>
                      <span>
                        <AiOutlineCalendar fontSize="18" />{' '}
                        <p>
                          {format(new Date(post.first_publication_date), 'PP', {
                            locale: ptBR,
                          })}
                        </p>
                      </span>
                      <span>
                        <AiOutlineUser fontSize="18" />{' '}
                        <p>{post.data.author}</p>
                      </span>
                    </div>
                  </div>
                </a>
              </Link>
            ))}
          {newPost?.next_page !== null && (
            <button className={styles.btnNewPost} onClick={loadingPosts}>
              Carregar mais posts...
            </button>
          )}
        </>
      )}
    </section>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query(
    [Prismic.Predicates.at('document.type', 'posts')],
    {
      fetch: ['posts.title', 'posts.subtitle', 'posts.author'],
      pageSize: 1,
    }
  );

  const results = postsResponse.results.map(post => {
    return {
      uid: post.uid,
      first_publication_date: format(new Date(), 'PP', {
        locale: ptBR,
      }),
      data: {
        title: post.data.title,
        subtitle: post.data.subtitle,
        author: post.data.author,
      },
    };
  });

  const postsPagination = {
    next_page: postsResponse.next_page,
    results,
  };

  return {
    props: {
      postsPagination,
    },
  };
};
