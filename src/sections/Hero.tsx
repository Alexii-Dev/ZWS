export default function Hero() {
  return (
    <section
      id="desarrollo"
      className="relative w-full overflow-hidden"
      style={{ height: '100vh', minHeight: '600px' }}
    >
      <img
        src="/fondozwsoscuro.png"
        alt=""
        aria-hidden="true"
        width="1332"
        height="630"
        decoding="async"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.18) 48%, rgba(5,5,5,0.06) 100%)',
        }}
      />

      <div
        className="relative z-10 flex h-full flex-col justify-end"
        style={{ paddingLeft: '5vw', paddingBottom: '15vh', paddingRight: '5vw' }}
      >
        <p
          className="font-mono-tech mb-4 text-xs tracking-[0.3em] sm:text-sm"
          style={{ color: '#378ADD' }}
        >
          DESARROLLO DIGITAL EN CHILE
        </p>
        <h1
          className="mb-6 max-w-4xl text-4xl font-semibold leading-[1.1] sm:text-5xl md:text-6xl lg:text-[5.5vw]"
          style={{
            color: '#f0f0f0',
            textShadow: '0 2px 40px rgba(0,0,0,0.8)',
          }}
        >
          Desarrollo web y software
          <br />
          para hacer crecer tu negocio.
        </h1>
        <p
          className="mb-8 max-w-xl text-base leading-relaxed sm:text-lg"
          style={{
            color: 'rgba(240,240,240,0.8)',
            textShadow: '0 1px 20px rgba(0,0,0,0.6)',
          }}
        >
          Creamos páginas web, plataformas y soluciones digitales completas. Nos encargamos
          del diseño, frontend, backend e integraciones para llevar tu idea a producción.
        </p>
        <div className="flex flex-wrap gap-4">
          <a
            href="mailto:desarrollo@zws.cl?subject=Quiero%20cotizar%20un%20proyecto%20de%20desarrollo"
            className="btn-primary"
          >
            Cuéntanos tu proyecto
          </a>
          <a
            href="#software"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('software')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost"
            style={{ color: '#f0f0f0', borderColor: 'rgba(240,240,240,0.3)' }}
          >
            Ver servicios
          </a>
          <a
            href="mailto:desarrollo@zws.cl?subject=Consulta%20de%20soporte%20t%C3%A9cnico"
            className="btn-ghost"
            style={{ color: '#f0f0f0', borderColor: 'rgba(240,240,240,0.3)' }}
          >
            Soporte técnico
          </a>
        </div>
      </div>
    </section>
  );
}
