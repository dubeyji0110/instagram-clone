import React, { useEffect, useState } from "react";
import { Button, IconButton, Input } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import DeleteIcon from "@material-ui/icons/Delete";
import firebase from "firebase";
import { db } from "./firebase";
import "./Post.css";

function Post({ postId, user, username, caption, imgUrl }) {
	const [comments, setComments] = useState([]);
	const [comment, setComment] = useState("");

	useEffect(() => {
		let unsubscribe;
		if (postId) {
			unsubscribe = db
				.collection("posts")
				.doc(postId)
				.collection("comments")
				.orderBy("timestamp", "desc")
				.onSnapshot((snapshot) => {
					setComments(snapshot.docs.map((doc) => doc.data()));
				});
		}
		return () => {
			unsubscribe();
		};
	}, [postId]);

	const postComment = (e) => {
		e.preventDefault();
		db.collection("posts").doc(postId).collection("comments").add({
			text: comment,
			username: user.displayName,
			timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		});
		setComment("");
	};

	const deletePost = (e) => {
		e.preventDefault();
		db.collection("posts")
			.doc(postId)
			.delete()
			.then(() => {
				alert("Post Deleted!");
			})
			.catch((err) => {
				alert(err.message);
			});
	};

	const likeButton = () => {
		const svg = document.querySelector('#like');
		svg.classList.toggle('like');
	}

	return (
		<div className='post'>
			<div className='post__header'>
				<div className='flex1'>
					<Avatar
						className='post__avatar'
						alt='username'
						src='/static/images/avatar/1.jpg'
					/>
					<h3>{username}</h3>
				</div>
				<div className='flex0'>
					{user && user.displayName === username ? (
						<IconButton onClick={deletePost} title='delete'>
							<DeleteIcon />
						</IconButton>
					) : (
						""
					)}
					<svg
						aria-label='More options'
						fill='#262626'
						height='16'
						viewBox='0 0 48 48'
						width='16'>
						<circle
							clipRule='evenodd'
							cx='8'
							cy='24'
							fillRule='evenodd'
							r='4.5'></circle>
						<circle
							clipRule='evenodd'
							cx='24'
							cy='24'
							fillRule='evenodd'
							r='4.5'></circle>
						<circle
							clipRule='evenodd'
							cx='40'
							cy='24'
							fillRule='evenodd'
							r='4.5'></circle>
					</svg>
				</div>
			</div>
			<img onDoubleClick={likeButton} className='post__image' src={imgUrl} alt='' />
			<div className='control__div'>
				<div className='like__div'>
					<svg
						aria-label='Like'
						stroke='#262626'
						fill='none'
						height='24'
						viewBox='0 0 48 48'
						strokeWidth='3'
						width='26'
						onClick={likeButton}>
						<path id='like' d='M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z'></path>
					</svg>
					<label htmlFor={postId}>
						<svg
							aria-label='Comment'
							fill='#262626'
							height='24'
							viewBox='0 0 48 48'
							width='24'>
							<path
								clipRule='evenodd'
								d='M47.5 46.1l-2.8-11c1.8-3.3 2.8-7.1 2.8-11.1C47.5 11 37 .5 24 .5S.5 11 .5 24 11 47.5 24 47.5c4 0 7.8-1 11.1-2.8l11 2.8c.8.2 1.6-.6 1.4-1.4zm-3-22.1c0 4-1 7-2.6 10-.2.4-.3.9-.2 1.4l2.1 8.4-8.3-2.1c-.5-.1-1-.1-1.4.2-1.8 1-5.2 2.6-10 2.6-11.4 0-20.6-9.2-20.6-20.5S12.7 3.5 24 3.5 44.5 12.7 44.5 24z'
								fillRule='evenodd'></path>
						</svg>
					</label>
					<svg
						aria-label='Share Post'
						fill='#262626'
						height='24'
						viewBox='0 0 48 48'
						width='24'>
						<path d='M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l15.9 15.6 5.5 22.6c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.4-.4.4-1 .1-1.5zM5.2 6.1h35.5L18 18.7 5.2 6.1zm18.7 33.6l-4.4-18.4L42.4 8.6 23.9 39.7z'></path>
					</svg>
				</div>
				<div className='bookmark__div'>
					<svg
						aria-label='Save'
						fill='#262626'
						height='24'
						viewBox='0 0 48 48'
						width='24'>
						<path d='M43.5 48c-.4 0-.8-.2-1.1-.4L24 29 5.6 47.6c-.4.4-1.1.6-1.6.3-.6-.2-1-.8-1-1.4v-45C3 .7 3.7 0 4.5 0h39c.8 0 1.5.7 1.5 1.5v45c0 .6-.4 1.2-.9 1.4-.2.1-.4.1-.6.1zM24 26c.8 0 1.6.3 2.2.9l15.8 16V3H6v39.9l15.8-16c.6-.6 1.4-.9 2.2-.9z'></path>
					</svg>
				</div>
			</div>
			<h4 className='post__text'>
				<strong>{username}</strong> {caption}
			</h4>
			{comments.length ? (
				<>
					<p style={{ color: "gray", paddingLeft: "10px" }}>
						View all {comments.length} comments
					</p>
					<div className='post__comments'>
						{comments.map((comment) => (
							<p>
								<strong>{comment.username}</strong>{" "}
								{comment.text.slice(0, 50)}
							</p>
						))}
					</div>
				</>
			) : (
				""
			)}
			{user ? (
				<form action='' className='post__commentBox'>
					<Input
						className='post__input'
						type='text'
						id={postId}
						placeholder='Add a comment...'
						value={comment}
						onChange={(e) => setComment(e.target.value)}
					/>
					<Button
						disabled={!comment}
						className='post__button'
						type='submit'
						onClick={postComment}>
						Post
					</Button>
				</form>
			) : (
				""
			)}
		</div>
	);
}

export default Post;
