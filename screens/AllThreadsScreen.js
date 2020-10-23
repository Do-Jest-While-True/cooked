import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Entypo } from '@expo/vector-icons';

import { getAllThreads, postNewThread } from '../redux';

import colors from '../config/colors';
import defaultStyles from '../config/defaultStyles';

const AllThreadsScreen = ({ directMessages, getThreads, navigation, auth, postNewThread }) => {
	const [ displayNewMsgForm, setDisplayNewMsgForm ] = useState(false);
	const [ emptyWarning, setEmptyWarning ] = useState(false);
	const [ usernameInput, setUsernameInput ] = useState('');

	useEffect(() => {
		getThreads();
	}, []);

	const toggleNewMsgForm = () => {
		if (displayNewMsgForm) {
			setDisplayNewMsgForm(false);
		} else {
			setDisplayNewMsgForm(true);
		}
	};

	const handleStartMessage = () => {
		if (!usernameInput) {
			return setEmptyWarning(true);
		}

		postNewThread(auth.id, usernameInput);

		// let thread = directMessages[directMessages.length - 1];

		// navigation.navigate('Chat', { thread });

		setUsernameInput('');
		setEmptyWarning(false);
	};

	const handleNavToSingleThread = (thread) => {
		navigation.navigate('Chat', { thread });
	};

	return (
		<View style={defaultStyles.container}>
			{/* OPEN NEW MSG FORM BTN */}
			<TouchableOpacity style={styles.newMsgBtn} onPress={toggleNewMsgForm}>
				<Text style={[ defaultStyles.smallText, styles.newMsgBtnText ]}>New Message</Text>
			</TouchableOpacity>
			{/* NEW MESSAGE FORM */}
			{displayNewMsgForm && (
				<View>
					{emptyWarning && (
						<Text style={[ defaultStyles.smallText, styles.warningMsg ]}>
							Enter username to start message!
						</Text>
					)}
					<View style={styles.newMsgFormView}>
						<TextInput
							placeholder="Enter username"
							placeholderTextColor={colors.lightGray}
							style={[ styles.formInput ]}
							clearButtonMode="always"
							onSubmitEditing={handleStartMessage}
							onChangeText={(val) => {
								setUsernameInput(val);
							}}
							value={usernameInput}
						/>
						<TouchableOpacity style={styles.startMsgBtn} onPress={handleStartMessage}>
							<Entypo name="new-message" size={28} color={colors.white} />
						</TouchableOpacity>
					</View>
				</View>
			)}
			{/* MESSAGE LIST: */}
			<FlatList
				data={directMessages}
				keyExtractor={(thread) => thread.id.toString()}
				renderItem={({ item }) => (
					<TouchableOpacity style={styles.singleThreadView} onPress={() => handleNavToSingleThread(item)}>
						<Image source={{ uri: item.user.profileImageUrl }} style={styles.profileImage} />
						<View>
							<Text style={defaultStyles.text}>
								{item.user.firstName} {item.user.lastName}
							</Text>
							<Text style={[ defaultStyles.text, styles.username ]}>@{item.user.username}</Text>
							<Text style={defaultStyles.smallText}>
								{item.messages.length} message
								{(item.messages.length < 1 && 's') || (item.messages.length > 1 && 's')}
							</Text>
						</View>
					</TouchableOpacity>
				)}
			/>
		</View>
	);
};

const mapState = (state) => ({
	auth: state.auth,
	directMessages: state.directMessages
});

const mapDispatch = (dispatch) => ({
	getThreads: () => dispatch(getAllThreads()),
	postNewThread: (myId, username) => dispatch(postNewThread(myId, username))
});

export default connect(mapState, mapDispatch)(AllThreadsScreen);

const styles = StyleSheet.create({
	newMsgBtn: {
		alignSelf: 'center',
		marginVertical: 30,
		width: '40%',
		paddingVertical: 10,
		borderRadius: 20,
		backgroundColor: colors.pink
	},
	newMsgBtnText: {
		textAlign: 'center',
		fontWeight: 'bold'
	},
	newMsgFormView: {
		flexDirection: 'row',
		justifyContent: 'center',
		// THIS IS TEMPORARY -- NOT DYNAMIC:
		marginLeft: 45
	},
	warningMsg: {
		textAlign: 'center',
		marginBottom: 20,
		color: colors.pink
	},
	formInput: {
		backgroundColor: colors.light,
		borderRadius: 25,
		height: 40,
		width: '60%',
		paddingHorizontal: 20,
		marginBottom: 20,
		fontSize: 16,
		color: colors.white,
		alignSelf: 'center',
		textAlign: 'center'
	},

	startMsgBtn: {
		// THIS IS TEMPORARY -- NOT DYNAMIC:
		margin: 12,
		marginTop: 5
	},
	singleThreadView: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingVertical: 12,
		borderTopWidth: 0.25,
		borderBottomWidth: 0.25,
		borderTopColor: colors.lightGray,
		borderBottomColor: colors.lightGray
	},
	profileImage: {
		width: 80,
		height: 80,
		borderRadius: 40,
		margin: 15
	},
	username: {
		marginVertical: 10,
		color: colors.lightBlue,
		fontSize: 17,
		fontWeight: 'bold'
	}
});
