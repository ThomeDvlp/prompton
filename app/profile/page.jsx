'use client'

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';
import { Router } from 'next/router';

const MyProfile = () => {
	const {data: session} = useSession();
  const router = useRouter();

	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
    const fecthPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      const data = await response.json();

      setMyPosts(data);
    }
    if(session?.user.id)fecthPosts();
  }, []);
  const handleEdit = (post)=> {
    router.push(`/update-prompt?id=${post._id}`)
  };

	const handleDelete = async (post)=> {
    const hasConfirmed = confirm('Are you sure you want to delete this prompt?');

    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE'
        });

        if (response.ok) {
          const newPosts = myPosts.filter((myPost)=> myPost._id !== post._id);
          setMyPosts(newPosts);
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

	return (
    <Profile 
        name='My'
        desc= 'Welcome to your profile'
				data={myPosts}
				handleEdit={handleEdit}
				handleDelete={handleDelete}
    />
  )
}

export default MyProfile;