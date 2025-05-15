import profile1 from '../../assets/profile/Romar Arquitola.png';
import profile2 from '../../assets/profile/Camille Cariaga.png';
import profile3 from '../../assets/profile/Abilaine Domingo.jpg';
import profile4 from '../../assets/profile/Grachiella Laroya.png';
import profile5 from '../../assets/profile/Julianne Maaba.jpg';

const teamMembers = [
  {
    name: 'Romar Arquitola',
    role: 'Owner',
    img: profile1
  },
  {
    name: 'Camille Cariaga',
    role: 'Food and Beverage Manager',
    img: profile2
  },
  {
    name: 'Abilaine Domingo',
    role: 'Barista',
    img: profile3
  },
  {
    name: 'Grachiella Laroya',
    role: 'Executive Chef',
    img: profile4
  },
  {
    name: 'Julianne Maaba',
    role: 'Pastry Chef',
    img: profile5
  }
];

const Ourteam = () => {
  return (
    <div style={{ padding: '60px 20px', textAlign: 'center' }}>
      <h2>Our Team</h2>
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '30px',
        marginTop: '40px'
      }}>
        {teamMembers.map((member, index) => (
          <div key={index} style={{ maxWidth: '180px' }}>
            <img
              src={member.img}
              alt={member.name}
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px'
              }}
            />
            <strong>{member.name}</strong>
            <p style={{ marginTop: '5px', fontSize: '14px', color: '#666' }}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ourteam;
