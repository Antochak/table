import * as React from 'react';
import defaultLogo from '../../../assets/images/logo.png'
import { BasicModal } from "./BasicModal";
import { FC, useState} from "react";
import { ImageUploader } from "../image-uploader/ImageUploader";
import { Button, TextField } from '@mui/material/';
import {FlexContainer, Image, TextContainer} from "../..";

type SetPackModalPropsType = {
	header: string
	title?: string
	imageMode?: boolean
	isOpened: boolean
	onClose: () => void
	onTitleChanged: (title: string, image: string) => void

}

export const SetPackModal: FC<SetPackModalPropsType> = (
	{
		header,
		title,
		onTitleChanged,
		onClose,
		imageMode,
		isOpened
	}) => {
	const [titleState, setTitleState] = useState(title || '')
	const [image, setImage] = useState<string>(defaultLogo)

	const onSubmitTitleHandler = () => {
		onTitleChanged(titleState, image)
		onClose()
	}
	const onUploadImage = (image: string) => {
		setImage(image)
	}
	return (
		<BasicModal isOpened={isOpened}>
			<h2>{header}</h2>
			<FlexContainer flexDirection="column" >
				<TextField
					placeholder="Set Pack name"
					variant="standard"
					style={{margin: '20px 0 10px 0', width: '300px'}}
					value={titleState}
					onChange={(e) => setTitleState(e.currentTarget.value)}
				/>

				{imageMode &&
					<FlexContainer flexDirection="column" justifyContent="flex-start">
                        <Image height="70px" src={image}/>
                        <FlexContainer justifyContent={'space-between'} alignItems={"center"} >
                            <ImageUploader onUploadClick={(image) => onUploadImage(image)}/>
                            <TextContainer margin="0 0 0 30px">Import file</TextContainer>
                        </FlexContainer>
					</FlexContainer>
				}
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

