import React, { useState, useEffect } from 'react';
import Modal from '@material-ui/core/Modal';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Input } from '@material-ui/core';
import InstagramEmbed from 'react-instagram-embed';
import { auth, db } from './firebase';
import './App.css';
import Post from './Post';
import ImageUpload from './ImageUpload';
import { appId, clientId } from './env';

function getModalStyle() {
	const top = 50;
	const left = 50;
	return {
		position: `relative`,
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyle = makeStyles(theme => ({
	paper: {
		position: 'absolute',
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: '2px solid #000',
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 5),
	},
}));

function App() {
	const classes = useStyle();
	const [modalStyle] = useState(getModalStyle);

	const [posts, setPosts] = useState([]);
	const [open, setOpen] = useState(false);
	const [openSignIn, setOpenSignIn] = useState(false);
	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [email, setEmail] = useState('');
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((authUser) => {
			if (authUser) {
				setUser(authUser);
			} else {
				setUser(null);
			}
		});

		return () => {
			unsubscribe();
		};
	}, [user, username]);

	useEffect(() => {
		db.collection('posts').orderBy(`timestamp`, `desc`).onSnapshot(snapshot => {
			setPosts(snapshot.docs.map(doc => ({
				id: doc.id,
				post: doc.data()
			})));
		});
	}, []);

	const signUp = (e) => {
		e.preventDefault();
		auth
			.createUserWithEmailAndPassword(email, password)
			.then(authUser => {
				return authUser.user.updateProfile({
					displayName: username
				});
			})
			.catch(err => alert(err.message));
		setOpen(false);
	};

	const signIn = (e) => {
		e.preventDefault();
		auth
			.signInWithEmailAndPassword(email, password)
			.catch(err => alert(err.message));
		setOpenSignIn(false);
	};

	return (
		<div className="app">
			<Modal open={open} onClose={() => setOpen(false)}>
				<div style={modalStyle} className={classes.paper}>
					<center>
						<img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt="" />
					</center>
					<p className='cross' onClick={() => setOpen(false)}>&times;</p>
					<form action="" className='app__signup'>
						<Input placeholder='username' type='text' value={username} onChange={e => setUsername(e.target.value)} />
						<Input placeholder='email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
						<Input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
						<Button onClick={signUp}>Sign Up</Button>
					</form>
				</div>
			</Modal>
			<Modal open={openSignIn} onClose={() => setOpenSignIn(false)}>
				<div style={modalStyle} className={classes.paper}>
					<center>
						<img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt="" />
					</center>
					<p className='cross' onClick={() => setOpenSignIn(false)}>&times;</p>
					<form action="" className='app__signup'>
						<Input placeholder='email' type='text' value={email} onChange={e => setEmail(e.target.value)} />
						<Input placeholder='password' type='password' value={password} onChange={e => setPassword(e.target.value)} />
						<Button onClick={signIn}>Sign In</Button>
					</form>
				</div>
			</Modal>
			<div className='app__header'>
				<img className='app__headerImage' src='https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png' alt="" />
				{
					user ? (
						<Button onClick={() => auth.signOut()}>Logout</Button>
					) : (
							<div className='loginContainer'>
								<Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
								<Button onClick={() => setOpen(true)}>Sign Up</Button>
							</div>
						)
				}
			</div>
			<div className="max__width">
				<div className="app__posts">
					{
						posts.map(({ id, post }) => (
							<Post key={id} username={post.username} caption={post.caption} imgUrl={post.imgUrl} />
						))
					}
				</div>
				<InstagramEmbed className='app__posts' url='https://www.instagram.com/p/B5TAnXVHS0i/' clientAccessToken={appId + '|' + clientId} maxWidth={320} hideCaption={true} containerTagName='div' protocol='' injectScript onLoading={() => { }} onSuccess={() => { }} onAfterRender={() => { }} onFailure={() => { }} />
			</div>
			{
				user?.displayName ? (
					<ImageUpload username={user.displayName} />
				) : (
						<h3>LogIn to Uplaod Images</h3>
					)
			}
		</div>
	);
}

export default App;
