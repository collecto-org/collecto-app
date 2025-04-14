import { Advert } from '../../services/schemas/AdvertsSchemas'; 

interface Props {
	advert: Advert;
}

const AdvertContent = ({ advert }: Props) => {
	const { createdAt, title, transaction, price,  } = advert;
	const date = new Date(createdAt);

	return (
		<div className="bg-sky-700 text-amber-50  flex flex-col items-center text-center rounded-xl shadow-md">
			<h3 className="text-3xl font-bold mb-3">{title}</h3>

			

			<span className="mt-3">{transaction}</span>

			<div className="mb-3">
				<span className="text-[20px] mr-2.5">
					Precio: <strong>{price}</strong>
				</span>
				<span>{advert.transaction ? 'Compra' : 'Venta'}</span>
			</div>

			<div className="flex flex-col text-center justify-center bg-sky-400 pl-5 pr-5 rounded-lg">
				
				
			</div>

			<span className="mt-2">
				Publicado el {date.toLocaleDateString('es-ES')}
			</span>
		</div>
	);
};

export default AdvertContent;
