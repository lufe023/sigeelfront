import React from 'react'

const PREFERENCE_FIELDS = [
  'Partido',
  'Presidente',
  'Senador',
  'Diputado',
  'Alcalde',
  'Regidor',
]

const formatCitizenId = (citizenID) => {
  if (!citizenID || citizenID.length < 11) return citizenID || ''

  return `${citizenID.slice(0, 3)}-${citizenID.slice(3, 10)}-${citizenID.slice(10, 11)}`
}

const PeopleCardPrint = ({ people }) => {
  const fullName = [people?.firstName, people?.lastName, people?.lastNameB]
    .filter(Boolean)
    .join(' ')

  return (
    <article className='capture-form-card'>
      <div className='capture-form-card__header'>
        {people?.picture ? (
          <img
            src={people.picture}
            alt={fullName || 'elector'}
            className='capture-form-card__photo'
          />
        ) : (
          <div className='capture-form-card__photo capture-form-card__photo--placeholder'>
            Sin foto
          </div>
        )}

        <div className='capture-form-card__identity'>
          <h4>{fullName || 'Ciudadano sin nombre'}</h4>
          <p>
            <strong>Cedula:</strong> {formatCitizenId(people?.citizenID)}
          </p>
          <div className='capture-form-field capture-form-field--inline'>
            <span className='capture-form-label'>Celular:</span>
            <span className='capture-form-line' />
          </div>
        </div>
      </div>

      <div className='capture-form-card__sections'>
        <section className='capture-form-section'>
          <h5>Preferencias / intencion de voto</h5>
          <div className='capture-preferences-grid'>
            {PREFERENCE_FIELDS.map((field) => (
              <div key={field} className='capture-form-field'>
                <span className='capture-form-label'>{field}:</span>
                <span className='capture-form-line' />
              </div>
            ))}
          </div>
        </section>
      </div>
    </article>
  )
}

export default PeopleCardPrint