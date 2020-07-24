/* eslint-disable class-methods-use-this */
// Libs
import React, { Component } from 'react';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

// Components
import Header from '../components/Header';
import Loading from '../components/Loading';

//
const Container = styled.div`
	width: 100%;
	height: 100%;
	background: #38D5D5;
`;

const Form = styled.form`
	margin: 0 auto;
	padding-top: 2rem;
	width: 86%;
	display: flex;
	flex-direction: column;
`;

const FormContent = styled.div`
  margin-bottom: ${(props) => (props.isError ? '0.5rem' : '1.5rem')};
`;

const Label = styled.label`
	font: 700 1rem 'Overpass', serif;
	width: 90%;
	color: #FFF;
`;

const Input = styled.input`
	padding: 0.7rem 0.7rem;
  width: 100%;
	color: #989494;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	background: #FFF;
	outline: none;
  border: ${(props) => (props.isError ? '2px solid red' : 'none')};
	border-radius: 4px;
	box-shadow: 2px 2px 2px #888888;

	::placeholder {
		color: #989494;
	}
`;

const ErrorMessage = styled.p`
	margin-top: .3rem;
  color: red;
	font: 400 .9rem 'Overpass', serif;
	display: flex;
	justify-content: flex-end;
`;

const Footer = styled.div`
	margin: 2rem 0;
	display: flex;
	justify-content: space-between;
`;

const Button = styled.button`
	width: 9.2rem;
	height: 3rem;
	color: #fff;
	font: 700 1rem 'Overpass', serif;
	text-decoration: none;
	text-transform: uppercase;
	border-radius: 50px;
	box-shadow: ${(props) => (props.cancel ? 'none' : '2px 2px 2px #888888')};
	background: ${(props) => (props.cancel ? 'transparent' : '#49E5D6')};
	border: ${(props) => (props.cancel ? '1px solid #FFF' : 'none')};
	display: flex;
	justify-content: center;
	align-items: center;
	cursor: pointer;

	@media(max-width: 320px) {
		width: 8rem;
	}
`;

class Login extends Component {
	state = {
		isRedirect: undefined,
		redirect: undefined,
		isLoading: undefined,
		name: '',
		expirationDate: undefined,
		code: '',
		category: '',
		isErrorName: undefined,
		isErrorExpirationDate: undefined,
		isErrorCode: undefined,
		isErrorCategory: undefined,
	}

	handleBackScanner = () => {
		this.props.history.goBack();
	}

	handleChange = (field, ev) => {

		if (field === 'name') {
			this.setState({
				isErrorName: ev.target.value.length < 1,
			});
		}

		if (field === 'expirationDate') {
			this.setState({
				isErrorExpirationDate: ev.target.value.length < 1,
			});
		}

		if (field === 'code') {
			this.setState({
				isErrorCode: ev.target.value.length < 1,
			});
		}

		if (field === 'category') {
			this.setState({
				isErrorCategory: ev.target.value.length < 1,
			});
		}

		this.setState({
			[field]: ev.target.value,
		});
	};

