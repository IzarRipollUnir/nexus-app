'use client';

import { useRouter } from 'next/navigation';
import styles from './HomeClient.module.css';

type HomeClientProps = {
  isAuthenticated: boolean;
};

export function HomeClient({ isAuthenticated }: HomeClientProps) {
  const router = useRouter();

  const services = [
    {
      title: 'Librería Universitaria',
      description: 'Accede a miles de libros y revistas académicas',
      icon: '📚',
      link: '/library',
      accentClass: styles.serviceActionLibrary,
    },
    {
      title: 'Co-working',
      description: 'Reserva espacios de trabajo colaborativo',
      icon: '💼',
      link: '/coworking',
      accentClass: styles.serviceActionCoworking,
    },
    {
      title: 'Cafetería',
      description: 'Próximamente disponible',
      icon: '☕',
      link: '#',
      accentClass: styles.serviceActionCafeteria,
      disabled: true,
    },
    {
      title: 'Eventos',
      description: 'Próximamente disponible',
      icon: '🎫',
      link: '#',
      accentClass: styles.serviceActionEvent,
      disabled: true,
    },
  ];

  return (
    <section className={styles.root}>
      <div className={styles.hero}>
        <h1 className={styles.heroTitle}>
          Bienvenido a NEXUS
        </h1>
        <p className={styles.heroSubtitle}>
          Tu plataforma universitaria integral
        </p>
        {!isAuthenticated ? (
          <button
            onClick={() => router.push('/login')}
            className={styles.heroButton}
            type="button"
          >
            Iniciar Sesión
          </button>
        ) : null}
      </div>

      <h2 className={styles.servicesTitle}>
        Nuestros Servicios
      </h2>

      <div className={styles.servicesGrid}>
        {services.map((service) => (
          <article
            className={`${styles.serviceCard} ${service.disabled ? styles.serviceDisabled : ''}`}
            key={service.title}
          >
            <div className={`${styles.serviceIconWrap} ${service.accentClass}`}>
              <span>
                {service.icon}
              </span>
            </div>

            <h3 className={styles.serviceTitle}>{service.title}</h3>

            <p className={styles.serviceDescription}>{service.description}</p>

            {!service.disabled && isAuthenticated ? (
              <button
                onClick={() => router.push(service.link)}
                className={`${styles.serviceAction} ${service.accentClass}`}
                type="button"
              >
                Acceder
              </button>
            ) : (
              <span className={styles.servicePlaceholder}>No disponible</span>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
