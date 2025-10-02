export async function generateMetadata({ params }) {
    const { slug } = await params;
    return { title: `About ${slug}` };
  }
  
  export default async function AboutSlugPage({ params }) {
    const { slug } = await params;
    return (
      <section className="space-y-2">
        <h1 className="text-2xl font-semibold">About: {slug}</h1>
        <p>นี่คือหน้า dynamic /about/{slug}</p>
      </section>
    );
  }
