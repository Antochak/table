import * as React from 'react';
import { BasicModal } from "./BasicModal";
import { FC, useState} from "react";
import { FlexContainer } from "../..";
import { Button, TextField } from '@mui/material/';
import {ImageUploader} from "../image-uploader/ImageUploader";

type SetPackModalPropsType = {
	header: string
	title?: string
	setImage: (value: string) => void
	image: string
	isOpened: boolean
	onClose: () => void
	onTitleChanged: (title: string) => void
	onImageChanged?: (image: string) => void
}

export const SetPackModal: FC<SetPackModalPropsType> = (
	{
		header,
		title,
		onTitleChanged,
		onImageChanged,
		onClose,
		setImage,
		image,
		isOpened
	}) => {
	const [titleState, setTitleState] = useState(title || '')

	const onSubmitTitleHandler = () => {
		onTitleChanged(titleState)
		onClose()
	}
	const onUploadImage = (image: string) => {
		onImageChanged && onImageChanged(image)
		setImage(image)
	}
	return (
		<BasicModal isOpened={isOpened}>
			<h2>{header}</h2>
			<FlexContainer flexDirection="column" >
				<TextField
					placeholder="Set Pack name"
					variant="standard"
					style={{marginTop: '20px', width: '300px'}}
					value={titleState}
					onChange={(e) => setTitleState(e.currentTarget.value)}
				/>
				{!!image && <div style={{height: '100px'}}><img style={{height: '100%'}} src={image} alt=""/></div>}
				<FlexContainer justifyContent={'flex-start'} >
					<ImageUploader onUploadClick={(image) => onUploadImage(image)}/>
					<span style={{marginLeft: '30px'}}>Import file</span>
				</FlexContainer>
				<FlexContainer justifyContent="space-around" flexDirection="row">
					<Button
						style={{marginTop: '20px', width: '130px'}}
						onClick={onSubmitTitleHandler}
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

