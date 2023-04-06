import * as React from 'react';
import { BasicModal } from "./BasicModal";
import { FC, useState} from "react";
import { FlexContainer } from "../..";
import { Button, TextField } from '@mui/material/';

type SetPackModalPropsType = {
	header: string
	title?: string
	isOpened: boolean
	onClose: () => void
	onTitleChanged: (title: string) => void
}

export const SetPackModal: FC<SetPackModalPropsType> = (
	{
		header,
		title,
		onTitleChanged,
		onClose,
		isOpened
	}) => {
	const [titleState, setTitleState] = useState(title || '')
	console.log('titleState', titleState)
	console.log('title', title)

	const onSubmitHandler = () => {
		onTitleChanged(titleState)
		onClose()
	}

	return (
		<BasicModal isOpened={isOpened}>
			<h2>{header}</h2>
			<FlexContainer flexDirection="column" height="150px">
				<TextField
					placeholder="Set Pack name"
					variant="standard"
					style={{marginTop: '20px', width: '300px'}}
					value={titleState}
					onChange={(e) => setTitleState(e.currentTarget.value)}
				/>
				<FlexContainer justifyContent="space-around" flexDirection="row">
					<Button
						style={{marginTop: '20px', width: '130px'}}
						onClick={onSubmitHandler}
						variant={'contained'}
					>Save
					</Button>
					<Button
						style={{marginTop: '20px', backgroundColor: "red", width: '130px'}}
						onClick={onClose}
						variant={'contained'}
					>Cancel
					</Button>
				</FlexContainer>
			</FlexContainer>
		</BasicModal>
	)
}