	validationScreen = () => {
		const { name, expirationDate, code, category } = this.state;

		if (!name) {
			this.setState({
				isErrorName: true,
			});
		} else {
			this.setState({
				isErrorName: false,
			});
		}

		if (!expirationDate) {
			this.setState({
				isErrorExpirationDate: true,
			});
		} else {
			this.setState({
				isErrorExpirationDate: false,
			});
		}

		if (!code) {
			this.setState({
				isErrorCode: true,
			});
		} else {
			this.setState({
				isErrorCode: false,
			});
		}

		if (!category) {
			this.setState({
				isErrorCategory: true,
			});
		} else {
			this.setState({
				isErrorCategory: false,
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const {
			isErrorName,
			isErrorExpirationDate,
			isErrorCode,
			isErrorCategory,
		} = this.state;

		this.validationScreen();

		if (
			isErrorName === false
			&& isErrorExpirationDate === false
			&& isErrorCode === false
			&& isErrorCategory === false
		) {
			this.setState({
				isLoading: true,
			});
		}
	}

	renderForm = () => {
		const {
			barCode,
			name,
			expirationDate,
			category,
			substance,
			laboratory,
			openProduct,
			quantity,
			description,
			isErrorBarCode,
			isErrorName,
			isErrorExpirationDate,
			isErrorOpenProduct,
			isErrorQuantity
		} = this.state;
		const errorMessage = '*Campo obrigatório.';

		return (
			<>
				<FormContent isError={isErrorBarCode}>
					<Label> Código de barras: </Label>
					<Input
						type="text"
						value={barCode}
						onChange={(ev) => this.handleChange('barCode', ev)}
						placeholder='Digite aqui...'
						isError={isErrorBarCode}
					/>
					{isErrorBarCode && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label onClick={this.handleLabelName}>
						Nome:
					</Label>
					<Input
						type="text"
						value={name}
						onChange={(ev) => this.handleChange('name', ev)}
						placeholder='Digite aqui...'
						isError={isErrorName}
					/>
					{isErrorName && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorName}>
					<Label>	Data de Validade:	</Label>
					<Input
						type="date"
						value={expirationDate}
						onChange={(ev) => this.handleChange('expirationDate', ev)}
						placeholder='Digite aqui...'
						isError={isErrorExpirationDate}
					/>
					{isErrorExpirationDate && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label>Categoria: </Label>
					<Input
						type="text"
						value={category}
						onChange={(ev) => this.handleChange('category', ev)}
						placeholder='Digite aqui...'
					/>
				</FormContent>
				<FormContent>
					<Label> Substância: </Label>
					<Input
						type="text"
						value={substance}
						onChange={(ev) => this.handleChange('substance', ev)}
						placeholder='Digite aqui...'
					/>
				</FormContent>






				{/* Código, Produto,  Data de Validade, Categoria, Substância, Laboratório, Produto aberto? Quantidade, Descrição */}


				{/* Code, Product, Expiration Date, Category, Substance, Laboratory, Open product? Quantity, Description */}



				<FormContent>
					<Label> Laboratório: </Label>
					<Input
						type="text"
						value={laboratory}
						onChange={(ev) => this.handleChange('laboratory', ev)}
						placeholder='Digite aqui...'
					/>
				</FormContent>
				<FormContent isError={isErrorOpenProduct}>
					<Label> Produto aberto? </Label>
					<Input
						type="text"
						value={openProduct}
						onChange={(ev) => this.handleChange('openProduct', ev)}
						placeholder='Digite aqui...'
						isError={isErrorOpenProduct}
					/>
					{isErrorOpenProduct && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent isError={isErrorQuantity}>
					<Label> Quantidade: </Label>
					<Input
						type="text"
						value={quantity}
						onChange={(ev) => this.handleChange('quantity', ev)}
						placeholder='Digite aqui...'
						isError={isErrorQuantity}
					/>
					{isErrorQuantity && (
						<ErrorMessage>
							{errorMessage}
						</ErrorMessage>
					)}
				</FormContent>
				<FormContent>
					<Label> Descrição: </Label>
					<Input
						type="text"
						value={description}
						onChange={(ev) => this.handleChange('description', ev)}
						placeholder='Digite aqui...'
					/>
				</FormContent>
			</>
		);
	}

	render() {
		const {
			isRedirect,
			redirect,
			isLoading,
		} = this.state;

		return (
			<Container>
				<Header openModal={this.handleBackScanner} />
				<Form onSubmit={this.handleSubmit}>
					{/* <FormContent>
						<Input
							id="input__name"
							placeholder='Digite seu nome'
						/>
						<Label for="input__name" onClick={this.handleLabelName}>
							Nome:
						</Label>
					</FormContent> */}
					<div>
						{this.renderForm()}
					</div>
					<Footer>
						<Button cancel onClick={this.handleBackScanner}>cancelar</Button>
						<Button>confirmar</Button>
					</Footer>
				</Form>
				{isLoading && <Loading />}
				{isRedirect && <Redirect to={redirect} />}
			</Container>
		);
	}
}

export default Login;
