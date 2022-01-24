import Layout from '../components/Layout';
import Link from 'next/link';

export const pokemon = ({ pokemon }) => {
    console.log(pokemon);
    return (
        <Layout title={pokemon.name}>

            <div>
            <section className=" w-72 mx-auto bg-[#20354b] rounded-2xl px-8 py-6 shadow-lg">
                <div className="flex items-center justify-between">
                    <span className="text-gray-400 text-sm">#{pokemon.id}</span>
                </div>
                <div className="mt-6 w-fit mx-auto">
                    <img src={pokemon.image} className="rounded-full w-28 " alt="profile picture" srcset="" />
                </div>

                <div className="mt-8 ">
                    <h2 className="text-white font-bold text-2xl tracking-wide capitalize">{pokemon.name}</h2>
                </div>
                <div>
                    <h2 className='text-white font-semibold'>Types</h2>
                    {
                    pokemon.types.map((poke, index) => (
                        <p key={index} className="text-white text-sm" >
                            {poke.type.name}
                        </p>
                    ))
                }
                </div>

            </section>
            <div className="mx-auto text-center mt-4">
            <Link href="/">
                <a className='underline'>Home</a>
            </Link>
            </div>
            </div>


        </Layout>
    );
};
export default pokemon;
export async function getServerSideProps({ query }) {
    const id = query.id;
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const pokemon = await res.json();
        console.log('a');
        console.log(pokemon);
        const paddedIndex = ("00" + id).slice(-3)
        pokemon.image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
        return {
            props: { pokemon }
        }
    } catch (error) {
        console.log(error);

    }

}


