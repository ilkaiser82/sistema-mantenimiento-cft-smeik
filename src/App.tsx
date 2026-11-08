import React, { useState } from 'react';
import { 
  Wrench, 
  ClipboardList, 
  Calendar, 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Printer, 
  Eye, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  Building2, 
  ChevronRight, 
  X, 
  Download,
  Layers,
  Sparkles,
  ShieldCheck,
  Check,
  CalendarDays,
  CheckSquare,
  SlidersHorizontal,
  Info,
  Settings,
  Trash2,
  ListPlus,
  RefreshCw,
  FolderTree,
  ChevronDown,
  ArrowLeft,
  BarChart3,
  FileDown,
  TrendingUp,
  Users,
  Activity,
  Flame,
  PieChart,
  Gauge,
  Droplets,
  Power,
  RotateCw,
  Edit3,
  History,
  Tag,
  MapPin,
  Save,
  DollarSign,
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Boxes,
  Archive,
  Lock,
  UserCheck,
  LogOut,
  KeyRound,
  Phone,
  PhoneCall,
  BookOpen,
  FileCheck,
  Menu,
  Truck
} from 'lucide-react';

// Escudo / Logo Oficial de la Cámara Federal de Tucumán desde el link provisto (agrandado)
const EscudoPJN = ({ className = "w-20 h-20 object-contain" }) => (
  <img 
    src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" 
    alt="Logo Poder Judicial de la Nación - CFT" 
    className={`${className} rounded-md`}
    onError={(e) => {
      e.target.style.display = 'none';
    }}
  />
);

export default function App() {
  // --- ESTADO DE AUTENTICACIÓN Y PORTAL DE ACCESO INSTITUCIONAL ---
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginUser, setLoginUser] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [currentUserSession, setCurrentUserSession] = useState(null);

  // NUEVO: Estado para replegar / desplegar la barra lateral (Sidebar)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const sidebarCollapseTimeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleSidebarMouseEnter = () => {
    if (sidebarCollapseTimeoutRef.current !== null) {
      window.clearTimeout(sidebarCollapseTimeoutRef.current);
      sidebarCollapseTimeoutRef.current = null;
    }
    if (!isSidebarPinned) setIsSidebarCollapsed(false);
  };

  const handleSidebarMouseLeave = () => {
    if (isSidebarPinned) return;
    if (sidebarCollapseTimeoutRef.current !== null) {
      window.clearTimeout(sidebarCollapseTimeoutRef.current);
    }
    sidebarCollapseTimeoutRef.current = window.setTimeout(() => {
      setIsSidebarCollapsed(true);
      sidebarCollapseTimeoutRef.current = null;
    }, 180);
  };

  const handleSidebarPinToggle = () => {
    const nextPinned = !isSidebarPinned;
    if (sidebarCollapseTimeoutRef.current !== null) {
      window.clearTimeout(sidebarCollapseTimeoutRef.current);
      sidebarCollapseTimeoutRef.current = null;
    }
    setIsSidebarPinned(nextPinned);
    if (nextPinned) setIsSidebarCollapsed(false);
  };

  React.useEffect(() => () => {
    if (sidebarCollapseTimeoutRef.current !== null) {
      window.clearTimeout(sidebarCollapseTimeoutRef.current);
    }
  }, []);

  // NUEVO: Modales institucionales del Menú General
  const [isEdificiosModalOpen, setIsEdificiosModalOpen] = useState(false);
  const [isContactosModalOpen, setIsContactosModalOpen] = useState(false);
  const [isDocumentosModalOpen, setIsDocumentosModalOpen] = useState(false);
  const [selectedEdificioDetail, setSelectedEdificioDetail] = useState(null);

  // NUEVO: Estado interactivo y editable para Contactos de Emergencia y Directorio
  const [contactosData, setContactosData] = useState({
    mantenimiento: [
      {
        id: 'cnt-mant-1',
        titulo: 'Intendencia Central (Las Piedras 418)',
        telefono: 'Tel: (0381) 484-6000 / 6001 - Int. 210',
        descripcion: 'Horario: 07:00 a 14:00 hs (Lunes a Viernes)'
      },
      {
        id: 'cnt-mant-2',
        titulo: 'Guardia de Mantenimiento Electromecánico',
        telefono: 'Celular / Urgencias: +54 (381) 155-894210',
        descripcion: 'Responsables: Ramón Di Gregori / Gabriel Di Gregori'
      },
      {
        id: 'cnt-mant-3',
        titulo: 'Subintendencia Santiago del Estero',
        telefono: 'Tel: (0385) 421-4890 - Int. 115',
        descripcion: 'Sede Belgrano Norte 515'
      },
      {
        id: 'cnt-mant-4',
        titulo: 'Subintendencia Catamarca',
        telefono: 'Tel: (0383) 443-0215 - Int. 104',
        descripcion: 'Sede República 323'
      }
    ],
    serviciosPublicos: [
      {
        id: 'cnt-serv-1',
        titulo: 'EDET (Electricidad)',
        telefono: '0800-777-3338',
        descripcion: 'N° Cliente PJN: 412098-1'
      },
      {
        id: 'cnt-serv-2',
        titulo: 'GASNOR (Fugas de Gas)',
        telefono: '0800-555-8800',
        descripcion: 'Guardia Urgencias 24 hs'
      },
      {
        id: 'cnt-serv-3',
        titulo: 'SAT (Agua y Cloacas)',
        telefono: '0810-888-8728',
        descripcion: 'Reclamos Técnicos Edilicios'
      }
    ],
    emergencias: [
      {
        id: 'cnt-emg-1',
        titulo: 'Bomberos',
        telefono: '100 / 911',
        descripcion: ''
      },
      {
        id: 'cnt-emg-2',
        titulo: 'Emergencias 107',
        telefono: '107',
        descripcion: ''
      },
      {
        id: 'cnt-emg-3',
        titulo: 'Policía Federal',
        telefono: '430-1111',
        descripcion: ''
      },
      {
        id: 'cnt-emg-4',
        titulo: 'Defensa Civil',
        telefono: '103',
        descripcion: ''
      }
    ]
  });

  // Modal para agregar o editar contacto
  const [editingContactoModal, setEditingContactoModal] = useState(null);
  const [isNewContacto, setIsNewContacto] = useState(false);

  const handleOpenNewContacto = (categoriaDefault = 'mantenimiento') => {
    setEditingContactoModal({
      id: `cnt-${Date.now()}`,
      categoria: categoriaDefault,
      titulo: '',
      telefono: '',
      descripcion: ''
    });
    setIsNewContacto(true);
  };

  const handleOpenEditContacto = (categoriaKey, contacto) => {
    setEditingContactoModal({
      ...contacto,
      categoria: categoriaKey
    });
    setIsNewContacto(false);
  };

  const handleSaveContacto = () => {
    if (!editingContactoModal.titulo.trim() || !editingContactoModal.telefono.trim()) {
      return;
    }

    const { categoria, ...contactoData } = editingContactoModal;

    setContactosData(prev => {
      const updated = { ...prev };
      // Limpiar de todas las secciones en caso de que se haya cambiado de categoría
      Object.keys(updated).forEach(catKey => {
        updated[catKey] = (updated[catKey] || []).filter(c => c.id !== contactoData.id);
      });
      // Insertar en la categoría elegida
      updated[categoria] = [...(updated[categoria] || []), contactoData];
      return updated;
    });

    setEditingContactoModal(null);
  };

  const handleDeleteContacto = (categoriaKey, contactoId) => {
    setContactosData(prev => ({
      ...prev,
      [categoriaKey]: prev[categoriaKey].filter(c => c.id !== contactoId)
    }));
    if (editingContactoModal?.id === contactoId) {
      setEditingContactoModal(null);
    }
  };

  // NUEVO: Estado interactivo para el catálogo de edificios judiciales (editable y expandible)
  const [edificiosList, setEdificiosList] = useState([
    {
      id: 'EDIF-01',
      nombre: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      direccion: 'Calle Las Piedras 418, San Miguel de Tucumán',
      superficie: '4.850 m² (Subsuelos, Planta Baja y 6 Pisos)',
      camposPersonalizados: [
        { id: 'c1', titulo: 'Acometida Eléctrica, Tablero General y Grupos Electrógenos', contenido: 'Acometida trifásica 380V / 220V - Tablero Principal en 1° Subsuelo - Grupo Electrógeno Cummins 150 kVA' },
        { id: 'c2', titulo: 'Llave de Corte de Gas (Vereda / Fachada)', contenido: 'Llave de paso principal de gas natural en nicho de línea municipal sobre calle Las Piedras' },
        { id: 'c3', titulo: 'Agua Potable, Cisternas y Tanques', contenido: 'Cisterna inferior de 35.000 L en 2° Subsuelo + 2 Tanques de reserva en azotea de 12.000 L c/u' },
        { id: 'c4', titulo: 'Seguridad Antisiniestral e Hidrantes', contenido: 'Red de hidrantes presurizada por cuadro electromecánico, matafuegos ABC y puertas cortafuego' },
        { id: 'c5', titulo: 'Contacto Directo / Teléfono de Intendencia', contenido: 'Intendencia de Cámara: (0381) 484-6000 Int. 210' }
      ]
    },
    {
      id: 'EDIF-02',
      nombre: 'Juzgado Federal N° 1 de Tucumán',
      direccion: 'Calle Las Piedras 418 (Cuerpo Histórico / Anexo)',
      superficie: '1.920 m²',
      camposPersonalizados: [
        { id: 'c1', titulo: 'Alimentación Eléctrica', contenido: 'Alimentación desde Tablero Seccional T-JF1, corte general de emergencia en PB' },
        { id: 'c2', titulo: 'Instalación de Gas', contenido: 'Sin instalación interna de gas de combustión' },
        { id: 'c3', titulo: 'Agua Potable', contenido: 'Alimentación vinculada al sistema central de reserva edilicia' },
        { id: 'c4', titulo: 'Seguridad y Extinción', contenido: 'Extintores reglamentarios inspeccionados bajo Ficha PL-21' },
        { id: 'c5', titulo: 'Contacto Local', contenido: 'Mesa de Entradas: (0381) 484-6100' }
      ]
    },
    {
      id: 'EDIF-03',
      nombre: 'Juzgado Federal N° 2 de Tucumán',
      direccion: 'Calle Congreso de Tucumán 351, San Miguel de Tucumán',
      superficie: '2.100 m²',
      camposPersonalizados: [
        { id: 'c1', titulo: 'Electricidad y Suministro EDET', contenido: 'Acometida EDET, tablero general en zaguán de acceso con llave general termomagnética' },
        { id: 'c2', titulo: 'Corte General de Gas', contenido: 'Corte de gas en vereda mediante válvula reguladora aprobada' },
        { id: 'c3', titulo: 'Reservas de Agua y Bombeo', contenido: 'Cisterna de reserva 15.000 L con bombas de elevación alternadas' },
        { id: 'c4', titulo: 'Sistemas Contra Incendio', contenido: 'Sistema de alarmas y extintores vigentes' },
        { id: 'c5', titulo: 'Contacto Subintendencia', contenido: 'Subintendencia Operativa: (0381) 431-1520' }
      ]
    },
    {
      id: 'EDIF-04',
      nombre: 'Secretaría Electoral Nacional - Distrito Tucumán',
      direccion: 'Calle Las Piedras 418, 1° Piso',
      superficie: '680 m²',
      camposPersonalizados: [
        { id: 'c1', titulo: 'Circuito Estabilizado / UPS', contenido: 'Circuito estabilizado UPS para servidores electorales y padrón' },
        { id: 'c2', titulo: 'Gas de Combustión', contenido: 'Sin artefactos a gas' },
        { id: 'c3', titulo: 'Batería Sanitaria y Drenaje', contenido: 'Batería sanitaria propia vinculada a bajadas sanitarias del 1° Piso' },
        { id: 'c4', titulo: 'Seguridad Sala de Cómputos', contenido: 'Acceso biométrico restringido y protección contraincendios FM-200 en sala de cómputos' },
        { id: 'c5', titulo: 'Contacto Secretaría', contenido: 'Secretaría: (0381) 484-6050' }
      ]
    },
    {
      id: 'EDIF-05',
      nombre: 'Juzgado Federal de Catamarca',
      direccion: 'Calle República 323, San Fernando del Valle de Catamarca',
      superficie: '2.400 m²',
      camposPersonalizados: [
        { id: 'c1', titulo: 'Tablero Eléctrico General', contenido: 'Tablero Seccional de corte rápido en acceso principal' },
        { id: 'c2', titulo: 'Válvula de Corte de Gas', contenido: 'Válvula esférica de corte rápido en exterior sobre gabinete reglamentario' },
        { id: 'c3', titulo: 'Cisterna y Bombas de Elevación', contenido: 'Cisterna 20.000 L con motobombas Grundfos' },
        { id: 'c4', titulo: 'Seguridad Laboral y Evacuación', contenido: 'Plan de evacuación y extintores portátiles reglamentarios' },
        { id: 'c5', titulo: 'Subintendencia Catamarca', contenido: 'Subintendencia Catamarca: (0383) 443-0215' }
      ]
    },
    {
      id: 'EDIF-06',
      nombre: 'Juzgado Federal N° 1 y N° 2 de Santiago del Estero',
      direccion: 'Calle Belgrano Norte 515, Santiago del Estero',
      superficie: '3.600 m²',
      camposPersonalizados: [
        { id: 'c1', titulo: 'Transformador y Grupo Electrógeno', contenido: 'Transformador propio y grupo electrógeno de arranque automático' },
        { id: 'c2', titulo: 'Suministro de Gas', contenido: 'Corte general de suministro en zaguán técnico' },
        { id: 'c3', titulo: 'Despresurización de Napas y Pluviales', contenido: 'Sistema de despresurización de napas y bombeo pluvial activo' },
        { id: 'c4', titulo: 'Detección Temprana y Red Hidrante', contenido: 'Red hidrante y sistema de detección temprana de humo' },
        { id: 'c5', titulo: 'Subintendencia Santiago del Estero', contenido: 'Subintendencia Sgo. del Estero: (0385) 421-4890' }
      ]
    }
  ]);

  // Modal para agregar o editar edificio
  const [editingEdificioModal, setEditingEdificioModal] = useState(null); // null | edificioObj
  const [isNewEdificio, setIsNewEdificio] = useState(false);

  const handleOpenNewEdificio = () => {
    const nextNum = (edificiosList.length + 1).toString().padStart(2, '0');
    setEditingEdificioModal({
      id: `EDIF-${nextNum}`,
      nombre: '',
      direccion: '',
      superficie: '',
      camposPersonalizados: [
        { id: `c-${Date.now()}-1`, titulo: 'Acometida Eléctrica y Tableros', contenido: '' },
        { id: `c-${Date.now()}-2`, titulo: 'Llave de Corte de Gas / Suministro', contenido: '' },
        { id: `c-${Date.now()}-3`, titulo: 'Agua Potable y Reservas', contenido: '' }
      ]
    });
    setIsNewEdificio(true);
  };

  const handleOpenEditEdificio = (edificio) => {
    // Asegurar estructura con campos personalizados si proviene de un estado previo
    let campos = edificio.camposPersonalizados;
    if (!campos || !Array.isArray(campos) || campos.length === 0) {
      campos = [];
      if (edificio.electricidad) campos.push({ id: `c-1`, titulo: 'Acometida Eléctrica, Tablero General y Grupos Electrógenos', contenido: edificio.electricidad });
      if (edificio.gas) campos.push({ id: `c-2`, titulo: 'Llave de Corte de Gas (Vereda / Fachada)', contenido: edificio.gas });
      if (edificio.agua) campos.push({ id: `c-3`, titulo: 'Agua Potable, Cisternas y Tanques', contenido: edificio.agua });
      if (edificio.seguridad) campos.push({ id: `c-4`, titulo: 'Seguridad Antisiniestral e Hidrantes', contenido: edificio.seguridad });
      if (edificio.contactoLocal) campos.push({ id: `c-5`, titulo: 'Contacto Directo / Teléfono de Intendencia', contenido: edificio.contactoLocal });
      if (campos.length === 0) {
        campos.push({ id: `c-1`, titulo: 'Datos y Características Técnicas', contenido: '' });
      }
    }

    setEditingEdificioModal({
      ...edificio,
      camposPersonalizados: JSON.parse(JSON.stringify(campos))
    });
    setIsNewEdificio(false);
  };

  const handleAddCustomFieldEdificio = () => {
    if (!editingEdificioModal) return;
    const newField = {
      id: `c-${Date.now()}`,
      titulo: 'Nuevo Título de Campo',
      contenido: ''
    };
    setEditingEdificioModal(prev => ({
      ...prev,
      camposPersonalizados: [...(prev.camposPersonalizados || []), newField]
    }));
  };

  const handleRemoveCustomFieldEdificio = (fieldId) => {
    if (!editingEdificioModal) return;
    setEditingEdificioModal(prev => ({
      ...prev,
      camposPersonalizados: (prev.camposPersonalizados || []).filter(f => f.id !== fieldId)
    }));
  };

  const handleUpdateCustomFieldEdificio = (fieldId, key, value) => {
    if (!editingEdificioModal) return;
    setEditingEdificioModal(prev => ({
      ...prev,
      camposPersonalizados: (prev.camposPersonalizados || []).map(f => 
        f.id === fieldId ? { ...f, [key]: value } : f
      )
    }));
  };

  const handleSaveEdificio = () => {
    if (!editingEdificioModal.nombre.trim() || !editingEdificioModal.direccion.trim()) {
      alert('Por favor ingrese al menos el nombre del edificio y su dirección.');
      return;
    }

    if (isNewEdificio) {
      setEdificiosList(prev => [...prev, editingEdificioModal]);
    } else {
      setEdificiosList(prev => prev.map(e => e.id === editingEdificioModal.id ? editingEdificioModal : e));
    }

    // Sincronizar automáticamente el listado de edificios en los parámetros de la OT
    if (editingEdificioModal.nombre) {
      const fullLabel = `${editingEdificioModal.nombre}, ${editingEdificioModal.direccion}`;
      setDropdownOptions(prev => {
        const currentEdifs = prev.edificios || [];
        if (!currentEdifs.includes(fullLabel)) {
          return {
            ...prev,
            edificios: Array.from(new Set([...currentEdifs, fullLabel]))
          };
        }
        return prev;
      });
    }

    setEditingEdificioModal(null);
  };

  const handleDeleteEdificio = (edificioId) => {
    if (edificiosList.length <= 1) {
      alert('Debe permanecer al menos un edificio en el catálogo.');
      return;
    }
    setEdificiosList(prev => prev.filter(e => e.id !== edificioId));
    if (editingEdificioModal?.id === edificioId) {
      setEditingEdificioModal(null);
    }
  };

  // Lista oficial de usuarios con roles y credenciales para el portal de acceso
  const [usuariosSistema, setUsuariosSistema] = useState([
    {
      id: 'USR-01',
      nombre: 'Ing. Supervisor Intendencia',
      usuario: 'admin.intendencia',
      clave: '1234',
      email: 'intendencia.cft@pjn.gov.ar',
      rol: 'Administrador',
      estado: 'Activo',
      fechaAlta: '01/02/2026'
    },
    {
      id: 'USR-02',
      nombre: 'Coord. Operativo de Mantenimiento',
      usuario: 'encargado.mantenimiento',
      clave: '1234',
      email: 'mantenimiento.cft@pjn.gov.ar',
      rol: 'Encargado',
      estado: 'Activo',
      fechaAlta: '15/02/2026'
    },
    {
      id: 'USR-03',
      nombre: 'Di Gregori, Ramón',
      usuario: 'ramon.digregori',
      clave: '1234',
      email: 'ramon.digregori@pjn.gov.ar',
      rol: 'Técnico',
      estado: 'Activo',
      fechaAlta: '01/03/2026'
    },
    {
      id: 'USR-04',
      nombre: 'Di Gregori, Gabriel',
      usuario: 'gabriel.digregori',
      clave: '1234',
      email: 'gabriel.digregori@pjn.gov.ar',
      rol: 'Técnico',
      estado: 'Activo',
      fechaAlta: '01/03/2026'
    },
    {
      id: 'USR-05',
      nombre: 'Santiago Gigena',
      usuario: 'santiago.gigena',
      clave: '1234',
      email: 'santiago.gigena@pjn.gov.ar',
      rol: 'Técnico',
      estado: 'Activo',
      fechaAlta: '15/03/2026'
    }
  ]);

  // Modal para dar de alta nuevo usuario en Configuración
  const [isNewUserModalOpen, setIsNewUserModalOpen] = useState(false);
  const [newUserFormData, setNewUserFormData] = useState({
    nombre: '',
    usuario: '',
    clave: '1234',
    email: '',
    rol: 'Técnico'
  });

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setLoginError('');

    const trimmedUser = loginUser.trim().toLowerCase();
    const userFound = usuariosSistema.find(
      u => u.usuario.toLowerCase() === trimmedUser && u.clave === loginPassword
    );

    if (userFound) {
      if (userFound.estado !== 'Activo') {
        setLoginError('El usuario se encuentra inactivo. Comuníquese con Intendencia.');
        return;
      }
      setCurrentUserSession(userFound);
      setIsAuthenticated(true);
      setLoginUser('');
      setLoginPassword('');
    } else {
      setLoginError('Credenciales incorrectas. Verifique el usuario o la contraseña ingresada.');
    }
  };

  const handleQuickLogin = (userObj) => {
    setCurrentUserSession(userObj);
    setIsAuthenticated(true);
    setLoginError('');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUserSession(null);
    setActiveTab('home');
  };

  // El menú general ('home') es ahora la vista por defecto al abrir la app
  const [activeTab, setActiveTab] = useState('home');

  // Estados para colapsar/expandir los 3 grupos principales (Inician minimizados/cerrados por defecto)
  const [mantenimientoGroupOpen, setMantenimientoGroupOpen] = useState(false);
  const [finanzasGroupOpen, setFinanzasGroupOpen] = useState(false);
  const [expedientesGroupOpen, setExpedientesGroupOpen] = useState(false);
  const [homeMaintenanceOpen, setHomeMaintenanceOpen] = useState(false);
  const [homeFinancesOpen, setHomeFinancesOpen] = useState(false);
  const [homeCasesOpen, setHomeCasesOpen] = useState(false);
  const [homeSettingsOpen, setHomeSettingsOpen] = useState(false);
  const [lowStockAlertOpen, setLowStockAlertOpen] = useState(false);

  // Submenú desplegable para Planificación e Inspecciones
  const [planificacionSubOpen, setPlanificacionSubOpen] = useState(true);
  // Submenús para Órdenes de Trabajo y Expedientes
  const [ordenesSubOpen, setOrdenesSubOpen] = useState(true);
  const [ordenesViewMode, setOrdenesViewMode] = useState('list'); // 'resumen' | 'list'
  const [bombasSubOpen, setBombasSubOpen] = useState(true);
  const [bombasViewMode, setBombasViewMode] = useState('tablero'); // 'tablero' | 'equipos'
  const [expedientesSubOpen, setExpedientesSubOpen] = useState(true);
  const [expedientesTab, setExpedientesTab] = useState('administrativos'); // 'administrativos' | 'en-curso'
  
  // NUEVO: Estado para Finanzas e Inventario
  const [finanzasSubOpen, setFinanzasSubOpen] = useState(true);
  const [finanzasViewMode, setFinanzasViewMode] = useState('ingresos-egresos'); // 'ingresos-egresos' | 'inventario' | 'facturacion-servicios' | 'proveedores'

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isNewOrderModal, setIsNewOrderModal] = useState(false);
  const [isOrderEditLocked, setIsOrderEditLocked] = useState(true);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  const [isA3PreviewOpen, setIsA3PreviewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  // Estado para controlar qué elemento se está imprimiendo: 'order' | 'a3' | 'ficha' | null
  const [printTarget, setPrintTarget] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [filterDependencia, setFilterDependencia] = useState('all');
  const [filterRubro, setFilterRubro] = useState('all');

  // --- ESTADOS Y DATOS PARA FINANZAS E INVENTARIO ---
  const [finanzasData, setFinanzasData] = useState([
    {
      id: 'MOV-001',
      fecha: '02/11/2026',
      tipo: 'Ingreso',
      concepto: 'Asignación Presupuestaria Trimestral - Partida Intendencia',
      rubro: 'Partida Presupuestaria',
      monto: '$ 3.500.000',
      comprobante: 'Expte. ADM-1420/2026',
      responsable: 'Intendencia de Cámara',
      observaciones: 'Fondo para mantenimiento correctivo y repuestos edilicios.',
      proveedorNombre: '',
      proveedorTelefono: '',
      proveedorDireccion: '',
      proveedorEmail: '',
      proveedorCuit: ''
    },
    {
      id: 'MOV-002',
      fecha: '03/11/2026',
      tipo: 'Egreso',
      concepto: 'Adquisición de Sellos Mecánicos y Rulemanes SKF para Bombas',
      rubro: 'Bombas y Motores',
      monto: '$ 380.000',
      comprobante: 'Factura B 0004-00012891',
      responsable: 'Di Gregori, Ramón',
      observaciones: 'Repuestos preventivos para Cuadro de Bombas de Elevación.',
      proveedorNombre: 'Hidráulica Tucumán S.R.L.',
      proveedorTelefono: '(0381) 424-8890',
      proveedorDireccion: 'Av. Mate de Luna 2450, San Miguel de Tucumán',
      proveedorEmail: 'ventas@hidraulicatucuman.com.ar',
      proveedorCuit: '30-68912443-8'
    },
    {
      id: 'MOV-003',
      fecha: '04/11/2026',
      tipo: 'Egreso',
      concepto: 'Compra de Tubos LED 18W y Llaves Térmicas Din Sica',
      rubro: 'Electricidad',
      monto: '$ 145.250',
      comprobante: 'Factura B 0001-00034102',
      responsable: 'Di Gregori, Gabriel',
      observaciones: 'Reposición para stock de pañol y oficinas de Secretaría Penal.',
      proveedorNombre: 'Electro Tucumán Mayorista',
      proveedorTelefono: '(0381) 430-1122',
      proveedorDireccion: 'Calle San Martín 840, San Miguel de Tucumán',
      proveedorEmail: 'contacto@electrotucuman.com',
      proveedorCuit: '20-25418902-3'
    },
    {
      id: 'MOV-004',
      fecha: '05/11/2026',
      tipo: 'Ingreso',
      concepto: 'Reintegro Caja Chica de Intendencia - Fondo Rotatorio',
      rubro: 'Caja Chica',
      monto: '$ 250.000',
      comprobante: 'Rendición FF-08/2026',
      responsable: 'Intendencia de Cámara',
      observaciones: 'Reintegro por gastos operativos menores aprobados.',
      proveedorNombre: '',
      proveedorTelefono: '',
      proveedorDireccion: '',
      proveedorEmail: '',
      proveedorCuit: ''
    },
    {
      id: 'MOV-005',
      fecha: '06/11/2026',
      tipo: 'Egreso',
      concepto: 'Service Taller Externo y Bobinado Bomba Cloacal Flygt',
      rubro: 'Reparaciones Mayores',
      monto: '$ 680.000',
      comprobante: 'Factura A 0002-00008431',
      responsable: 'Santiago Gigena',
      observaciones: 'Reparación integral de bobinado de estator por sobretensión.',
      proveedorNombre: 'Taller Electromecánico El Centauro',
      proveedorTelefono: '(0381) 451-9900',
      proveedorDireccion: 'Calle Santiago del Estero 1240, S. M. de Tucumán',
      proveedorEmail: 'centauro.bobinados@gmail.com',
      proveedorCuit: '30-71029415-4'
    }
  ]);

  const [inventarioData, setInventarioData] = useState([
    {
      id: 'ART-001',
      codigo: 'MAT-ELEC-01',
      descripcion: 'Tubo LED 18W T8 Blanco Frío (120 cm)',
      categoria: 'Electricidad',
      ubicacion: 'Pañol Central - Estante A1',
      stockActual: 34,
      stockMinimo: 15,
      costoUnitario: '$ 4.200',
      unidad: 'Un.'
    },
    {
      id: 'ART-002',
      codigo: 'MAT-ELEC-02',
      descripcion: 'Llave Termomagnética Bipolar 2x16A Curva C Sica',
      categoria: 'Electricidad',
      ubicacion: 'Pañol Central - Estante A2',
      stockActual: 8,
      stockMinimo: 10,
      costoUnitario: '$ 9.800',
      unidad: 'Un.'
    },
    {
      id: 'ART-003',
      codigo: 'REP-BOM-01',
      descripcion: 'Sello Mecánico Carburo de Silicio 25mm p/ Motorarg',
      categoria: 'Bombas y Motores',
      ubicacion: 'Subsuelo - Taller Electromecánico',
      stockActual: 3,
      stockMinimo: 4,
      costoUnitario: '$ 42.500',
      unidad: 'Juego'
    },
    {
      id: 'ART-004',
      codigo: 'REP-BOM-02',
      descripcion: 'Rodamiento Blindado SKF 6205-2RS',
      categoria: 'Bombas y Motores',
      ubicacion: 'Subsuelo - Taller Electromecánico',
      stockActual: 6,
      stockMinimo: 4,
      costoUnitario: '$ 16.000',
      unidad: 'Un.'
    },
    {
      id: 'ART-005',
      codigo: 'MAT-SANI-01',
      descripcion: 'Flotante Mecánico de Acero Inoxidable 1 1/4" Tanque',
      categoria: 'Sanitarios',
      ubicacion: 'Pañol Central - Estante B2',
      stockActual: 2,
      stockMinimo: 3,
      costoUnitario: '$ 38.000',
      unidad: 'Un.'
    },
    {
      id: 'ART-006',
      codigo: 'MAT-CERR-01',
      descripcion: 'Cerradura de Embutir Kallay 4000 Seguridad',
      categoria: 'Cerrajería',
      ubicacion: 'Pañol Central - Cajonera C1',
      stockActual: 5,
      stockMinimo: 3,
      costoUnitario: '$ 28.500',
      unidad: 'Un.'
    },
    {
      id: 'ART-007',
      codigo: 'MAT-ALBA-01',
      descripcion: 'Sellador Poliuretánico Sikaflex 1A Cartucho 300ml',
      categoria: 'Albañilería',
      ubicacion: 'Pañol Central - Estante D1',
      stockActual: 1,
      stockMinimo: 5,
      costoUnitario: '$ 18.200',
      unidad: 'Cartucho'
    }
  ]);

  // Modales y filtros para Finanzas e Inventario
  const [isFinanzasModalOpen, setIsFinanzasModalOpen] = useState(false);
  const [finanzasModalMode, setFinanzasModalMode] = useState('Ingreso'); // 'Ingreso' | 'Egreso'
  const [newMovimiento, setNewMovimiento] = useState({
    fecha: new Date().toLocaleDateString('es-AR'),
    tipo: 'Ingreso',
    concepto: '',
    rubro: 'Partida Presupuestaria',
    rubrosSeleccionados: [], // Multi-selección para egresos
    monto: '',
    comprobante: '',
    responsable: 'Intendencia de Cámara',
    observaciones: '',
    proveedorId: '',
    proveedorNombre: '',
    proveedorTelefono: '',
    proveedorDireccion: '',
    proveedorEmail: '',
    proveedorCuit: ''
  });
  const [filterFinanzasTipo, setFilterFinanzasTipo] = useState('all');
  const [filterFinanzasRubro, setFilterFinanzasRubro] = useState('all');
  const [filterFinanzasProveedor, setFilterFinanzasProveedor] = useState('all');
  const [searchFinanzas, setSearchFinanzas] = useState('');
  const [egresoRubroError, setEgresoRubroError] = useState(false);

  // --- NUEVO: ESTADO Y REGISTRO OFICIAL DE PROVEEDORES ---
  const [proveedoresCategorias] = useState([
    'Empresas conservadoras de Aire Acondicionado',
    'Conservadora de ascensor',
    'Servicio de desratizacion y desinfeccion',
    'Empresas de limpieza',
    'Proveedores de bienes e insumos'
  ]);

  const [proveedoresData, setProveedoresData] = useState([
    {
      id: 'PROV-001',
      nombre: 'ClimaTuc Ingeniería Térmica S.R.L.',
      categoria: 'Empresas conservadoras de Aire Acondicionado',
      cuit: '30-71458921-9',
      contacto: 'Ing. Marcelo Gómez',
      telefono: '(0381) 430-5544 / (381) 154-129845',
      email: 'mantenimiento@climatuc.com.ar',
      direccion: 'Av. Sarmiento 830, San Miguel de Tucumán',
      estado: 'Activo',
      expteContrato: 'Expte. ADM-0890/2025 (VRF y Chillers)',
      observaciones: 'Mantenimiento mensual preventivo de sistemas VRF en Sede Central Las Piedras y Juzgados.'
    },
    {
      id: 'PROV-002',
      nombre: 'Ascensores del Norte S.A. (Otis / Servitron)',
      categoria: 'Conservadora de ascensor',
      cuit: '30-65981240-3',
      contacto: 'Sr. Roberto Santillán',
      telefono: '(0381) 422-9900 (Guardia 24 hs: 0800-444-2723)',
      email: 'guardia@ascensoresdelnorte.com.ar',
      direccion: 'Calle San Martín 1150, San Miguel de Tucumán',
      estado: 'Activo',
      expteContrato: 'Licitación Pública N° 04/2025 - Libro N° 12',
      observaciones: 'Conservación reglamentaria mensual con rúbrica de Libro de Inspección de Ascensores.'
    },
    {
      id: 'PROV-003',
      nombre: 'BioControl Ambiental & Plagas',
      categoria: 'Servicio de desratizacion y desinfeccion',
      cuit: '30-71120349-8',
      contacto: 'Lic. Claudia Herrera',
      telefono: '(0381) 450-8812 / (381) 155-709123',
      email: 'operaciones@biocontroltuc.com.ar',
      direccion: 'Calle Laprida 420, San Miguel de Tucumán',
      estado: 'Activo',
      expteContrato: 'Expte. ADM-1120/2026',
      observaciones: 'Fumigación nocturna y reposición de cebaderas en subsuelos, archivos y cámaras sépticas.'
    },
    {
      id: 'PROV-004',
      nombre: 'Limpieza Integral del Tucumán S.R.L.',
      categoria: 'Empresas de limpieza',
      cuit: '30-68994512-5',
      contacto: 'Sra. Patricia Mansilla',
      telefono: '(0381) 431-7788',
      email: 'contacto@limpiezaintegral.com.ar',
      direccion: 'Av. Belgrano 2150, San Miguel de Tucumán',
      estado: 'Activo',
      expteContrato: 'Contratación Directa N° 09/2026',
      observaciones: 'Servicio de maestranza diaria, sanitización de baterías de baños y vidrios de fachada.'
    },
    {
      id: 'PROV-005',
      nombre: 'Hidráulica Tucumán S.R.L.',
      categoria: 'Proveedores de bienes e insumos',
      cuit: '30-68912443-8',
      contacto: 'Sr. Carlos Benítez',
      telefono: '(0381) 424-8890',
      email: 'ventas@hidraulicatucuman.com.ar',
      direccion: 'Av. Mate de Luna 2450, San Miguel de Tucumán',
      estado: 'Activo',
      expteContrato: 'Proveedor Frecuente Pañol',
      observaciones: 'Provisión de rodamientos SKF, sellos mecánicos, flotantes y válvulas esféricas de bronce.'
    },
    {
      id: 'PROV-006',
      nombre: 'Electro Tucumán Mayorista',
      categoria: 'Proveedores de bienes e insumos',
      cuit: '20-25418902-3',
      contacto: 'Lucas Domínguez',
      telefono: '(0381) 430-1122',
      email: 'contacto@electrotucuman.com',
      direccion: 'Calle San Martín 840, San Miguel de Tucumán',
      estado: 'Activo',
      expteContrato: 'Orden de Compra Periódica',
      observaciones: 'Tubos LED, disyuntores bipolares, cables normalizados IRAM y térmicas Sica.'
    }
  ]);

  const [etiquetasServicios, setEtiquetasServicios] = useState([
    'Climatización HVAC',
    'Ascensores',
    'Limpieza',
    'Control de plagas',
    'Mantenimiento electromecánico',
    'Otros servicios contratados'
  ]);
  const [facturasServicios, setFacturasServicios] = useState([]);
  const [facturaServicioForm, setFacturaServicioForm] = useState({
    proveedorId: '',
    etiquetaServicio: 'Climatización HVAC',
    numeroFactura: '',
    fecha: new Date().toISOString().slice(0, 10),
    periodo: '',
    monto: '',
    observaciones: ''
  });
  const [isServiceInvoiceFormOpen, setIsServiceInvoiceFormOpen] = useState(false);
  const [isServiceLabelManagerOpen, setIsServiceLabelManagerOpen] = useState(false);
  const [newServiceLabel, setNewServiceLabel] = useState('');
  const [filterFacturaServicio, setFilterFacturaServicio] = useState('all');
  const [filterFacturaProveedor, setFilterFacturaProveedor] = useState('all');
  const [searchFacturacion, setSearchFacturacion] = useState('');

  const [filterProveedorCategoria, setFilterProveedorCategoria] = useState('all');
  const [searchProveedor, setSearchProveedor] = useState('');
  const [isProveedorModalOpen, setIsProveedorModalOpen] = useState(false);
  const [editingProveedor, setEditingProveedor] = useState(null);
  const [isNewProveedor, setIsNewProveedor] = useState(false);

  const handleOpenNewProveedor = () => {
    const nextNum = (proveedoresData.length + 1).toString().padStart(3, '0');
    setEditingProveedor({
      id: `PROV-${nextNum}`,
      nombre: '',
      categoria: 'Empresas conservadoras de Aire Acondicionado',
      cuit: '',
      contacto: '',
      telefono: '',
      email: '',
      direccion: '',
      estado: 'Activo',
      expteContrato: '',
      observaciones: ''
    });
    setIsNewProveedor(true);
    setIsProveedorModalOpen(true);
  };

  const handleOpenEditProveedor = (prov) => {
    setEditingProveedor({ ...prov });
    setIsNewProveedor(false);
    setIsProveedorModalOpen(true);
  };

  const handleSaveProveedor = () => {
    if (!editingProveedor.nombre.trim()) {
      alert('Por favor ingrese el nombre o razón social del proveedor.');
      return;
    }

    if (isNewProveedor) {
      setProveedoresData(prev => [editingProveedor, ...prev]);
    } else {
      setProveedoresData(prev => prev.map(p => p.id === editingProveedor.id ? editingProveedor : p));
    }

    setIsProveedorModalOpen(false);
    setEditingProveedor(null);
  };

  const handleDeleteProveedor = (provId) => {
    if (proveedoresData.length <= 1) {
      alert('Debe permanecer al menos un proveedor registrado.');
      return;
    }
    setProveedoresData(prev => prev.filter(p => p.id !== provId));
    if (editingProveedor?.id === provId) {
      setIsProveedorModalOpen(false);
      setEditingProveedor(null);
    }
  };

  const handleOpenServiceInvoiceForm = (providerId = '') => {
    setFacturaServicioForm({
      proveedorId: providerId,
      etiquetaServicio: etiquetasServicios[0] || '',
      numeroFactura: '',
      fecha: new Date().toISOString().slice(0, 10),
      periodo: '',
      monto: '',
      observaciones: ''
    });
    setIsServiceInvoiceFormOpen(true);
  };

  const handleSaveServiceInvoice = () => {
    const proveedor = proveedoresData.find(item => item.id === facturaServicioForm.proveedorId);
    const montoNumerico = parseMoneda(facturaServicioForm.monto);

    if (!proveedor || !facturaServicioForm.etiquetaServicio || !facturaServicioForm.numeroFactura.trim() || !facturaServicioForm.fecha || montoNumerico <= 0) {
      alert('Complete proveedor, rubro de servicio, número de factura, fecha y un monto mayor a cero.');
      return;
    }

    const facturaId = `FSC-${(facturasServicios.length + 1).toString().padStart(3, '0')}`;
    const movimientoId = `MOV-${(finanzasData.length + 1).toString().padStart(3, '0')}`;
    const fecha = new Date(`${facturaServicioForm.fecha}T12:00:00`).toLocaleDateString('es-AR');
    const monto = formatMonedaPesos(montoNumerico);
    const factura = {
      id: facturaId,
      proveedorId: proveedor.id,
      proveedorNombre: proveedor.nombre,
      proveedorCuit: proveedor.cuit,
      etiquetaServicio: facturaServicioForm.etiquetaServicio,
      numeroFactura: facturaServicioForm.numeroFactura.trim(),
      fecha,
      periodo: facturaServicioForm.periodo.trim(),
      monto,
      estado: 'Pendiente',
      observaciones: facturaServicioForm.observaciones.trim()
    };

    setFacturasServicios(prev => [factura, ...prev]);
    setFinanzasData(prev => [{
      id: movimientoId,
      fecha,
      tipo: 'Egreso',
      concepto: `Factura ${factura.numeroFactura} — ${factura.etiquetaServicio}`,
      rubro: 'Servicios Contratados',
      monto,
      comprobante: factura.numeroFactura,
      responsable: currentUserSession?.nombre || 'Intendencia de Cámara',
      observaciones: factura.observaciones || `Período facturado: ${factura.periodo || 'No especificado'}`,
      proveedorId: proveedor.id,
      proveedorNombre: proveedor.nombre,
      proveedorTelefono: proveedor.telefono,
      proveedorDireccion: proveedor.direccion,
      proveedorEmail: proveedor.email,
      proveedorCuit: proveedor.cuit,
      facturaServicioId: factura.id
    }, ...prev]);

    setIsServiceInvoiceFormOpen(false);
  };

  const handleAddServiceLabel = () => {
    const label = newServiceLabel.trim();
    if (!label) return;
    if (etiquetasServicios.some(item => item.toLowerCase() === label.toLowerCase())) {
      alert('Esa etiqueta de servicio ya está registrada.');
      return;
    }
    setEtiquetasServicios(prev => [...prev, label]);
    setFacturaServicioForm(prev => ({ ...prev, etiquetaServicio: prev.etiquetaServicio || label }));
    setNewServiceLabel('');
  };

  const handleRemoveServiceLabel = (label) => {
    if (facturasServicios.some(factura => factura.etiquetaServicio === label)) {
      alert('No se puede quitar una etiqueta que ya tiene facturas registradas.');
      return;
    }
    setEtiquetasServicios(prev => prev.filter(item => item !== label));
    if (facturaServicioForm.etiquetaServicio === label) {
      setFacturaServicioForm(prev => ({ ...prev, etiquetaServicio: etiquetasServicios.find(item => item !== label) || '' }));
    }
  };

  // NUEVO: Categorías dinámicas de inventario editables y persistentes en sesión
  const [inventarioCategorias, setInventarioCategorias] = useState([
    'Electricidad',
    'Bombas y Motores',
    'Sanitarios',
    'Cerrajería',
    'Albañilería',
    'Pintura',
    'Herramientas'
  ]);
  const [isAddingNewCategoria, setIsAddingNewCategoria] = useState(false);
  const [newCategoriaNombre, setNewCategoriaNombre] = useState('');
  const [isManagingCategorias, setIsManagingCategorias] = useState(false);

  const [isInventarioModalOpen, setIsInventarioModalOpen] = useState(false);
  // NUEVO: Modo de incorporación: 'reposicion' | 'nuevo'
  const [inventarioModalMode, setInventarioModalMode] = useState('reposicion');
  // NUEVO: Estado para reposición de artículo existente con búsqueda y filtro por rubro
  const [reposicionData, setReposicionData] = useState({
    articuloId: '',
    cantidadSumar: 0,
    nuevoCostoUnitario: '',
    comprobanteEgresoId: '',
    comprobanteRef: '',
    filtroRubro: 'all',
    busquedaTexto: ''
  });
  const [newArticulo, setNewArticulo] = useState({
    codigo: '',
    descripcion: '',
    categoria: 'Electricidad',
    ubicacion: 'Pañol Central - Estante A1',
    stockActual: 10,
    stockMinimo: 5,
    costoUnitario: '',
    unidad: 'Un.',
    comprobanteEgresoId: '',
    comprobanteRef: ''
  });
  const [filterInventarioCategoria, setFilterInventarioCategoria] = useState('all');
  const [searchInventario, setSearchInventario] = useState('');

  const handleCrearCategoria = () => {
    const trimmed = newCategoriaNombre.trim();
    if (!trimmed) return;
    if (inventarioCategorias.some(c => c.toLowerCase() === trimmed.toLowerCase())) {
      alert('Esta categoría ya se encuentra registrada.');
      return;
    }
    const updated = [...inventarioCategorias, trimmed];
    setInventarioCategorias(updated);
    setNewArticulo(prev => ({ ...prev, categoria: trimmed }));
    setNewCategoriaNombre('');
    setIsAddingNewCategoria(false);
  };

  const handleEliminarCategoria = (catAEliminar) => {
    if (inventarioCategorias.length <= 1) {
      alert('Debe existir al menos una categoría en el inventario.');
      return;
    }
    const updated = inventarioCategorias.filter(c => c !== catAEliminar);
    setInventarioCategorias(updated);
    if (newArticulo.categoria === catAEliminar) {
      setNewArticulo(prev => ({ ...prev, categoria: updated[0] }));
    }
  };

  // NUEVO: Estado para el selector modal de materiales desde Inventario/Pañol hacia la OT
  const [isInventoryPickerOpen, setIsInventoryPickerOpen] = useState(false);
  const [inventoryPickerSearch, setInventoryPickerSearch] = useState('');
  const [inventoryPickerCategory, setInventoryPickerCategory] = useState('all');
  const [pickerQuantities, setPickerQuantities] = useState({});
  // NUEVO: Canasta/Resumen temporal de insumos seleccionados en la sesión del modal
  const [stagedInventoryItems, setStagedInventoryItems] = useState([]);
  // NUEVO: Diálogo de confirmación para incorporar insumos a la OT
  const [showConfirmInventoryDialog, setShowConfirmInventoryDialog] = useState(false);

  const handleOpenInventoryPicker = () => {
    setInventoryPickerSearch('');
    setInventoryPickerCategory('all');
    setPickerQuantities({});
    setStagedInventoryItems([]);
    setShowConfirmInventoryDialog(false);
    setIsInventoryPickerOpen(true);
  };

  const handleSelectFromInventory = (art, qty) => {
    // Calcular el stock que ya está comprometido en el resumen superior
    const alreadyStaged = stagedInventoryItems.find(item => item.inventarioId === art.id);
    const stagedCount = alreadyStaged ? alreadyStaged.cantidad : 0;
    const remainingStock = Math.max(0, (art.stockActual || 0) - stagedCount);

    if (remainingStock <= 0) {
      return;
    }

    const requestedQty = Math.max(1, qty || 1);
    const selectedQty = Math.min(requestedQty, remainingStock);

    setStagedInventoryItems(prev => {
      const existingIndex = prev.findIndex(item => item.inventarioId === art.id);
      if (existingIndex >= 0) {
        // Actualizar la cantidad respetando el tope de stock total del inventario
        const updated = [...prev];
        const newQty = Math.min(art.stockActual, updated[existingIndex].cantidad + selectedQty);
        updated[existingIndex] = {
          ...updated[existingIndex],
          cantidad: newQty
        };
        return updated;
      } else {
        return [
          ...prev,
          {
            id: Date.now() + Math.random(),
            cantidad: selectedQty,
            unidad: art.unidad || 'Un.',
            descripcion: `[${art.codigo}] ${art.descripcion}`,
            codigo: art.codigo,
            nombreSolo: art.descripcion,
            devolucion: false,
            inventarioId: art.id,
            maxStock: art.stockActual || 0
          }
        ];
      }
    });

    // Resetear el selector de cantidad del catálogo inferior a 1 inmediatamente
    setPickerQuantities(prev => ({
      ...prev,
      [art.id]: 1
    }));
  };

  const handleRemoveStagedItem = (id) => {
    setStagedInventoryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdateStagedQty = (id, newQty, maxStock) => {
    const clamped = Math.max(1, Math.min(maxStock, newQty));
    setStagedInventoryItems(prev => prev.map(item => item.id === id ? { ...item, cantidad: clamped } : item));
  };

  const handleConfirmExitInventoryPicker = () => {
    if (stagedInventoryItems.length > 0) {
      setShowConfirmInventoryDialog(true);
    } else {
      setIsInventoryPickerOpen(false);
    }
  };

  const handleProceedAddingToOT = () => {
    // Incorporar los materiales de la canasta al formulario de la OT
    setFormData(prev => ({
      ...prev,
      materiales: [...prev.materiales, ...stagedInventoryItems.map(item => ({
        id: item.id,
        cantidad: item.cantidad,
        unidad: item.unidad,
        descripcion: item.descripcion,
        devolucion: item.devolucion,
        inventarioId: item.inventarioId
      }))]
    }));
    setShowConfirmInventoryDialog(false);
    setIsInventoryPickerOpen(false);
    setStagedInventoryItems([]);
  };

  // Manejo de Movimientos de Finanzas
  const handleOpenIngresoModal = () => {
    setFinanzasModalMode('Ingreso');
    setEgresoRubroError(false);
    setNewMovimiento({
      fecha: new Date().toLocaleDateString('es-AR'),
      tipo: 'Ingreso',
      concepto: '',
      rubro: 'Partida Presupuestaria',
      rubrosSeleccionados: ['Partida Presupuestaria'],
      monto: '',
      comprobante: '',
      responsable: 'Intendencia de Cámara',
      observaciones: '',
      proveedorId: '',
      proveedorNombre: '',
      proveedorTelefono: '',
      proveedorDireccion: '',
      proveedorEmail: '',
      proveedorCuit: ''
    });
    setIsFinanzasModalOpen(true);
  };

  const handleOpenEgresoModal = () => {
    setFinanzasModalMode('Egreso');
    setEgresoRubroError(false);
    setNewMovimiento({
      fecha: new Date().toLocaleDateString('es-AR'),
      tipo: 'Egreso',
      concepto: '',
      rubro: '',
      rubrosSeleccionados: [], // Inicia vacío en "Seleccionar"
      monto: '',
      comprobante: 'Factura Nº ',
      responsable: currentUserSession?.nombre || 'Intendencia de Cámara',
      observaciones: '',
      proveedorId: '',
      proveedorNombre: '',
      proveedorTelefono: '',
      proveedorDireccion: '',
      proveedorEmail: '',
      proveedorCuit: ''
    });
    setIsFinanzasModalOpen(true);
  };

  const handleToggleEgresoRubro = (rubroName) => {
    setEgresoRubroError(false);
    setNewMovimiento(prev => {
      const current = prev.rubrosSeleccionados || [];
      const exists = current.includes(rubroName);
      const updated = exists ? current.filter(r => r !== rubroName) : [...current, rubroName];
      return {
        ...prev,
        rubrosSeleccionados: updated,
        rubro: updated.join(', ')
      };
    });
  };

  const handleSaveMovimiento = () => {
    if (finanzasModalMode === 'Egreso') {
      if (!newMovimiento.rubrosSeleccionados || newMovimiento.rubrosSeleccionados.length === 0) {
        setEgresoRubroError(true);
        alert('Debe seleccionar al menos un Rubro de Imputación obligatorio.');
        return;
      }
    }

    if (!newMovimiento.concepto.trim() || !newMovimiento.monto.trim()) {
      alert('Por favor complete el concepto y el monto del movimiento.');
      return;
    }
    const formattedMonto = newMovimiento.monto.startsWith('$') ? newMovimiento.monto : `$ ${newMovimiento.monto}`;
    const newId = `MOV-${(finanzasData.length + 1).toString().padStart(3, '0')}`;
    const finalRubro = finanzasModalMode === 'Egreso' 
      ? (newMovimiento.rubrosSeleccionados.join(', ') || 'Sin Rubro')
      : newMovimiento.rubro;

    const item = {
      ...newMovimiento,
      tipo: finanzasModalMode,
      id: newId,
      rubro: finalRubro,
      monto: formattedMonto
    };
    setFinanzasData([item, ...finanzasData]);
    setIsFinanzasModalOpen(false);
  };

  // Manejo de Inventario
  const handleSaveArticulo = () => {
    if (inventarioModalMode === 'reposicion') {
      if (!reposicionData.articuloId) {
        alert('Por favor seleccione un artículo para reponer stock.');
        return;
      }
      const qtySumar = Math.max(0, parseInt(reposicionData.cantidadSumar, 10) || 0);
      if (qtySumar <= 0) {
        alert('Por favor ingrese una cantidad mayor a 0 para reponer.');
        return;
      }
      
      setInventarioData(prev => prev.map(art => {
        if (art.id === reposicionData.articuloId) {
          const formattedCosto = reposicionData.nuevoCostoUnitario.trim()
            ? (reposicionData.nuevoCostoUnitario.startsWith('$') ? reposicionData.nuevoCostoUnitario : `$ ${reposicionData.nuevoCostoUnitario}`)
            : art.costoUnitario;
          return {
            ...art,
            stockActual: art.stockActual + qtySumar,
            costoUnitario: formattedCosto,
            comprobanteRef: reposicionData.comprobanteRef ? reposicionData.comprobanteRef : art.comprobanteRef
          };
        }
        return art;
      }));

      setIsInventarioModalOpen(false);
      setReposicionData({
        articuloId: '',
        cantidadSumar: 0,
        nuevoCostoUnitario: '',
        comprobanteEgresoId: '',
        comprobanteRef: '',
        filtroRubro: 'all',
        busquedaTexto: ''
      });
      return;
    }

    if (!newArticulo.descripcion.trim()) {
      alert('Por favor complete la descripción del artículo.');
      return;
    }
    const newId = `ART-${(inventarioData.length + 1).toString().padStart(3, '0')}`;
    const autoCodigo = newArticulo.codigo.trim() || `MAT-${newArticulo.categoria.substring(0, 4).toUpperCase()}-${(inventarioData.length + 1).toString().padStart(2, '0')}`;
    const formattedCosto = newArticulo.costoUnitario.trim()
      ? (newArticulo.costoUnitario.startsWith('$') ? newArticulo.costoUnitario : `$ ${newArticulo.costoUnitario}`)
      : '$ 0';
    
    const item = {
      ...newArticulo,
      id: newId,
      codigo: autoCodigo,
      costoUnitario: formattedCosto
    };
    setInventarioData([item, ...inventarioData]);
    setIsInventarioModalOpen(false);
    setNewArticulo({
      codigo: '',
      descripcion: '',
      categoria: 'Electricidad',
      ubicacion: 'Pañol Central - Estante A1',
      stockActual: 10,
      stockMinimo: 5,
      costoUnitario: '',
      unidad: 'Un.',
      comprobanteEgresoId: '',
      comprobanteRef: ''
    });
  };

  const handleAdjustStock = (artId, delta) => {
    setInventarioData(prev => prev.map(art => {
      if (art.id === artId) {
        const nextStock = Math.max(0, art.stockActual + delta);
        return { ...art, stockActual: nextStock };
      }
      return art;
    }));
  };

  // Estado del Sistema de Bombas Electromecánicas (2 Bombas fijas por cada uno de los 5 Cuadros Oficiales = 10 Equipos)
  const [bombasData, setBombasData] = useState([
    // 1. CUADRO DE BOMBAS DE ELEVACIÓN DE AGUA
    {
      id: 'BOM-01',
      tagFisico: 'CFT-BOM-ELEV-01',
      nombre: 'Bomba de Elevación N° 1 (Principal)',
      cuadro: 'CUADRO DE BOMBAS DE ELEVACION DE AGUA',
      posicionSlot: 1,
      sistema: 'Agua Potable (Cisterna a Tanque de Reserva)',
      ubicacion: '2° Subsuelo - Sala de Bombas Central',
      posicionInstalacion: 'CUADRO DE BOMBAS DE ELEVACION DE AGUA - POSICIÓN 01',
      marca: 'Motorarg',
      modelo: 'BC-300 Trifásica',
      potencia: '5.5 HP / 4.1 kW',
      caudal: '24 m³/h (400 L/min)',
      alturaManometrica: '42 mca',
      rpm: '2900 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '3.8 bar',
      consumoAmperios: '6.4 A',
      voltaje: '380 V (Trifásico)',
      horasUso: 1420,
      diasUso: 14,
      alternancia: 'BOMBA EN USO',
      ultimaInspeccion: '28/10/2026',
      tecnicoResponsable: 'Di Gregori, Ramón',
      observaciones: 'Presión constante, sin fugas en empaquetaduras ni ruidos anómalos de rodamientos.',
      reparaciones: [
        { id: 1, fecha: '14/04/2026', tipo: 'Cambio de Sello Mecánico y Rodamientos', tecnico: 'Di Gregori, Ramón', costo: '$ 85.000', detalle: 'Se reemplazó sello de carburo de silicio y rodamientos SKF delanteros y traseros por desgaste preventivo.' }
      ]
    },
    {
      id: 'BOM-02',
      tagFisico: 'CFT-BOM-ELEV-02',
      nombre: 'Bomba de Elevación N° 2 (Respaldo)',
      cuadro: 'CUADRO DE BOMBAS DE ELEVACION DE AGUA',
      posicionSlot: 2,
      sistema: 'Agua Potable (Cisterna a Tanque de Reserva)',
      ubicacion: '2° Subsuelo - Sala de Bombas Central',
      posicionInstalacion: 'CUADRO DE BOMBAS DE ELEVACION DE AGUA - POSICIÓN 02',
      marca: 'Motorarg',
      modelo: 'BC-300 Trifásica',
      potencia: '5.5 HP / 4.1 kW',
      caudal: '24 m³/h (400 L/min)',
      alturaManometrica: '42 mca',
      rpm: '2900 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '3.7 bar',
      consumoAmperios: '6.2 A',
      voltaje: '380 V (Trifásico)',
      horasUso: 1395,
      diasUso: 0,
      alternancia: 'BOMBA EN RESERVA',
      ultimaInspeccion: '28/10/2026',
      tecnicoResponsable: 'Di Gregori, Gabriel',
      observaciones: 'Prueba de arranque mensual conforme. Listo para conmutar.',
      reparaciones: []
    },

    // 2. CUADRO DE BOMBAS CLOACALES
    {
      id: 'BOM-03',
      tagFisico: 'CFT-BOM-CLOAC-01',
      nombre: 'Bomba Cloacal N° 1 (Trituradora Principal)',
      cuadro: 'CUADRO DE BOMBAS CLOACALES',
      posicionSlot: 1,
      sistema: 'Evacuación de Efluentes y Pozo de Bombeo Séptico',
      ubicacion: 'Cámara Séptica - Subsuelo Posterior',
      posicionInstalacion: 'CUADRO DE BOMBAS CLOACALES - POSICIÓN 01',
      marca: 'Flygt / Xylem',
      modelo: 'DXG 25-11',
      potencia: '3.0 HP / 2.2 kW',
      caudal: '18 m³/h',
      alturaManometrica: '16 mca',
      rpm: '2850 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.2 bar',
      consumoAmperios: '5.1 A',
      voltaje: '380 V (Trifásico)',
      horasUso: 1110,
      diasUso: 21,
      alternancia: 'BOMBA EN USO',
      ultimaInspeccion: '05/11/2026',
      tecnicoResponsable: 'Di Gregori, Gabriel',
      observaciones: 'Cuchillas trituradoras calibradas y flotante de nivel operativo.',
      reparaciones: []
    },
    {
      id: 'BOM-04',
      tagFisico: 'CFT-BOM-CLOAC-02',
      nombre: 'Bomba Cloacal N° 2 (Respaldo)',
      cuadro: 'CUADRO DE BOMBAS CLOACALES',
      posicionSlot: 2,
      sistema: 'Evacuación de Efluentes y Pozo de Bombeo Séptico',
      ubicacion: 'Cámara Séptica - Subsuelo Posterior',
      posicionInstalacion: 'CUADRO DE BOMBAS CLOACALES - POSICIÓN 02',
      marca: 'Flygt / Xylem',
      modelo: 'DXG 25-11',
      potencia: '3.0 HP / 2.2 kW',
      caudal: '18 m³/h',
      alturaManometrica: '16 mca',
      rpm: '2850 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.2 bar',
      consumoAmperios: '5.0 A',
      voltaje: '380 V (Trifásico)',
      horasUso: 980,
      diasUso: 0,
      alternancia: 'BOMBA EN RESERVA',
      ultimaInspeccion: '05/11/2026',
      tecnicoResponsable: 'Di Gregori, Gabriel',
      observaciones: 'En stand-by lista para arranque por alto nivel.',
      reparaciones: []
    },

    // 3. POZO DE DEPRESIÓN DE NAPAS N° 1
    {
      id: 'BOM-05',
      tagFisico: 'CFT-BOM-NAPA1-A',
      nombre: 'Bomba Pozo Depresión Napa N° 1 (Equipo A)',
      cuadro: 'POZO DE DEPRESIÓN DE NAPAS N° 1',
      posicionSlot: 1,
      sistema: 'Drenaje Freático y Abatimiento Pozo Central Este',
      ubicacion: '2° Subsuelo - Depósito y Archivo General',
      posicionInstalacion: 'POZO DE DEPRESIÓN DE NAPAS N° 1 - POSICIÓN 01',
      marca: 'Grundfos',
      modelo: 'Unilift AP50B',
      potencia: '2.0 HP / 1.5 kW',
      caudal: '16 m³/h',
      alturaManometrica: '14 mca',
      rpm: '2800 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.4 bar',
      consumoAmperios: '4.6 A',
      voltaje: '220 V (Monofásico)',
      horasUso: 820,
      diasUso: 7,
      alternancia: 'BOMBA EN USO',
      ultimaInspeccion: '03/11/2026',
      tecnicoResponsable: 'Di Gregori, Ramón',
      observaciones: 'Nivel freático deprimido a cota de seguridad sin anegamientos.',
      reparaciones: []
    },
    {
      id: 'BOM-06',
      tagFisico: 'CFT-BOM-NAPA1-B',
      nombre: 'Bomba Pozo Depresión Napa N° 1 (Equipo B)',
      cuadro: 'POZO DE DEPRESIÓN DE NAPAS N° 1',
      posicionSlot: 2,
      sistema: 'Drenaje Freático y Abatimiento Pozo Central Este',
      ubicacion: '2° Subsuelo - Depósito y Archivo General',
      posicionInstalacion: 'POZO DE DEPRESIÓN DE NAPAS N° 1 - POSICIÓN 02',
      marca: 'Grundfos',
      modelo: 'Unilift AP50B',
      potencia: '2.0 HP / 1.5 kW',
      caudal: '16 m³/h',
      alturaManometrica: '14 mca',
      rpm: '2800 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.4 bar',
      consumoAmperios: '4.5 A',
      voltaje: '220 V (Monofásico)',
      horasUso: 780,
      diasUso: 0,
      alternancia: 'BOMBA EN RESERVA',
      ultimaInspeccion: '03/11/2026',
      tecnicoResponsable: 'Di Gregori, Ramón',
      observaciones: 'Equipo en reposo listo para conmutar ciclo.',
      reparaciones: []
    },

    // 4. POZO DE DEPRESIÓN DE NAPAS N° 2
    {
      id: 'BOM-07',
      tagFisico: 'CFT-BOM-NAPA2-A',
      nombre: 'Bomba Pozo Depresión Napa N° 2 (Equipo A)',
      cuadro: 'POZO DE DEPRESIÓN DE NAPAS N° 2',
      posicionSlot: 1,
      sistema: 'Drenaje Freático y Achique Subsuelo Oeste',
      ubicacion: 'Foso 2° Subsuelo - Sector Rampa Cochera',
      posicionInstalacion: 'POZO DE DEPRESIÓN DE NAPAS N° 2 - POSICIÓN 01',
      marca: 'Grundfos',
      modelo: 'Unilift AP50B',
      potencia: '2.0 HP / 1.5 kW',
      caudal: '16 m³/h',
      alturaManometrica: '14 mca',
      rpm: '2800 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.5 bar',
      consumoAmperios: '4.8 A',
      voltaje: '220 V (Monofásico)',
      horasUso: 910,
      diasUso: 11,
      alternancia: 'BOMBA EN USO',
      ultimaInspeccion: '03/11/2026',
      tecnicoResponsable: 'Di Gregori, Ramón',
      observaciones: 'Flotantes regulados a cota de arranque automático.',
      reparaciones: []
    },
    {
      id: 'BOM-08',
      tagFisico: 'CFT-BOM-NAPA2-B',
      nombre: 'Bomba Pozo Depresión Napa N° 2 (Equipo B)',
      cuadro: 'POZO DE DEPRESIÓN DE NAPAS N° 2',
      posicionSlot: 2,
      sistema: 'Drenaje Freático y Achique Subsuelo Oeste',
      ubicacion: 'Foso 2° Subsuelo - Sector Rampa Cochera',
      posicionInstalacion: 'POZO DE DEPRESIÓN DE NAPAS N° 2 - POSICIÓN 02',
      marca: 'Grundfos',
      modelo: 'Unilift AP50B',
      potencia: '2.0 HP / 1.5 kW',
      caudal: '16 m³/h',
      alturaManometrica: '14 mca',
      rpm: '2800 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.5 bar',
      consumoAmperios: '4.7 A',
      voltaje: '220 V (Monofásico)',
      horasUso: 860,
      diasUso: 0,
      alternancia: 'BOMBA EN RESERVA',
      ultimaInspeccion: '03/11/2026',
      tecnicoResponsable: 'Di Gregori, Ramón',
      observaciones: 'Válvula esférica y retención estancas.',
      reparaciones: []
    },

    // 5. POZO DE DEPRESIÓN DE NAPAS N° 3
    {
      id: 'BOM-09',
      tagFisico: 'CFT-BOM-NAPA3-A',
      nombre: 'Bomba Pozo Depresión Napa N° 3 (Equipo A)',
      cuadro: 'POZO DE DEPRESIÓN DE NAPAS N° 3',
      posicionSlot: 1,
      sistema: 'Drenaje Freático y Alivio Trinchera Subterránea',
      ubicacion: 'Trinchera y Ductos Subterráneos',
      posicionInstalacion: 'POZO DE DEPRESIÓN DE NAPAS N° 3 - POSICIÓN 01',
      marca: 'Rotor Pump',
      modelo: 'Drainage 100',
      potencia: '1.5 HP / 1.1 kW',
      caudal: '14 m³/h',
      alturaManometrica: '12 mca',
      rpm: '2850 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.3 bar',
      consumoAmperios: '4.1 A',
      voltaje: '220 V (Monofásico)',
      horasUso: 640,
      diasUso: 5,
      alternancia: 'BOMBA EN USO',
      ultimaInspeccion: '01/11/2026',
      tecnicoResponsable: 'Di Gregori, Gabriel',
      observaciones: 'Ducto limpio y libre paso hidráulico verificado.',
      reparaciones: []
    },
    {
      id: 'BOM-10',
      tagFisico: 'CFT-BOM-NAPA3-B',
      nombre: 'Bomba Pozo Depresión Napa N° 3 (Equipo B)',
      cuadro: 'POZO DE DEPRESIÓN DE NAPAS N° 3',
      posicionSlot: 2,
      sistema: 'Drenaje Freático y Alivio Trinchera Subterránea',
      ubicacion: 'Trinchera y Ductos Subterráneos',
      posicionInstalacion: 'POZO DE DEPRESIÓN DE NAPAS N° 3 - POSICIÓN 02',
      marca: 'Rotor Pump',
      modelo: 'Drainage 100',
      potencia: '1.5 HP / 1.1 kW',
      caudal: '14 m³/h',
      alturaManometrica: '12 mca',
      rpm: '2850 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.3 bar',
      consumoAmperios: '4.0 A',
      voltaje: '220 V (Monofásico)',
      horasUso: 590,
      diasUso: 0,
      alternancia: 'BOMBA EN RESERVA',
      ultimaInspeccion: '01/11/2026',
      tecnicoResponsable: 'Di Gregori, Gabriel',
      observaciones: 'Boya y cable sumergible verificados.',
      reparaciones: []
    }
  ]);

  // Lista editable de los 5 cuadros operativos del edificio judicial
  const [cuadrosData, setCuadrosData] = useState([
    { 
      id: 'elevacion',
      nombre: 'CUADRO DE BOMBAS DE ELEVACION DE AGUA', 
      desc: 'Agua Potable - Cisterna a Tanques de Reserva Superiores con alternancia programada',
      pos1Label: 'POSICIÓN 01',
      pos2Label: 'POSICIÓN 02',
      tableroInfo: 'Guardamotores Schneider 6-10A, contactores TeSys y alternador electrónico.',
      mantenimientos: [
        { id: 1, fecha: '15/10/2026', tarea: 'Revisión y torque de borneras de potencia y control', tecnico: 'Di Gregori, Ramón', observaciones: 'Contactores en óptimo estado. Calibración de térmicas conforme.' }
      ]
    },
    { 
      id: 'cloacal',
      nombre: 'CUADRO DE BOMBAS CLOACALES', 
      desc: 'Evacuación de efluentes y pozo séptico con trituradora y respaldo',
      pos1Label: 'POSICIÓN 01',
      pos2Label: 'POSICIÓN 02',
      tableroInfo: 'Protección diferencial superinmunizada y relevador de boyas de nivel.',
      mantenimientos: [
        { id: 2, fecha: '20/10/2026', tarea: 'Limpieza de cámara y calibración de flotantes de nivel', tecnico: 'Di Gregori, Gabriel', observaciones: 'Prueba de alternancia automática satisfactoria.' }
      ]
    },
    { 
      id: 'napa1',
      nombre: 'POZO DE DEPRESIÓN DE NAPAS N° 1', 
      desc: 'Abatimiento freático y depresión continua en pozo freático N° 1 (Subsuelo Este)',
      pos1Label: 'POSICIÓN 01',
      pos2Label: 'POSICIÓN 02',
      tableroInfo: 'Tablero estanco IP65 con rele térmico monofásico y llave conmutadora.',
      mantenimientos: []
    },
    { 
      id: 'napa2',
      nombre: 'POZO DE DEPRESIÓN DE NAPAS N° 2', 
      desc: 'Drenaje freático y achique en pozo freático N° 2 (Sector Rampa y Cocheras)',
      pos1Label: 'POSICIÓN 01',
      pos2Label: 'POSICIÓN 02',
      tableroInfo: 'Arranque directo con relevador de nivel bajo y alto.',
      mantenimientos: []
    },
    { 
      id: 'napa3',
      nombre: 'POZO DE DEPRESIÓN DE NAPAS N° 3', 
      desc: 'Alivio de infiltraciones y achique en pozo freático N° 3 (Trinchera de Ductos Subterráneos)',
      pos1Label: 'POSICIÓN 01',
      pos2Label: 'POSICIÓN 02',
      tableroInfo: 'Protección termomagnética Siemens y alarma sonora por desborde.',
      mantenimientos: []
    }
  ]);

  // Estado para modal de modificación / creación de cuadro de bombas
  const [editingCuadro, setEditingCuadro] = useState(null);
  const [isNewCuadroModal, setIsNewCuadroModal] = useState(false);
  const [cuadroModalTab, setCuadroModalTab] = useState('datos'); // 'datos' | 'posiciones' | 'mantenimiento'
  const [newCuadroMantenimiento, setNewCuadroMantenimiento] = useState({
    fecha: new Date().toLocaleDateString('es-AR'),
    tarea: '',
    tecnico: 'Di Gregori, Ramón',
    observaciones: ''
  });

  // Abrir modal para crear cuadro nuevo
  const handleOpenNewCuadro = () => {
    const newId = `cuadro-${Date.now()}`;
    setEditingCuadro({
      id: newId,
      nombre: '',
      desc: '',
      pos1Label: 'POSICIÓN 01',
      pos2Label: 'POSICIÓN 02',
      tableroInfo: '',
      mantenimientos: []
    });
    setIsNewCuadroModal(true);
    setCuadroModalTab('datos');
  };

  // Guardar modificaciones o nuevo cuadro y sincronizar las bombas asignadas
  const handleSaveCuadro = () => {
    if (!editingCuadro || !editingCuadro.nombre.trim()) return;
    const newNombre = editingCuadro.nombre.trim();
    const pos1 = editingCuadro.pos1Label?.trim() || 'POSICIÓN 01';
    const pos2 = editingCuadro.pos2Label?.trim() || 'POSICIÓN 02';

    if (isNewCuadroModal) {
      setCuadrosData(prev => [...prev, {
        ...editingCuadro,
        nombre: newNombre,
        desc: editingCuadro.desc.trim(),
        pos1Label: pos1,
        pos2Label: pos2,
        tableroInfo: editingCuadro.tableroInfo || '',
        mantenimientos: editingCuadro.mantenimientos || []
      }]);
    } else {
      const oldNombre = cuadrosData.find(c => c.id === editingCuadro.id)?.nombre;

      setCuadrosData(prev => prev.map(c => c.id === editingCuadro.id ? {
        ...editingCuadro,
        nombre: newNombre,
        desc: editingCuadro.desc.trim(),
        pos1Label: pos1,
        pos2Label: pos2,
        tableroInfo: editingCuadro.tableroInfo || ''
      } : c));

      // Si se modificó el nombre del cuadro o las etiquetas de posición, actualizamos las bombas asociadas
      setBombasData(prev => prev.map(b => {
        if (b.cuadro === oldNombre || b.cuadro === newNombre) {
          const currentLabel = b.posicionSlot === 1 ? pos1 : (b.posicionSlot === 2 ? pos2 : '');
          return {
            ...b,
            cuadro: newNombre,
            posicionInstalacion: currentLabel ? `${newNombre} - ${currentLabel}` : newNombre
          };
        }
        return b;
      }));
    }

    setEditingCuadro(null);
    setIsNewCuadroModal(false);
  };

  // Agregar trabajo de mantenimiento al cuadro en edición
  const handleAddMantenimientoToCuadro = () => {
    if (!newCuadroMantenimiento.tarea.trim() || !editingCuadro) return;
    const item = {
      id: Date.now(),
      fecha: newCuadroMantenimiento.fecha || new Date().toLocaleDateString('es-AR'),
      tarea: newCuadroMantenimiento.tarea.trim(),
      tecnico: newCuadroMantenimiento.tecnico,
      observaciones: newCuadroMantenimiento.observaciones.trim() || 'Mantenimiento preventivo asentado.'
    };
    const updatedMantenimientos = [item, ...(editingCuadro.mantenimientos || [])];
    const updatedCuadro = { ...editingCuadro, mantenimientos: updatedMantenimientos };
    setEditingCuadro(updatedCuadro);

    if (!isNewCuadroModal) {
      setCuadrosData(prev => prev.map(c => c.id === updatedCuadro.id ? updatedCuadro : c));
    }

    setNewCuadroMantenimiento({
      fecha: new Date().toLocaleDateString('es-AR'),
      tarea: '',
      tecnico: 'Di Gregori, Ramón',
      observaciones: ''
    });
  };

  // Eliminar trabajo de mantenimiento de cuadro
  const handleRemoveCuadroMantenimiento = (mantenimientoId) => {
    if (!editingCuadro) return;
    const updatedMantenimientos = (editingCuadro.mantenimientos || []).filter(m => m.id !== mantenimientoId);
    const updatedCuadro = { ...editingCuadro, mantenimientos: updatedMantenimientos };
    setEditingCuadro(updatedCuadro);

    if (!isNewCuadroModal) {
      setCuadrosData(prev => prev.map(c => c.id === updatedCuadro.id ? updatedCuadro : c));
    }
  };

  // Estados para Edición de Bombas e Historial de Reparaciones
  const [editingBomba, setEditingBomba] = useState(null);
  const [isBombaModalOpen, setIsBombaModalOpen] = useState(false);
  const [bombaModalTab, setBombaModalTab] = useState('tecnica'); // 'tecnica' | 'reparaciones'
  const [editingReparacionId, setEditingReparacionId] = useState(null);
  const [editReparacionData, setEditReparacionData] = useState({
    fecha: '',
    tipo: '',
    tecnico: 'Elegir operario',
    tecnicoOtro: '',
    costo: '',
    detalle: ''
  });
  const [newReparacion, setNewReparacion] = useState({
    fecha: new Date().toLocaleDateString('es-AR'),
    tipo: '',
    tecnico: 'Elegir operario',
    tecnicoOtro: '',
    costo: '',
    detalle: ''
  });

  // Función utilitaria para formatear automáticamente en tiempo real con unidades de mil (puntos) y coma decimal
  const formatMonedaInput = (rawVal) => {
    if (!rawVal) return '';
    // Dejar solo números y una única coma
    let val = rawVal.replace(/[^0-9,]/g, '');
    const parts = val.split(',');
    
    // Si hay más de una coma, unificar en la primera
    let entero = parts[0] || '';
    let decimal = parts.length > 1 ? parts.slice(1).join('').slice(0, 2) : null;

    // Si el entero comienza con ceros innecesarios (ej: 05), remover excepto si es solo "0"
    if (entero.length > 1 && entero.startsWith('0')) {
      entero = entero.replace(/^0+/, '') || '0';
    }

    // Agregar puntos de miles al entero
    const enteroFormateado = entero.replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (decimal !== null) {
      return `${enteroFormateado},${decimal}`;
    }
    return enteroFormateado;
  };

  // Función utilitaria robusta para parsear valores monetarios (ej: "$ 861.257,25" -> 861257.25)
  const parseMoneda = (val) => {
    if (!val) return 0;
    // Si ya es un número
    if (typeof val === 'number') return isNaN(val) ? 0 : val;
    // Limpiar espacios y signo pesos
    let str = val.toString().replace(/[\$\s]/g, '').trim();
    if (!str) return 0;

    // Si tiene comas y puntos (formato argentino: 861.257,25)
    if (str.includes(',') && str.includes('.')) {
      str = str.replace(/\./g, '').replace(',', '.');
    } else if (str.includes(',')) {
      // Formato solo con coma decimal: 861257,25
      str = str.replace(',', '.');
    } else if (str.includes('.')) {
      // Si solo tiene puntos, verificar si es separador de miles (ej: 85.000 o 1.250.000)
      const parts = str.split('.');
      if (parts.length > 2 || (parts.length === 2 && parts[1].length === 3)) {
        str = str.replace(/\./g, '');
      }
    }

    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  };

  // Formatear número flotante a string en formato pesos argentinos ($ 1.250.000 o $ 861.257,25)
  const formatMonedaPesos = (num) => {
    if (typeof num !== 'number' || isNaN(num)) return '$ 0';
    return '$ ' + num.toLocaleString('es-AR', { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  };

  // Modal de Confirmación para Alternancia de Bombas
  const [pendingAlternancia, setPendingAlternancia] = useState(null); // { cuadroNombre, targetSlot, labelPos }

  // Modal para Retirar Bomba de su Posición
  const [retirarBombaModal, setRetirarBombaModal] = useState(null); // { bomba, destinoCuadro, destinoSlot }

  // Modal para Reemplazar Bomba (Bomba Saliente + Bomba Entrante)
  const [reemplazarBombaModal, setReemplazarBombaModal] = useState(null);

  // Componente interactivo deslizable para confirmar el reemplazo de la bomba
  const SlideToConfirmReemplazo = ({ onConfirm, disabled = false }) => {
    const [sliderPos, setSliderPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = React.useRef(null);
    const startXRef = React.useRef(0);

    const handlePointerDown = (e) => {
      if (disabled) return;
      e.stopPropagation();
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
      setIsDragging(true);
      startXRef.current = e.clientX;
    };

    const handlePointerMove = (e) => {
      if (!isDragging || disabled || !trackRef.current) return;
      e.stopPropagation();
      const trackRect = trackRef.current.getBoundingClientRect();
      const knobSize = 34;
      const travel = trackRect.width - knobSize - 4;
      if (travel <= 0) return;

      const deltaX = e.clientX - startXRef.current;
      const pct = Math.max(0, Math.min(100, (deltaX / travel) * 100));
      setSliderPos(pct);
    };

    const handlePointerUp = (e) => {
      if (!isDragging || disabled) return;
      e.stopPropagation();
      setIsDragging(false);
      try {
        if (e.currentTarget?.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      if (sliderPos >= 85) {
        setSliderPos(100);
        onConfirm();
      } else {
        setSliderPos(0);
      }
    };

    return (
      <div 
        ref={trackRef}
        onClick={(e) => e.stopPropagation()}
        className={`relative w-full h-10 rounded-xl border p-0.5 flex items-center select-none overflow-hidden touch-none shadow-inner ${
          disabled 
            ? 'bg-slate-100 border-slate-300 opacity-60 cursor-not-allowed' 
            : 'bg-emerald-100 border-emerald-300'
        }`}
      >
        <div 
          className="absolute top-0 bottom-0 left-0 bg-emerald-500/20"
          style={{ width: `${sliderPos}%` }}
        />
        <span className={`w-full text-center text-xs font-bold pointer-events-none z-10 pl-6 tracking-tight ${
          disabled ? 'text-slate-400' : 'text-emerald-900'
        }`}>
          {disabled 
            ? 'Seleccione una bomba de reemplazo para habilitar' 
            : sliderPos >= 85 ? 'Suelte para confirmar reemplazo' : 'Deslizar para confirmar reemplazo »'}
        </span>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute top-1 bottom-1 w-9 rounded-lg flex items-center justify-center shadow-md z-20 select-none transition-transform ${
            disabled 
              ? 'bg-slate-400 text-slate-200 cursor-not-allowed' 
              : 'bg-[#0f2d59] hover:bg-[#163e75] active:bg-[#0a1e3b] text-white cursor-grab active:cursor-grabbing'
          }`}
          style={{
            left: `calc(3px + ${(sliderPos / 100)} * (100% - 44px))`
          }}
        >
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    );
  };

  // Componente interactivo deslizable para confirmar el retiro de la bomba
  const SlideToConfirmRetiro = ({ onConfirm }) => {
    const [sliderPos, setSliderPos] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = React.useRef(null);
    const startXRef = React.useRef(0);

    const handlePointerDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      try {
        e.currentTarget.setPointerCapture(e.pointerId);
      } catch (_) {}
      setIsDragging(true);
      startXRef.current = e.clientX;
    };

    const handlePointerMove = (e) => {
      if (!isDragging || !trackRef.current) return;
      e.stopPropagation();
      const trackRect = trackRef.current.getBoundingClientRect();
      const knobSize = 34;
      const travel = trackRect.width - knobSize - 4;
      if (travel <= 0) return;

      const deltaX = e.clientX - startXRef.current;
      const pct = Math.max(0, Math.min(100, (deltaX / travel) * 100));
      setSliderPos(pct);
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      e.stopPropagation();
      setIsDragging(false);
      try {
        if (e.currentTarget?.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      if (sliderPos >= 85) {
        setSliderPos(100);
        onConfirm();
      } else {
        setSliderPos(0);
      }
    };

    return (
      <div 
        ref={trackRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full h-10 rounded-xl bg-red-100 border border-red-300 p-0.5 flex items-center select-none overflow-hidden touch-none shadow-inner"
      >
        <div 
          className="absolute top-0 bottom-0 left-0 bg-red-500/20"
          style={{ width: `${sliderPos}%` }}
        />
        <span className="w-full text-center text-xs font-bold text-red-900 pointer-events-none z-10 pl-6 tracking-tight">
          {sliderPos >= 85 ? 'Suelte para confirmar retiro' : 'Deslizar para confirmar retiro »'}
        </span>
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className="absolute top-1 bottom-1 w-9 rounded-lg bg-red-600 hover:bg-red-700 active:bg-red-800 text-white flex items-center justify-center shadow-md z-20 cursor-grab active:cursor-grabbing select-none transition-transform"
          style={{
            left: `calc(3px + ${(sliderPos / 100)} * (100% - 44px))`
          }}
        >
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    );
  };

  // Silueta vectorial esquemática de conjunto motobomba industrial (Diseño visual simplificado)
  const BombaSiluetaSimpleSVG = ({ isEnUso }) => (
    <svg viewBox="0 0 100 50" className="w-20 h-10 select-none" fill="none" stroke="currentColor">
      {/* Base / Bancada */}
      <rect x="10" y="42" width="80" height="4" rx="1.5" className={isEnUso ? "fill-emerald-700/20 stroke-emerald-600" : "fill-slate-200 stroke-slate-300"} strokeWidth="1" />
      {/* Motor eléctrico (cilindro horizontal y aletas) */}
      <rect x="42" y="14" width="38" height="26" rx="3" className={isEnUso ? "fill-emerald-800/10 stroke-emerald-700" : "fill-slate-100 stroke-slate-400"} strokeWidth="1.5" />
      <line x1="48" y1="18" x2="48" y2="36" className={isEnUso ? "stroke-emerald-600" : "stroke-slate-300"} strokeWidth="1" />
      <line x1="55" y1="18" x2="55" y2="36" className={isEnUso ? "stroke-emerald-600" : "stroke-slate-300"} strokeWidth="1" />
      <line x1="62" y1="18" x2="62" y2="36" className={isEnUso ? "stroke-emerald-600" : "stroke-slate-300"} strokeWidth="1" />
      <line x1="69" y1="18" x2="69" y2="36" className={isEnUso ? "stroke-emerald-600" : "stroke-slate-300"} strokeWidth="1" />
      {/* Tapa de ventilador de motor */}
      <rect x="80" y="17" width="5" height="20" rx="1" className={isEnUso ? "fill-emerald-700 stroke-emerald-700" : "fill-slate-300 stroke-slate-400"} strokeWidth="1" />
      {/* Acoplamiento / Linterna */}
      <rect x="36" y="21" width="6" height="12" rx="1" className={isEnUso ? "fill-emerald-600 stroke-emerald-700" : "fill-slate-300 stroke-slate-400"} strokeWidth="1" />
      {/* Carcasa / Voluta espiral de bomba centrífuga */}
      <circle cx="24" cy="27" r="14" className={isEnUso ? "fill-emerald-600/20 stroke-emerald-700" : "fill-slate-200 stroke-slate-400"} strokeWidth="1.5" />
      <circle cx="24" cy="27" r="5" className={isEnUso ? "fill-emerald-700 stroke-emerald-700 animate-spin origin-[24px_27px]" : "fill-slate-400 stroke-slate-400"} strokeWidth="1" />
      {/* Brida de Impulsión vertical superior */}
      <rect x="20" y="6" width="8" height="9" className={isEnUso ? "fill-emerald-700 stroke-emerald-700" : "fill-slate-300 stroke-slate-400"} strokeWidth="1" />
      <line x1="17" y1="6" x2="31" y2="6" className={isEnUso ? "stroke-emerald-800" : "stroke-slate-500"} strokeWidth="2" strokeLinecap="round" />
      {/* Brida de Aspiración lateral izquierda */}
      <rect x="5" y="23" width="7" height="8" className={isEnUso ? "fill-emerald-700 stroke-emerald-700" : "fill-slate-300 stroke-slate-400"} strokeWidth="1" />
      <line x1="5" y1="20" x2="5" y2="34" className={isEnUso ? "stroke-emerald-800" : "stroke-slate-500"} strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  // Componente Slider para Alternancia en el Cuadro de Monitoreo
  const CuadroAlternanciaSlider = ({ cuadroNombre, activeSlot, onSolicitarCambio }) => {
    // activeSlot: 1 o 2. Si no hay activo o es 1, pos = 0 (izq). Si es 2, pos = 100 (der).
    const isPos2 = activeSlot === 2;
    const initialPct = isPos2 ? 100 : 0;
    const [sliderPos, setSliderPos] = useState(initialPct);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = React.useRef(null);
    const startXRef = React.useRef(0);
    const currentPosRef = React.useRef(initialPct);

    React.useEffect(() => {
      const p = isPos2 ? 100 : 0;
      setSliderPos(p);
      currentPosRef.current = p;
    }, [isPos2]);

    const handlePointerDown = (e) => {
      e.stopPropagation();
      e.preventDefault();
      const target = e.currentTarget;
      try {
        target.setPointerCapture(e.pointerId);
      } catch (_) {}

      setIsDragging(true);
      startXRef.current = e.clientX;
      currentPosRef.current = sliderPos;
    };

    const handlePointerMove = (e) => {
      if (!isDragging || !trackRef.current) return;
      e.stopPropagation();

      const trackRect = trackRef.current.getBoundingClientRect();
      const knobSize = 36;
      const travelDistance = trackRect.width - knobSize - 4;
      if (travelDistance <= 0) return;

      const deltaX = e.clientX - startXRef.current;
      const deltaPct = (deltaX / travelDistance) * 100;
      const startPct = isPos2 ? 100 : 0;
      const newPos = Math.max(0, Math.min(100, startPct + deltaPct));

      currentPosRef.current = newPos;
      setSliderPos(newPos);
    };

    const handlePointerUp = (e) => {
      if (!isDragging) return;
      e.stopPropagation();
      setIsDragging(false);

      try {
        if (e.currentTarget?.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      if (isPos2) {
        // Estaba en Posición 02, se arrastró hacia Posición 01 (izquierda)
        if (currentPosRef.current <= 30) {
          onSolicitarCambio(cuadroNombre, 1, 'POSICIÓN 01');
        } else {
          setSliderPos(100);
          currentPosRef.current = 100;
        }
      } else {
        // Estaba en Posición 01, se arrastró hacia Posición 02 (derecha)
        if (currentPosRef.current >= 70) {
          onSolicitarCambio(cuadroNombre, 2, 'POSICIÓN 02');
        } else {
          setSliderPos(0);
          currentPosRef.current = 0;
        }
      }
    };

    return (
      <div className="flex items-center space-x-2 select-none">
        <span className={`text-[10.5px] font-bold transition-colors ${!isPos2 ? 'text-[#166534]' : 'text-slate-400'}`}>
          POS 01
        </span>
        <div
          ref={trackRef}
          onClick={(e) => e.stopPropagation()}
          className="relative w-44 h-8 rounded-full bg-slate-200 border border-slate-300 p-0.5 flex items-center select-none overflow-hidden touch-none shadow-inner"
        >
          {/* Fondo bicolor indicativo */}
          <div 
            className={`absolute top-0 bottom-0 left-0 bg-[#86efac]/50 transition-all ${isDragging ? 'duration-0' : 'duration-300'}`}
            style={{ width: `${sliderPos}%` }}
          />

          <span className="w-full text-center text-[9.5px] font-bold text-slate-600 pointer-events-none z-10 select-none tracking-tight">
            Deslizar para alternar
          </span>

          {/* Pomo deslizable */}
          <div
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            className={`absolute top-0.5 bottom-0.5 w-9 h-7 rounded-full bg-[#0f2d59] hover:bg-[#163e75] active:bg-[#0a1e3b] text-white flex items-center justify-center shadow-md z-20 cursor-grab active:cursor-grabbing select-none transition-transform ${
              isDragging ? 'scale-105' : 'transition-all duration-300'
            }`}
            style={{
              left: `calc(2px + ${(sliderPos / 100)} * (100% - 40px))`
            }}
          >
            <RotateCw className="w-3.5 h-3.5" />
          </div>
        </div>
        <span className={`text-[10.5px] font-bold transition-colors ${isPos2 ? 'text-[#166534]' : 'text-slate-400'}`}>
          POS 02
        </span>
      </div>
    );
  };

  // Alternar bomba activa dentro de un cuadro asegurando que una sea BOMBA EN USO y la otra BOMBA EN RESERVA
  const handleAlternarCuadro = (cuadroNombre) => {
    setBombasData(prev => {
      const enCuadro = prev.filter(b => b.cuadro === cuadroNombre);
      if (enCuadro.length === 0) return prev;

      const activa = enCuadro.find(b => b.alternancia === 'BOMBA EN USO');
      const targetSlot = activa && activa.posicionSlot === 1 ? 2 : 1;

      return prev.map(b => {
        if (b.cuadro === cuadroNombre) {
          if (b.posicionSlot === targetSlot) {
            return {
              ...b,
              alternancia: 'BOMBA EN USO',
              diasUso: 0
            };
          } else {
            return {
              ...b,
              alternancia: 'BOMBA EN RESERVA'
            };
          }
        }
        return b;
      });
    });
  };

  // Función para solicitar cambio de alternancia con confirmación
  const handleSolicitarAlternancia = (cuadroNombre, targetSlot, labelPos) => {
    const enCuadro = bombasData.filter(b => b.cuadro === cuadroNombre);
    const bombaDestino = enCuadro.find(b => b.posicionSlot === targetSlot);
    if (!bombaDestino) {
      return;
    }
    setPendingAlternancia({
      cuadroNombre,
      targetSlot,
      labelPos,
      nombreBomba: bombaDestino.nombre,
      tagBomba: bombaDestino.tagFisico || bombaDestino.id
    });
  };
  // Confirmar y aplicar alternancia operativa con reseteo de días y horas de la bomba que entra en uso
  const handleConfirmarAlternancia = () => {
    if (!pendingAlternancia) return;
    const { cuadroNombre, targetSlot } = pendingAlternancia;

    setBombasData(prev => {
      return prev.map(b => {
        if (b.cuadro === cuadroNombre) {
          if (b.posicionSlot === targetSlot) {
            return {
              ...b,
              alternancia: 'BOMBA EN USO',
              diasUso: 0, // Resetea contador al activarse
              horasCicloActivo: 0
            };
          } else {
            return {
              ...b,
              alternancia: 'BOMBA EN RESERVA'
            };
          }
        }
        return b;
      });
    });

    setPendingAlternancia(null);
  };

  // Poner una bomba específica en uso: automáticamente la compañera del mismo cuadro pasa a BOMBA EN RESERVA
  const handleSetBombaEnUso = (bombaAActivar) => {
    const targetSlot = bombaAActivar.posicionSlot || 1;
    handleSolicitarAlternancia(bombaAActivar.cuadro, targetSlot, targetSlot === 1 ? 'POSICIÓN 01' : 'POSICIÓN 02');
  };

  // Poner una bomba específica en reserva
  const handleSetBombaEnReserva = (bombaAPonerEnReserva) => {
    setBombasData(prev => {
      return prev.map(b => {
        if (b.id === bombaAPonerEnReserva.id) {
          return {
            ...b,
            alternancia: 'BOMBA EN RESERVA'
          };
        }
        return b;
      });
    });
  };

  // Función para asignar una nueva bomba o reasignar a una posición vacía de un cuadro
  const handleAsignarBombaAPosicion = (cuadroNombre, slotNum) => {
    const newIdNum = (bombasData.length + 1).toString().padStart(2, '0');
    const slotLabel = slotNum === 1 ? '01' : '02';
    const nuevaBomba = {
      id: `BOM-${newIdNum}`,
      tagFisico: `CFT-BOM-P${slotLabel}-${newIdNum}`,
      nombre: `Bomba Posición ${slotLabel} (${cuadroNombre.split(' ')[2] || 'Equipo'})`,
      cuadro: cuadroNombre,
      posicionSlot: slotNum,
      sistema: 'Bombeo Edilicio General',
      ubicacion: '2° Subsuelo - Sala de Instalaciones',
      posicionInstalacion: `${cuadroNombre} - POSICIÓN ${slotLabel}`,
      marca: 'Grundfos / Motorarg',
      modelo: 'Modelo Específico',
      potencia: '2.0 HP / 1.5 kW',
      caudal: '16 m³/h',
      alturaManometrica: '14 mca',
      rpm: '2850 RPM',
      estado: 'Operativa',
      modo: 'Automático',
      presion: '1.4 bar',
      consumoAmperios: '4.8 A',
      voltaje: '380 V (Trifásico)',
      horasUso: 0,
      diasUso: 0,
      alternancia: 'BOMBA EN RESERVA',
      ultimaInspeccion: new Date().toLocaleDateString('es-AR'),
      tecnicoResponsable: 'Di Gregori, Ramón',
      observaciones: 'Equipo instalado en posición operativa.',
      reparaciones: []
    };

    setBombasData(prev => [...prev, nuevaBomba]);
    handleOpenEditBomba(nuevaBomba);
  };

  // Función para eliminar equipo de bomba
  const handleDeleteBomba = (bombaId) => {
    setBombasData(prev => prev.filter(b => b.id !== bombaId));
    if (editingBomba && editingBomba.id === bombaId) {
      setIsBombaModalOpen(false);
      setEditingBomba(null);
    }
  };

  const handleOpenEditBomba = (bomba) => {
    setEditingBomba(JSON.parse(JSON.stringify(bomba)));
    setBombaModalTab('tecnica');
    setIsBombaModalOpen(true);
  };

  const handleSaveBomba = () => {
    if (!editingBomba) return;
    setBombasData(prev => prev.map(b => b.id === editingBomba.id ? editingBomba : b));
    setIsBombaModalOpen(false);
  };

  const handleAddReparacionToBomba = () => {
    if (!newReparacion.tipo.trim() || !editingBomba) return;
    
    // Si eligió 'Otros', se toma lo escrito en newReparacion.tecnicoOtro
    let tecnicoAsignado = newReparacion.tecnico;
    if (newReparacion.tecnico === 'Otros') {
      tecnicoAsignado = newReparacion.tecnicoOtro.trim() || 'Otros (Sin especificar)';
    } else if (newReparacion.tecnico === 'Elegir operario') {
      tecnicoAsignado = 'Sin Asignar';
    }

    const formattedCosto = newReparacion.costo.trim() 
      ? (newReparacion.costo.startsWith('$') ? newReparacion.costo : `$ ${newReparacion.costo}`) 
      : '—';

    const item = {
      id: Date.now(),
      fecha: newReparacion.fecha || new Date().toLocaleDateString('es-AR'),
      tipo: newReparacion.tipo.trim(),
      tecnico: tecnicoAsignado,
      costo: formattedCosto,
      detalle: newReparacion.detalle.trim() || 'Intervención registrada en planilla técnica.'
    };
    const updated = {
      ...editingBomba,
      reparaciones: [item, ...(editingBomba.reparaciones || [])]
    };
    setEditingBomba(updated);
    setBombasData(prev => prev.map(b => b.id === updated.id ? updated : b));
    setNewReparacion({
      fecha: new Date().toLocaleDateString('es-AR'),
      tipo: '',
      tecnico: 'Elegir operario',
      tecnicoOtro: '',
      costo: '',
      detalle: ''
    });
  };

  const handleStartEditReparacion = (rep) => {
    setEditingReparacionId(rep.id);
    const isKnownTech = dropdownOptions.tecnicos.includes(rep.tecnico);
    // Extraer y formatear el costo existente con puntos y comas
    const rawCost = (rep.costo || '').toString().replace(/[^0-9,]/g, '');
    const formattedCost = formatMonedaInput(rawCost);
    setEditReparacionData({
      fecha: rep.fecha || '',
      tipo: rep.tipo || '',
      tecnico: isKnownTech ? rep.tecnico : (rep.tecnico === 'Sin Asignar' ? 'Elegir operario' : 'Otros'),
      tecnicoOtro: isKnownTech ? '' : (rep.tecnico === 'Sin Asignar' ? '' : rep.tecnico),
      costo: formattedCost,
      detalle: rep.detalle || ''
    });
  };

  const handleSaveEditReparacion = () => {
    if (!editingBomba || !editingReparacionId) return;
    const formattedCosto = editReparacionData.costo.trim() 
      ? (editReparacionData.costo.startsWith('$') ? editReparacionData.costo : `$ ${editReparacionData.costo}`) 
      : '—';

    let tecnicoFinal = editReparacionData.tecnico;
    if (editReparacionData.tecnico === 'Otros') {
      tecnicoFinal = editReparacionData.tecnicoOtro.trim() || 'Otros (Sin especificar)';
    } else if (editReparacionData.tecnico === 'Elegir operario') {
      tecnicoFinal = 'Sin Asignar';
    }

    const updatedReparaciones = (editingBomba.reparaciones || []).map(r => {
      if (r.id === editingReparacionId) {
        return {
          ...r,
          fecha: editReparacionData.fecha.trim(),
          tipo: editReparacionData.tipo.trim(),
          tecnico: tecnicoFinal,
          costo: formattedCosto,
          detalle: editReparacionData.detalle.trim()
        };
      }
      return r;
    });

    const updatedBomba = {
      ...editingBomba,
      reparaciones: updatedReparaciones
    };

    setEditingBomba(updatedBomba);
    setBombasData(prev => prev.map(b => b.id === updatedBomba.id ? updatedBomba : b));
    setEditingReparacionId(null);
  };

  const handleCancelEditReparacion = () => {
    setEditingReparacionId(null);
  };

  const handleRemoveReparacion = (reparacionId) => {
    if (!editingBomba) return;
    const updated = {
      ...editingBomba,
      reparaciones: (editingBomba.reparaciones || []).filter(r => r.id !== reparacionId)
    };
    setEditingBomba(updated);
    setBombasData(prev => prev.map(b => b.id === updated.id ? updated : b));
    if (editingReparacionId === reparacionId) {
      setEditingReparacionId(null);
    }
  };

  // Ejecutar el retiro/reubicación de una bomba
  const handleConfirmarRetiroBomba = () => {
    if (!retirarBombaModal) return;
    const { bomba, destinoCuadro, destinoSlot } = retirarBombaModal;

    setBombasData(prev => prev.map(b => {
      if (b.id === bomba.id) {
        const isCuadro = destinoCuadro !== 'EN DEPÓSITO' && destinoCuadro !== 'TALLER';
        const slotLabel = destinoSlot === 1 ? '01' : '02';
        return {
          ...b,
          cuadro: destinoCuadro,
          posicionSlot: isCuadro ? destinoSlot : null,
          posicionInstalacion: isCuadro ? `${destinoCuadro} - POSICIÓN ${slotLabel}` : destinoCuadro,
          ubicacion: destinoCuadro === 'EN DEPÓSITO' ? 'Depósito Central' : destinoCuadro === 'TALLER' ? 'Taller de Mantenimiento' : '2° Subsuelo - Sala de Instalaciones',
          alternancia: 'BOMBA EN RESERVA',
          diasUso: 0
        };
      }
      return b;
    }));

    setRetirarBombaModal(null);
  };

  // Ejecutar el reemplazo directo de una bomba por otra
  const handleConfirmarReemplazoBomba = () => {
    if (!reemplazarBombaModal || !reemplazarBombaModal.bombaReemplazoId) return;
    const { bombaSaliente, estadoSaliente, destinoSaliente, bombaReemplazoId, cuadroNombre, slotNum, labelPos } = reemplazarBombaModal;

    setBombasData(prev => prev.map(b => {
      // 1. Modificar bomba saliente: asume su nuevo estado y destino fuera del cuadro
      if (b.id === bombaSaliente.id) {
        const isCuadro = destinoSaliente !== 'EN DEPÓSITO' && destinoSaliente !== 'TALLER';
        return {
          ...b,
          cuadro: destinoSaliente,
          posicionSlot: null,
          posicionInstalacion: destinoSaliente,
          ubicacion: destinoSaliente === 'EN DEPÓSITO' ? 'Depósito Central' : 'Taller Externo de Mantenimiento',
          estado: estadoSaliente || 'A Reparar',
          alternancia: 'BOMBA EN RESERVA',
          diasUso: 0
        };
      }
      // 2. Modificar bomba entrante: ocupa la ranura exacta y hereda la alternancia
      if (b.id === bombaReemplazoId) {
        return {
          ...b,
          cuadro: cuadroNombre,
          posicionSlot: slotNum,
          posicionInstalacion: `${cuadroNombre} - ${labelPos}`,
          ubicacion: '2° Subsuelo - Sala de Instalaciones',
          estado: 'Operativa',
          alternancia: bombaSaliente.alternancia || 'BOMBA EN RESERVA',
          diasUso: 0
        };
      }
      return b;
    }));

    setReemplazarBombaModal(null);
  };

  // Planificación de Inspecciones Edilicias State
  const [selectedMonthFilter, setSelectedMonthFilter] = useState('all');
  const [selectedFreqFilter, setSelectedFreqFilter] = useState('all');
  const [selectedGroupFilter, setSelectedGroupFilter] = useState('all');
  const [inspectionsSearch, setInspectionsSearch] = useState('');
  const [isAnnualPlannerOpen, setIsAnnualPlannerOpen] = useState(false);
  const [annualPlanDraft, setAnnualPlanDraft] = useState({});
  const [activePlannerMonth, setActivePlannerMonth] = useState(new Date().getMonth());
  const [plannerWeekByMonth, setPlannerWeekByMonth] = useState({});

  // Fichas oficiales del Programa de Mantenimiento CFT (3 Grupos Integrales)
  const [inspectionSheets, setInspectionSheets] = useState<any[]>([
    // GRUPO 1: ENVOLVENTES Y SISTEMAS CONSTRUCTIVOS (PL-01 a PL-10)
    { id: 1, code: 'PL-01', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Fachada (Alucobond y Granito)', freq: 'Trimestral', color: 'bg-blue-600', weeks: [1, 13, 25, 37], completedWeeks: [1] },
    { id: 2, code: 'PL-02', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Envolvente (Mamposterías y H°A°)', freq: 'Trimestral', color: 'bg-sky-600', weeks: [2, 14, 26, 38], completedWeeks: [2] },
    { id: 3, code: 'PL-03', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Muros Interiores y Revestimientos', freq: 'Trimestral', color: 'bg-indigo-600', weeks: [3, 15, 27, 39], completedWeeks: [3] },
    { id: 4, code: 'PL-04', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Cielorrasos (Suspendidos y Aplicados)', freq: 'Semestral', color: 'bg-emerald-600', weeks: [6, 30], completedWeeks: [6] },
    { id: 5, code: 'PL-05', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Pisos (Graníticos, Parquet y Vereda)', freq: 'Semestral', color: 'bg-teal-600', weeks: [8, 32], completedWeeks: [] },
    { id: 6, code: 'PL-06', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Cubiertas y Techos', freq: 'Mensual', color: 'bg-cyan-700', weeks: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45], completedWeeks: [1, 5] },
    { id: 7, code: 'PL-07', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Zinguerías, Desagües y Accesorios', freq: 'Mensual', color: 'bg-blue-700', weeks: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46], completedWeeks: [2] },
    { id: 8, code: 'PL-08', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Aberturas Externas (Carpinterías/Vidrios)', freq: 'Trimestral', color: 'bg-slate-600', weeks: [4, 16, 28, 40], completedWeeks: [4] },
    { id: 9, code: 'PL-09', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Aberturas Internas y Puertas', freq: 'Semestral', color: 'bg-stone-600', weeks: [10, 34], completedWeeks: [] },
    { id: 10, code: 'PL-10', grupo: 'Envolventes y Sistemas Constructivos', nombre: 'Mobiliario Edilicio Judicial', freq: 'Semestral', color: 'bg-zinc-600', weeks: [12, 36], completedWeeks: [] },

    // GRUPO 2: INSTALACIONES CRÍTICAS (PL-11 a PL-17)
    { id: 11, code: 'PL-11', grupo: 'Instalaciones Críticas', nombre: 'Instalación Eléctrica General', freq: 'Mensual', color: 'bg-amber-600', weeks: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45], completedWeeks: [1, 5] },
    { id: 12, code: 'PL-12', grupo: 'Instalaciones Críticas', nombre: 'Sistema de Bombas Electromecánicas', freq: 'Mensual', color: 'bg-cyan-600', weeks: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46], completedWeeks: [2] },
    { id: 13, code: 'PL-13', grupo: 'Instalaciones Críticas', nombre: 'Instalación Sanitaria (Redes y Tanques)', freq: 'Mensual', color: 'bg-sky-500', weeks: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47], completedWeeks: [3] },
    { id: 14, code: 'PL-14', grupo: 'Instalaciones Críticas', nombre: 'Equipamiento Sanitario y Griferías', freq: 'Mensual', color: 'bg-blue-500', weeks: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48], completedWeeks: [4] },
    { id: 15, code: 'PL-15', grupo: 'Instalaciones Críticas', nombre: 'Instalación de Gas y Artefactos', freq: 'Semestral', color: 'bg-orange-600', weeks: [7, 31], completedWeeks: [] },
    { id: 16, code: 'PL-16', grupo: 'Instalaciones Críticas', nombre: 'Servicio Contraincendios (Red/Salidas)', freq: 'Trimestral', color: 'bg-rose-600', weeks: [3, 15, 27, 39], completedWeeks: [3] },
    { id: 17, code: 'PL-17', grupo: 'Instalaciones Críticas', nombre: 'Iluminación y Tomas Generales', freq: 'Mensual', color: 'bg-yellow-600', weeks: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46], completedWeeks: [2] },

    // GRUPO 3: SERVICIOS CONTRATADOS (PL-18 a PL-22)
    { id: 18, code: 'PL-18', grupo: 'Servicios', nombre: 'Climatización (HVAC Central e Individual)', freq: 'Mensual', color: 'bg-indigo-500', weeks: [1, 5, 9, 13, 17, 21, 25, 29, 33, 37, 41, 45], completedWeeks: [1] },
    { id: 19, code: 'PL-19', grupo: 'Servicios', nombre: 'Ascensores y Medios Mecánicos', freq: 'Mensual', color: 'bg-purple-600', weeks: [2, 6, 10, 14, 18, 22, 26, 30, 34, 38, 42, 46], completedWeeks: [2] },
    { id: 20, code: 'PL-20', grupo: 'Servicios', nombre: 'Grupo Electrógeno de Emergencia', freq: 'Mensual', color: 'bg-emerald-700', weeks: [3, 7, 11, 15, 19, 23, 27, 31, 35, 39, 43, 47], completedWeeks: [3] },
    { id: 21, code: 'PL-21', grupo: 'Servicios', nombre: 'Matafuegos y Extintores Portátiles', freq: 'Trimestral', color: 'bg-red-600', weeks: [4, 16, 28, 40], completedWeeks: [4] },
    { id: 22, code: 'PL-22', grupo: 'Servicios', nombre: 'Servicio de Fumigación y Control Plagas', freq: 'Mensual', color: 'bg-teal-700', weeks: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48], completedWeeks: [4] }
  ]);

  // =========================================================================
  // NUEVO: ESTADO Y DATOS PARA EL CATÁLOGO OFICIAL DE PLANILLAS EDILICIAS (1-22)
  // Con segregación en 3 Grupos, Wizard Asistente y Vista de Impresión Oficial A4 en 2 páginas
  // =========================================================================
  const [fichasEdiliciasData, setFichasEdiliciasData] = useState([
    // GRUPO I: SISTEMA EDILICIO
    {
      id: 'PL-01',
      codigo: 'FICHA N° 01',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Fachada Principal (Paneles Alucobond y Granito)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Fachada Frontal y Alero',
      nivel: 'Exterior / Vereda',
      inspector: 'Di Gregori, Ramón',
      fecha: '02/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R1-1',
          nombre: 'Paneles Compuestos (Alucobond)',
          patologias: [
            { id: 'p1', descripcion: 'Desprendimiento o fijaciones flojas en remaches', estado: 'Ninguna', obs: 'Fijaciones comprobadas sin movimiento' },
            { id: 'p2', descripcion: 'Rayaduras, abolladuras o alabeo térmico', estado: 'Ninguna', obs: 'Placas alineadas en escuadra' },
            { id: 'p3', descripcion: 'Sellado de juntas perimetrales degradado por UV', estado: 'Leve', obs: 'Requiere reaplicación de silicona neutra' }
          ]
        },
        {
          id: 'R1-2',
          nombre: 'Revestimiento Pétreo (Granito Gris Mara)',
          patologias: [
            { id: 'p4', descripcion: 'Fisuras o piezas flojas con riesgo de caída', estado: 'Ninguna', obs: 'Sólidamente ancladas a estructura' },
            { id: 'p5', descripcion: 'Eflorescencias salinas o manchas de humedad', estado: 'Ninguna', obs: 'Superficie hidrófuga' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección ocular y golpe pericial de fijaciones', frecuencia: 'Cada 3 meses', accion: 'Verificar anclajes mecánicos y tornillos antivandálicos' },
        { tarea: 'Limpieza técnica de paneles y cristales', frecuencia: 'Cada 6 meses', accion: 'Lavado con hidrolavadora a presión controlada y detergente neutro' },
        { tarea: 'Renovación de selladores poliuretánicos', frecuencia: 'Cada 1 año', accion: 'Calafateo de juntas de dilatación con Sikaflex 1A' }
      ]
    },
    {
      id: 'PL-02',
      codigo: 'FICHA N° 02',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Envolvente (Mamposterías y Estructura de H°A°)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Paredes Exteriores y Medianeras',
      nivel: 'Subsuelos a Azotea',
      inspector: 'Di Gregori, Gabriel',
      fecha: '05/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R2-1',
          nombre: 'Estructura de Hormigón Armado',
          patologias: [
            { id: 'p1', descripcion: 'Fisuras estructurales pasantes o asentamiento', estado: 'Ninguna', obs: 'Monitoreo de testigos conforme' },
            { id: 'p2', descripcion: 'Armaduras expuestas con signos de corrosión', estado: 'Ninguna', obs: 'Recubrimiento intacto' }
          ]
        },
        {
          id: 'R2-2',
          nombre: 'Mampostería y Revoques Exteriores',
          patologias: [
            { id: 'p3', descripcion: 'Desprendimiento de revoque o fisuras de revoque fino', estado: 'Leve', obs: 'Microfisuras sobre medianera norte' },
            { id: 'p4', descripcion: 'Manchas por humedad ascendente o filtración', estado: 'Ninguna', obs: 'Capa aisladora operativa' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección de grietas y monitoreo con fisurómetros', frecuencia: 'Cada 3 meses', accion: 'Seguimiento de deformaciones relativas' },
        { tarea: 'Pintura y sellado hidrófugo exterior', frecuencia: 'Cada 2 años', accion: 'Impermeabilización con pintura elastomérica' }
      ]
    },
    {
      id: 'PL-03',
      codigo: 'FICHA N° 03',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Muros Interiores y Revestimientos Sanitarios',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Oficinas Judiciales y Baterías de Baños',
      nivel: 'Planta Baja y Pisos 1° al 6°',
      inspector: 'Di Gregori, Ramón',
      fecha: '20/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R3-1',
          nombre: 'Muros y Tabiques Interiores de Durlock/Ladrillo',
          patologias: [
            { id: 'p1', descripcion: 'Deterioro de pintura al látex o suciedad por roce', estado: 'Leve', obs: 'Retoque de pintura en zócalos' },
            { id: 'p2', descripcion: 'Golpes en placas de yeso o esquineros flojos', estado: 'Ninguna', obs: 'Guardacantos firmes' }
          ]
        },
        {
          id: 'R3-2',
          nombre: 'Azulejos y Revestimientos Cerámicos',
          patologias: [
            { id: 'p3', descripcion: 'Piezas cerámicas quebradas o sueltas', estado: 'Ninguna', obs: 'Pastina completa' },
            { id: 'p4', descripcion: 'Moho o desprendimiento en juntas sanitarias', estado: 'Ninguna', obs: 'Sellado con antihongos' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Revisión y verificación de estanqueidad en pasamuros', frecuencia: 'Cada 3 meses', accion: 'Inspeccionar bajadas pluviales ocultas' },
        { tarea: 'Pintura general interior al látex lavable', frecuencia: 'Cada 1 año', accion: 'Repaso en zonas de alta circulación' }
      ]
    },
    {
      id: 'PL-04',
      codigo: 'FICHA N° 04',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Cielorrasos (Suspendidos Desmontables y Yeso Aplicado)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Salas de Audiencias, Pasillos y Despachos',
      nivel: 'Pisos 1° a 6°',
      inspector: 'Santiago Gigena',
      fecha: '18/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R4-1',
          nombre: 'Cielorrasos Desmontables termoacústicos 60x60',
          patologias: [
            { id: 'p1', descripcion: 'Placas manchadas por filtración o condensación', estado: 'Ninguna', obs: 'Placas secas sin manchas' },
            { id: 'p2', descripcion: 'Perfilería de suspensión descalzada o pandeada', estado: 'Ninguna', obs: 'Estructura nivelada' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección de anclajes de perfiles y plenum superior', frecuencia: 'Cada 6 meses', accion: 'Verificar cables y ductos sobre cielorraso' },
        { tarea: 'Reemplazo de placas fisuradas o descoloridas', frecuencia: 'Cada 1 año', accion: 'Sustitución de placas acústicas' }
      ]
    },
    {
      id: 'PL-05',
      codigo: 'FICHA N° 05',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Pisos y Vereda (Graníticos, Cerámicos y Parquet)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Hall Principal, Circulaciones y Despachos',
      nivel: 'Planta Baja y Subsuelos',
      inspector: 'Di Gregori, Ramón',
      fecha: '25/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R5-1',
          nombre: 'Solados Graníticos y Vereda Pública',
          patologias: [
            { id: 'p1', descripcion: 'Baldosas calcáreas flojas o descalzadas en vereda', estado: 'Ninguna', obs: 'Vereda municipal sin resaltes' },
            { id: 'p2', descripcion: 'Juntas de dilatación de bronce desgastadas', estado: 'Ninguna', obs: 'Pulido continuo' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección y fijación de piezas sueltas', frecuencia: 'Cada 6 meses', accion: 'Rellenado con mortero autonivelante' },
        { tarea: 'Encerado y abrillantado mecánico', frecuencia: 'Cada 3 meses', accion: 'Tratamiento sellador antideslizante' }
      ]
    },
    {
      id: 'PL-06',
      codigo: 'FICHA N° 06',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Cubiertas, Techos y Azoteas Intransitables',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Azotea Principal y Sala de Máquinas',
      nivel: 'Nivel +24.00 m (Azotea)',
      inspector: 'Di Gregori, Gabriel',
      fecha: '01/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R6-1',
          nombre: 'Membrana Asfáltica con Geotextil / Pintura Poliuretánica',
          patologias: [
            { id: 'p1', descripcion: 'Ampollas de vapor o despegue de solapes', estado: 'Ninguna', obs: 'Solapes termofusionados herméticos' },
            { id: 'p2', descripcion: 'Embancamiento de agua de lluvia por falta de pendiente', estado: 'Ninguna', obs: 'Pendiente mínima del 2% hacia embudos' },
            { id: 'p3', descripcion: 'Babeta perimetral de chapa o remate desprendido', estado: 'Leve', obs: 'Fijación de tornillo en babeta sur' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Limpieza profunda de hojas y sedimentos', frecuencia: 'Cada 1 mes', accion: 'Mantenimiento preventivo previo a tormentas' },
        { tarea: 'Inspección termográfica de filtraciones', frecuencia: 'Cada 6 meses', accion: 'Detección de puntos de humedad oculta' }
      ]
    },
    {
      id: 'PL-07',
      codigo: 'FICHA N° 07',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Zinguerías, Desagües Pluviales y Accesorios',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Embudos de Azotea y Caños de Bajada',
      nivel: 'Azotea y Fachadas Patios Internos',
      inspector: 'Di Gregori, Gabriel',
      fecha: '29/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R7-1',
          nombre: 'Canaletas de Chapa Galvanizada y Caños de Bajada (PVC/Hierro)',
          patologias: [
            { id: 'p1', descripcion: 'Embudos tapados por hojas o cuerpos extraños', estado: 'Ninguna', obs: 'Rejillas tipo globo colocadas' },
            { id: 'p2', descripcion: 'Juntas de caños de bajada con pérdidas o fisuras', estado: 'Ninguna', obs: 'Sellado sin fugas' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Desobstrucción y lavado a presión de caños pluviales', frecuencia: 'Cada 1 mes', accion: 'Mantenimiento del sistema de drenaje' },
        { tarea: 'Pintura antióxido y esmalte sintético en zinguería', frecuencia: 'Cada 1 año', accion: 'Protección contra corrosión' }
      ]
    },
    {
      id: 'PL-08',
      codigo: 'FICHA N° 08',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Aberturas Exteriores (Carpinterías de Aluminio y Vidrios)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Ventanas y Piel de Vidrio',
      nivel: 'Pisos 1° a 6°',
      inspector: 'Santiago Gigena',
      fecha: '22/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R8-1',
          nombre: 'Ventanas Corredizas y Proyectantes Módena/A30',
          patologias: [
            { id: 'p1', descripcion: 'Burletes de EPDM resecos o sueltos', estado: 'Leve', obs: 'Reemplazo programado de colisas' },
            { id: 'p2', descripcion: 'Vidrios astillados, rayados o sellos rotos', estado: 'Ninguna', obs: 'DVH herméticos' },
            { id: 'p3', descripcion: 'Cierres bipunto o rodamientos trabados', estado: 'Ninguna', obs: 'Deslizamiento suave lubricado' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Ajuste de fallebas, bisagras y lubricación con silicona', frecuencia: 'Cada 3 meses', accion: 'Calibración de herrajes' },
        { tarea: 'Cambio de felpas y burletes antipolvo', frecuencia: 'Cada 1 año', accion: 'Renovación de aislación acústica' }
      ]
    },
    {
      id: 'PL-09',
      codigo: 'FICHA N° 09',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Aberturas Interiores (Puertas Placa, Vidriadas y Cerrajería)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Accesos a Despachos y Pasillos',
      nivel: 'Todos los Niveles',
      inspector: 'Di Gregori, Ramón',
      fecha: '26/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R9-1',
          nombre: 'Puertas Placa de Madera y Marcos de Chapa',
          patologias: [
            { id: 'p1', descripcion: 'Fricción en pisos o roces contra el marco', estado: 'Ninguna', obs: 'Huelgos calibrados' },
            { id: 'p2', descripcion: 'Cerraduras de seguridad con pestillo duro', estado: 'Leve', obs: 'Lubricación con grafito en polvo' },
            { id: 'p3', descripcion: 'Brazos cierrapuertas hidráulicos con fuga de aceite', estado: 'Ninguna', obs: 'Cierrapuertas regulados' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Calibración de velocidad de cierrapuertas aéreos', frecuencia: 'Cada 6 meses', accion: 'Ajuste de válvulas de golpe final' },
        { tarea: 'Mantenimiento integral de cerrajería y manijones', frecuencia: 'Cada 6 meses', accion: 'Ajuste de tornillos prisioneros' }
      ]
    },
    {
      id: 'PL-10',
      codigo: 'FICHA N° 10',
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: 'Mobiliario Edilicio Judicial Fijo y Mostradores',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Mesas de Entradas, Estrados y Despachos',
      nivel: 'Planta Baja y Juzgados',
      inspector: 'Di Gregori, Gabriel',
      fecha: '15/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R10-1',
          nombre: 'Mobiliario Institucional de Madera y Paneles Acústicos',
          patologias: [
            { id: 'p1', descripcion: 'Mostradores de atención con cantos despegados', estado: 'Ninguna', obs: 'Laminado adherido' },
            { id: 'p2', descripcion: 'Bisagras o correderas telescópicas dañadas', estado: 'Ninguna', obs: 'Cajoneras operativas' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Ajuste mecánico de herrajes en mostradores y estrados', frecuencia: 'Cada 6 meses', accion: 'Fijación de refuerzos' },
        { tarea: 'Lustre y barnizado de maderas nobles de estrado', frecuencia: 'Cada 1 año', accion: 'Aplicación de cera protectora' }
      ]
    },

    // GRUPO II: INSTALACIONES CRÍTICAS
    {
      id: 'PL-11',
      codigo: 'FICHA N° 11',
      grupoId: 'instalaciones-criticas',
      grupoNombre: 'GRUPO II: INSTALACIONES CRÍTICAS',
      titulo: 'Instalación Eléctrica General y Tableros Seccionales',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Sala de Tableros en Subsuelo y Gabinetes por Piso',
      nivel: '1° Subsuelo y Pisos 1° a 6°',
      inspector: 'Di Gregori, Ramón',
      fecha: '04/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R11-1',
          nombre: 'Tablero General de Baja Tensión (TGBT) y Seccionales',
          patologias: [
            { id: 'p1', descripcion: 'Puntos calientes en bornes por falso contacto', estado: 'Ninguna', obs: 'Termografía normal (<35°C)' },
            { id: 'p2', descripcion: 'Falta de identificación y rotulado reglamentario', estado: 'Ninguna', obs: 'Leyendas actualizadas' },
            { id: 'p3', descripcion: 'Interruptores diferenciales que no disparan con test', estado: 'Ninguna', obs: 'Disparo en 22ms certificado' }
          ]
        },
        {
          id: 'R11-2',
          nombre: 'Puesta a Tierra y Conexiones Equipotenciales',
          patologias: [
            { id: 'p4', descripcion: 'Resistencia de puesta a tierra mayor a 5 Ohms', estado: 'Ninguna', obs: 'Valor medido: 2.1 Ohms con telurímetro' },
            { id: 'p5', descripcion: 'Falta de tapa en cámara de inspección de jabalina', estado: 'Ninguna', obs: 'Cámara limpia' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Termografía infrarroja en barras y protecciones', frecuencia: 'Cada 1 mes', accion: 'Relevamiento con cámara FLIR' },
        { tarea: 'Reapriete de borneras y limpieza con aspiradora dieléctrica', frecuencia: 'Cada 3 meses', accion: 'Torque reglamentario según fabricante' },
        { tarea: 'Medición de resistencia de jabalina PAT', frecuencia: 'Cada 6 meses', accion: 'Protocolo SRT 900/15' }
      ]
    },
    {
      id: 'PL-12',
      codigo: 'FICHA N° 12',
      grupoId: 'instalaciones-criticas',
      grupoNombre: 'GRUPO II: INSTALACIONES CRÍTICAS',
      titulo: 'Iluminación General y Alumbrado de Emergencia',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Salas de Despacho, Pasillos y Escaleras de Evacuación',
      nivel: 'Todos los Niveles',
      inspector: 'Di Gregori, Gabriel',
      fecha: '03/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R12-1',
          nombre: 'Luminarias LED y Paneles 60x60',
          patologias: [
            { id: 'p1', descripcion: 'Tubos o paneles parpadeantes o quemados', estado: 'Leve', obs: '2 tubos reemplazados en Secretaría Penal' },
            { id: 'p2', descripcion: 'Drivers con recalentamiento o zumbido', estado: 'Ninguna', obs: 'Operación silenciosa' }
          ]
        },
        {
          id: 'R12-2',
          nombre: 'Luces Autónomas de Emergencia y Carteles de Salida',
          patologias: [
            { id: 'p3', descripcion: 'Autonomía de batería inferior a 90 minutos', estado: 'Ninguna', obs: 'Baterías de gel cargadas' },
            { id: 'p4', descripcion: 'Cartelería EXIT sin iluminación', estado: 'Ninguna', obs: 'Señalización activa' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Simulación de corte y prueba de autonomía de luces de emergencia', frecuencia: 'Cada 1 mes', accion: 'Verificación de 2 horas continuas' },
        { tarea: 'Relevamiento fotométrico de luxes en puestos de trabajo', frecuencia: 'Cada 6 meses', accion: 'Cumplimiento Norma IRAM-AADL J20-06' }
      ]
    },
    {
      id: 'PL-13',
      codigo: 'FICHA N° 13',
      grupoId: 'instalaciones-criticas',
      grupoNombre: 'GRUPO II: INSTALACIONES CRÍTICAS',
      titulo: 'Instalaciones Sanitarias y Distribución de Agua Potable',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Núcleos Húmedos y Columnas Montantes',
      nivel: 'Subsuelos a Azotea',
      inspector: 'Di Gregori, Ramón',
      fecha: '28/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R13-1',
          nombre: 'Cañerías de Termofusión y Colectores de Bajada',
          patologias: [
            { id: 'p1', descripcion: 'Goteo en uniones o llaves esféricas agarrotadas', estado: 'Ninguna', obs: 'Llaves lubricadas maniobrables' },
            { id: 'p2', descripcion: 'Golpe de ariete al cerrar griferías monocomando', estado: 'Ninguna', obs: 'Presión amortiguada' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Maniobra de apertura y cierre de llaves de paso maestras', frecuencia: 'Cada 1 mes', accion: 'Evitar engrane por sarro' },
        { tarea: 'Desinfección de cañerías y control de cloro libre', frecuencia: 'Cada 6 meses', accion: 'Análisis bacteriológico y físico-químico' }
      ]
    },
    {
      id: 'PL-14',
      codigo: 'FICHA N° 14',
      grupoId: 'instalaciones-criticas',
      grupoNombre: 'GRUPO II: INSTALACIONES CRÍTICAS',
      titulo: 'Reserva de Agua Potable y Equipos de Bombeo',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Cisterna 2° Subsuelo y Tanques de Reserva en Azotea',
      nivel: '2° Subsuelo y Azotea',
      inspector: 'Di Gregori, Ramón',
      fecha: '02/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R14-1',
          nombre: 'Cisterna y Tanques de Reserva',
          patologias: [
            { id: 'p1', descripcion: 'Sedimentos o turbidez en el fondo del tanque', estado: 'Ninguna', obs: 'Agua cristalina' },
            { id: 'p2', descripcion: 'Tapas herméticas rotas o sin burlete sanitario', estado: 'Ninguna', obs: 'Tapa estanca colocada' }
          ]
        },
        {
          id: 'R14-2',
          nombre: 'Cuadro de Bombas de Elevación y Alternador',
          patologias: [
            { id: 'p3', descripcion: 'Pérdida por sello mecánico o rodamientos ruidosos', estado: 'Ninguna', obs: 'Presión 3.8 bar conforme' },
            { id: 'p4', descripcion: 'Falla en conmutación automática de bombas 1 y 2', estado: 'Ninguna', obs: 'Alternancia operativa' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Lavado, cepillado y cloración de tanques y cisterna', frecuencia: 'Cada 6 meses', accion: 'Certificado de potabilidad oficial' },
        { tarea: 'Control de consumo de corriente (Amperios) y alternancia', frecuencia: 'Cada 1 mes', accion: 'Verificación en tablero eléctrico' }
      ]
    },
    {
      id: 'PL-15',
      codigo: 'FICHA N° 15',
      grupoId: 'instalaciones-criticas',
      grupoNombre: 'GRUPO II: INSTALACIONES CRÍTICAS',
      titulo: 'Red Fija Contra Incendio y Puertas Cortafuego',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Gabinete de Hidrantes por Piso y Escalera de Incendio',
      nivel: 'Todos los Niveles',
      inspector: 'Di Gregori, Gabriel',
      fecha: '27/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R15-1',
          nombre: 'Gabinetes con Manguera de Incendio 1 3/4" y Lanza',
          patologias: [
            { id: 'p1', descripcion: 'Manguera reseca, vencida o sin prueba hidráulica', estado: 'Ninguna', obs: 'Mangueras IRAM con sello vigente' },
            { id: 'p2', descripcion: 'Válvula de incendio trabada o con pérdida', estado: 'Ninguna', obs: 'Volantes accesibles' },
            { id: 'p3', descripcion: 'Vidrio de gabinete roto o sin llave de desarme', estado: 'Ninguna', obs: 'Cerraduras sin traba' }
          ]
        },
        {
          id: 'R15-2',
          nombre: 'Puertas Cortafuego RF-60 / RF-90 con Barra Antipánico',
          patologias: [
            { id: 'p4', descripcion: 'Puerta que no cierra automáticamente por sí sola', estado: 'Ninguna', obs: 'Cierre hermético ensayado' },
            { id: 'p5', descripcion: 'Barra antipánico trabada o sin juego libre', estado: 'Ninguna', obs: 'Acción inmediata suave' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección de presión de red de hidrantes y manómetros', frecuencia: 'Cada 3 meses', accion: 'Lectura de presostato de cuadro contra incendio' },
        { tarea: 'Prueba hidráulica reglamentaria de mangueras', frecuencia: 'Cada 1 año', accion: 'Ensayo a 12 kg/cm² bajo Norma IRAM 3594' }
      ]
    },
    {
      id: 'PL-16',
      codigo: 'FICHA N° 16',
      grupoId: 'instalaciones-criticas',
      grupoNombre: 'GRUPO II: INSTALACIONES CRÍTICAS',
      titulo: 'Instalación de Gas Natural y Calefactores',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Gabinete de Gas en Vereda y Cañería Epoxi',
      nivel: 'Línea Municipal y Dependencias',
      inspector: 'Di Gregori, Ramón',
      fecha: '14/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R16-1',
          nombre: 'Válvula Reguladora y Nicho de Vereda',
          patologias: [
            { id: 'p1', descripcion: 'Olor a mercaptano o fuga de gas comprobada con espuma', estado: 'Ninguna', obs: 'Instalación 100% estanca' },
            { id: 'p2', descripcion: 'Rejillas de ventilación reglamentarias obstruidas', estado: 'Ninguna', obs: 'Ventilación permanente libre' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Detección de pérdidas con detector electrónico de metano', frecuencia: 'Cada 6 meses', accion: 'Revisión en nicho y uniones roscadas' },
        { tarea: 'Limpieza de mecheros y calibración de termocuplas', frecuencia: 'Cada 6 meses', accion: 'Ensayo de corte por ausencia de llama' }
      ]
    },

    // GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS
    {
      id: 'PL-17',
      codigo: 'FICHA N° 17',
      grupoId: 'servicios-contratados',
      grupoNombre: 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS',
      titulo: 'Climatización Central e Individual (HVAC VRF y Splits)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Azotea (Condensadoras) y Oficinas (Evaporadoras)',
      nivel: 'Edificio Integral',
      inspector: 'Santiago Gigena',
      fecha: '05/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R17-1',
          nombre: 'Unidades VRF Centrales y Chillers',
          patologias: [
            { id: 'p1', descripcion: 'Filtros de aire sucios o colmatados de polvo', estado: 'Leve', obs: 'Lavado preventivo de mallas' },
            { id: 'p2', descripcion: 'Drenaje de condensado tapado con riesgo de desborde', estado: 'Ninguna', obs: 'Mangueras con libre escurrimiento' },
            { id: 'p3', descripcion: 'Falta de gas refrigerante R-410A por fuga', estado: 'Ninguna', obs: 'Presiones de succión normales' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Limpieza de filtros y desinfección de bandejas de condensado', frecuencia: 'Cada 1 mes', accion: 'Aplicación de pastillas biocidas' },
        { tarea: 'Medición de presiones de gas y consumo de compresores', frecuencia: 'Cada 3 meses', accion: 'Control de ciclo frigorífico' }
      ]
    },
    {
      id: 'PL-18',
      codigo: 'FICHA N° 18',
      grupoId: 'servicios-contratados',
      grupoNombre: 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS',
      titulo: 'Transporte Vertical (Ascensores Principales y Montacargas)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Sala de Máquinas en Azotea y Cabinas 1, 2 y 3',
      nivel: 'Recorrido Subsuelos a 6° Piso',
      inspector: 'Empresa Conservadora / Di Gregori, Ramón',
      fecha: '01/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R18-1',
          nombre: 'Cabinas y Mecanismos de Tracción',
          patologias: [
            { id: 'p1', descripcion: 'Desnivelación de parada respecto al piso mayor a 5mm', estado: 'Ninguna', obs: 'Nivelación milimétrica por variador' },
            { id: 'p2', descripcion: 'Freno electromagnético con desgaste en zapatas', estado: 'Ninguna', obs: 'Frenado firme sin vibración' },
            { id: 'p3', descripcion: 'Sensor de cortina infrarroja de puerta defectuoso', estado: 'Ninguna', obs: 'Reversa automática inmediata' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Mantenimiento mensual reglamentario con Libro de Ascensores', frecuencia: 'Cada 1 mes', accion: 'Visita técnica y firma de profesional habilitado' },
        { tarea: 'Ensayo de paracaídas y limitador de velocidad', frecuencia: 'Cada 1 año', accion: 'Prueba de acuñamiento con carga' }
      ]
    },
    {
      id: 'PL-19',
      codigo: 'FICHA N° 19',
      grupoId: 'servicios-contratados',
      grupoNombre: 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS',
      titulo: 'Grupo Electrógeno de Emergencia y Tablero TTA',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Sala de Generador - Patio Posterior',
      nivel: 'Planta Baja Exterior',
      inspector: 'Di Gregori, Ramón',
      fecha: '04/11/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R19-1',
          nombre: 'Motor Diesel Cummins 150 kVA y Alternador',
          patologias: [
            { id: 'p1', descripcion: 'Nivel de combustible gasoil inferior a 3/4 de tanque', estado: 'Ninguna', obs: 'Tanque al 90% (360 Litros)' },
            { id: 'p2', descripcion: 'Baterías de arranque de 24V descalibradas', estado: 'Ninguna', obs: 'Cargador flotante en 27.4V' },
            { id: 'p3', descripcion: 'Falla en conmutación automática de la llave TTA', estado: 'Ninguna', obs: 'Transferencia en 8 segundos' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Arranque de prueba en vacío y con carga parcial', frecuencia: 'Cada 1 mes', accion: 'Marcha de 15 minutos para lubricación' },
        { tarea: 'Cambio de aceite lubricante 15W40 y filtros de combustible/aire', frecuencia: 'Cada 1 año', accion: 'Service general por 250 horas' }
      ]
    },
    {
      id: 'PL-20',
      codigo: 'FICHA N° 20',
      grupoId: 'servicios-contratados',
      grupoNombre: 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS',
      titulo: 'Matafuegos y Extintores Portátiles (ABC, CO2 y Agua)',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Puestos de Extinción en Pasillos, Salas y Archivos',
      nivel: 'Todos los Niveles',
      inspector: 'Di Gregori, Gabriel',
      fecha: '24/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R20-1',
          nombre: 'Extintores de Polvo Químico Seco ABC 5kg y CO2 5kg',
          patologias: [
            { id: 'p1', descripcion: 'Manómetro despresurizado fuera del rango verde', estado: 'Ninguna', obs: 'Presión correcta a 14 kg/cm²' },
            { id: 'p2', descripcion: 'Tarjeta de habilitación municipal o marbete vencido', estado: 'Ninguna', obs: 'Marbetes con vigencia 2026/2027' },
            { id: 'p3', descripcion: 'Extintor sin chapa baliza reflectiva o altura reglamentaria', estado: 'Ninguna', obs: 'Montados a 1.20m del suelo' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección ocular de precintos y manómetros', frecuencia: 'Cada 3 meses', accion: 'Control de pasadores y mangueras' },
        { tarea: 'Recarga y control de carga anual reglamentaria IRAM', frecuencia: 'Cada 1 año', accion: 'Retiro y entrega por empresa certificada' }
      ]
    },
    {
      id: 'PL-21',
      codigo: 'FICHA N° 21',
      grupoId: 'servicios-contratados',
      grupoNombre: 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS',
      titulo: 'Servicio de Desinfección, Desinsectación y Control de Plagas',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: 'Cámaras Sépticas, Archivos del Subsuelo y Cocinas',
      nivel: 'Subsuelos y Edificio General',
      inspector: 'Empresa Prestadora / Santiago Gigena',
      fecha: '19/10/2026',
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: 'R21-1',
          nombre: 'Cebaderas de Roedores y Pulverización Antivectorial',
          patologias: [
            { id: 'p1', descripcion: 'Cebaderas dañadas o sin reposición de rodenticida', estado: 'Ninguna', obs: 'Cebos intactos numerados' },
            { id: 'p2', descripcion: 'Presencia de vectores en depósitos de expedientes', estado: 'Ninguna', obs: 'Área libre de plagas' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Fumigación y aplicación de gel cucarachicida', frecuencia: 'Cada 1 mes', accion: 'Aplicación fuera de horario de atención judicial' },
        { tarea: 'Desratización y reposición de estaciones de monitoreo', frecuencia: 'Cada 1 mes', accion: 'Revisión en túneles y subsuelos' }
      ]
    }
  ]);

  // Filtros activos para el Catálogo de Fichas
  const [fichasSearchTerm, setFichasSearchTerm] = useState('');
  const [fichasGrupoTab, setFichasGrupoTab] = useState('all'); // 'all' | 'sistema-edilicio' | 'instalaciones-criticas' | 'servicios-contratados'

  // Wizard Asistente para Crear / Modificar Planilla
  const [isFichaWizardOpen, setIsFichaWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(1); // 1: Encabezado | 2: Rubros/Patologías | 3: Cronograma | 4: Guardar/Finalizar
  const [editingFichaData, setEditingFichaData] = useState(null);
  const [isCreatingNewFicha, setIsCreatingNewFicha] = useState(false);

  // Modal de Impresión Oficial A4 en 2 Páginas
  const [isFichaPrintModalOpen, setIsFichaPrintModalOpen] = useState(false);
  const [printingFicha, setPrintingFicha] = useState(null);

  // Bloqueo del scroll del body cuando los modales de la planilla están abiertos
  React.useEffect(() => {
    if (isFichaWizardOpen || isFichaPrintModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isFichaWizardOpen, isFichaPrintModalOpen]);

  // Funciones para el Wizard de Planillas
  const handleOpenCreateFicha = () => {
    const nextNum = (fichasEdiliciasData.length + 1).toString().padStart(2, '0');
    setEditingFichaData({
      id: `PL-${nextNum}`,
      codigo: `FICHA N° ${nextNum}`,
      grupoId: 'sistema-edilicio',
      grupoNombre: 'GRUPO I: SISTEMA EDILICIO',
      titulo: '',
      edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
      sector: '',
      nivel: 'Planta Baja',
      inspector: 'Di Gregori, Ramón',
      fecha: new Date().toLocaleDateString('es-AR'),
      motivo: 'Periódica / Preventiva',
      rubros: [
        {
          id: `R-${Date.now()}`,
          nombre: 'Sector Constructivo Principal',
          patologias: [
            { id: 'p1', descripcion: 'Fisuras o desprendimientos superficiales', estado: 'Ninguna', obs: '' },
            { id: 'p2', descripcion: 'Humedad, filtración o estanqueidad comprometida', estado: 'Ninguna', obs: '' }
          ]
        }
      ],
      cronograma: [
        { tarea: 'Inspección ocular periódica', frecuencia: 'Cada 3 meses', accion: 'Revisión técnica de campo' },
        { tarea: 'Limpieza y mantenimiento preventivo', frecuencia: 'Cada 6 meses', accion: 'Trabajos de conservación' }
      ]
    });
    setIsCreatingNewFicha(true);
    setWizardStep(1);
    setIsFichaWizardOpen(true);
  };

  const handleOpenEditFicha = (ficha) => {
    setEditingFichaData(JSON.parse(JSON.stringify(ficha)));
    setIsCreatingNewFicha(false);
    setWizardStep(1);
    setIsFichaWizardOpen(true);
  };

  const handleSaveFichaWizard = (andPrint = false) => {
    if (!editingFichaData.titulo.trim()) {
      alert('Por favor ingrese el título técnico de la ficha de inspección.');
      setWizardStep(1);
      return;
    }

    if (isCreatingNewFicha) {
      setFichasEdiliciasData(prev => [editingFichaData, ...prev]);

      // Sincronizar automáticamente en el Cronograma / Diagrama de Gantt
      setInspectionSheets(prev => {
        const nextId = prev.length > 0 ? Math.max(...prev.map(s => s.id)) + 1 : 1;
        const mappedGrupo = editingFichaData.grupoId === 'sistema-edilicio' 
          ? 'Envolventes y Sistemas Constructivos' 
          : editingFichaData.grupoId === 'instalaciones-criticas' 
          ? 'Instalaciones Críticas' 
          : 'Servicios';

        // Inferir frecuencia del primer ítem del cronograma o valor por defecto
        const defaultFreq = editingFichaData.cronograma?.[0]?.frecuencia?.replace('Cada ', '') || 'Trimestral';

        return [
          ...prev,
          {
            id: nextId,
            fichaIdRef: editingFichaData.id,
            code: editingFichaData.codigo,
            grupo: mappedGrupo,
            nombre: editingFichaData.titulo,
            freq: defaultFreq,
            color: editingFichaData.grupoId === 'sistema-edilicio' ? 'bg-blue-600' : editingFichaData.grupoId === 'instalaciones-criticas' ? 'bg-amber-600' : 'bg-purple-600',
            weeks: [1, 13, 25, 37],
            completedWeeks: []
          }
        ];
      });
    } else {
      setFichasEdiliciasData(prev => prev.map(f => f.id === editingFichaData.id ? editingFichaData : f));

      // Sincronizar en tiempo real el nombre, código y grupo en el Diagrama de Gantt
      setInspectionSheets(prev => prev.map(s => {
        // Enlace por código oficial (ej: 'FICHA N° 01' o 'PL-01') o id de referencia
        const matchesRef = s.fichaIdRef === editingFichaData.id || 
                           s.code === editingFichaData.id || 
                           s.code === editingFichaData.codigo ||
                           s.id.toString() === editingFichaData.id.replace('PL-', '');
        if (matchesRef) {
          const mappedGrupo = editingFichaData.grupoId === 'sistema-edilicio' 
            ? 'Envolventes y Sistemas Constructivos' 
            : editingFichaData.grupoId === 'instalaciones-criticas' 
            ? 'Instalaciones Críticas' 
            : 'Servicios';
          const defaultFreq = editingFichaData.cronograma?.[0]?.frecuencia?.replace('Cada ', '') || s.freq;

          return {
            ...s,
            code: editingFichaData.codigo,
            nombre: editingFichaData.titulo,
            grupo: mappedGrupo,
            freq: defaultFreq
          };
        }
        return s;
      }));
    }

    setIsFichaWizardOpen(false);

    if (andPrint) {
      setPrintingFicha(editingFichaData);
      setIsFichaPrintModalOpen(true);
    }
  };

  // Función directa para abrir la previsualización oficial A4
  const handleOpenPrintFicha = (ficha) => {
    setPrintingFicha(ficha);
    setIsFichaPrintModalOpen(true);
  };

  // Impresión nativa limpia con 2 páginas calibradas exactamente idénticas a la pantalla
  const handleExecutePrintFicha = (ficha) => {
    const f = ficha || printingFicha;
    if (!f) return;

    const printWin = window.open('', '_blank', 'width=1000,height=900');
    if (!printWin) {
      alert('El navegador bloqueó la vista previa. Permita las ventanas emergentes para este sitio y vuelva a intentarlo.');
      return;
    }

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>Ficha_Tecnica_Edilicia_${(f.codigo || 'FICHA').replace(/\\s+/g, '_')}</title>
        <style>
          @page {
            size: A4 portrait;
            margin: 8mm 10mm 8mm 10mm;
          }
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
            color: #1c2d42;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page {
            width: 100%;
            height: 280mm;
            max-height: 280mm;
            overflow: hidden;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            background: white;
            box-sizing: border-box;
          }
          .page-1 {
            page-break-after: always !important;
            break-after: page !important;
          }
          .page-2 {
            page-break-before: always !important;
            break-before: page !important;
          }
          .header-box {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            border-bottom: 2px solid #0f2d59;
            padding-bottom: 6px;
            margin-bottom: 8px;
          }
          .logo-area {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo-img {
            width: 48px;
            height: 54px;
            object-fit: contain;
          }
          .inst-pjn {
            font-family: Georgia, serif;
            font-weight: 900;
            font-size: 11px;
            color: #0f2d59;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .inst-cft {
            font-family: Georgia, serif;
            font-weight: 900;
            font-size: 12.5px;
            color: #0f2d59;
            letter-spacing: 0.3px;
            text-transform: uppercase;
          }
          .inst-intendencia {
            font-weight: 800;
            font-size: 10px;
            color: #1e293b;
            letter-spacing: 0.8px;
            text-transform: uppercase;
          }
          .badge-box {
            text-align: right;
          }
          .badge-num {
            background: #0f2d59;
            color: white;
            font-family: monospace;
            font-weight: bold;
            font-size: 11px;
            padding: 3px 10px;
            border-radius: 6px;
            display: inline-block;
          }
          .badge-date {
            font-size: 9px;
            color: #64748b;
            font-weight: 600;
            margin-top: 3px;
          }
          .bar-title {
            background: #0f2d59;
            color: white;
            text-align: center;
            padding: 4px;
            font-weight: 900;
            font-size: 11px;
            letter-spacing: 1.5px;
            border-radius: 4px;
            margin-bottom: 8px;
            text-transform: uppercase;
          }
          .sec-box {
            border: 1.5px solid #0f2d59;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 7px;
            font-size: 9.5px;
          }
          .sec-hdr {
            background: #0f2d59;
            color: white;
            font-weight: bold;
            padding: 3px 8px;
            font-size: 9.5px;
            letter-spacing: 0.5px;
            text-transform: uppercase;
          }
          .grid-2 {
            display: flex;
          }
          .grid-col {
            flex: 1;
            padding: 5px 8px;
          }
          .grid-col:first-child {
            border-right: 1px solid #cbd5e1;
          }
          .grid-col p {
            margin: 2.5px 0;
            line-height: 1.3;
          }
          .matrix-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
          }
          .matrix-table th {
            background: #dce5ee;
            color: #0f2d59;
            font-weight: 800;
            padding: 4px 6px;
            border-bottom: 1.5px solid #0f2d59;
            text-transform: uppercase;
          }
          .matrix-table td {
            padding: 3px 6px;
            border-bottom: 1px solid #cbd5e1;
          }
          .matrix-group-row td {
            background: #eef4f9;
            color: #0f2d59;
            font-weight: 800;
            text-transform: uppercase;
            font-size: 9px;
            letter-spacing: 0.4px;
            padding: 3px 6px;
          }
          .circle-opt {
            display: inline-block;
            width: 13px;
            height: 13px;
            border-radius: 50%;
            border: 1.5px solid #475569;
            background: white;
            vertical-align: middle;
          }
          .obs-dynamic-box {
            flex: 1;
            display: flex;
            flex-direction: column;
            border: 1.5px solid #0f2d59;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 4px;
            min-height: 130px;
          }
          .obs-ruled-bg {
            flex: 1;
            padding: 6px 10px;
            background-color: white;
            background-image: repeating-linear-gradient(to bottom, transparent, transparent 27px, #cbd5e1 27px, #cbd5e1 28px);
            min-height: 120px;
          }
          .eval-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9.5px;
          }
          .eval-table td {
            padding: 5px 8px;
            border-bottom: 1px solid #cbd5e1;
          }
          .eval-table td:first-child {
            width: 30%;
            font-weight: bold;
            background: #f8fafc;
            border-right: 1px solid #cbd5e1;
          }
          .crono-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 9px;
          }
          .crono-table td {
            padding: 5px 8px;
            border-bottom: 1px solid #e2e8f0;
          }
          .crono-type-td {
            width: 140px;
            text-align: center;
            background: #f8fafc;
            border-right: 1px solid #e2e8f0;
          }
          .crono-type-name {
            font-weight: 900;
            font-size: 9.5px;
            color: #0f2d59;
            text-transform: uppercase;
          }
          .crono-type-freq {
            font-size: 8.5px;
            color: #475569;
            font-weight: bold;
          }
          .sig-container {
            border: 1.5px solid #0f2d59;
            border-radius: 4px;
            padding: 8px 14px;
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            background: #fafbfc;
            margin-top: 8px;
            margin-bottom: 4px;
          }
          .sig-line-area {
            width: 250px;
            text-align: center;
          }
          .sig-line-area .rubrica-txt {
            font-style: italic;
            font-size: 9px;
            color: #64748b;
            margin-bottom: 2px;
          }
          .sig-line-area .line {
            border-bottom: 1.5px solid #0f2d59;
            margin-bottom: 3px;
          }
          .sig-line-area .sig-name {
            font-weight: 900;
            text-transform: uppercase;
            font-size: 10px;
            color: #0f2d59;
            letter-spacing: 0.5px;
          }
          .footer-strip {
            text-align: right;
            font-size: 8px;
            font-family: monospace;
            color: #64748b;
            padding-top: 3px;
            border-top: 1px solid #e2e8f0;
          }
          .action-bar {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #0f2d59;
            padding: 8px 12px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.25);
            display: flex;
            gap: 8px;
            z-index: 9999;
          }
          .action-btn {
            background: white;
            color: #0f2d59;
            border: none;
            padding: 6px 14px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            font-size: 11px;
          }
          .action-btn.primary {
            background: #22c55e;
            color: white;
          }
          @media print {
            .action-bar { display: none !important; }
            html, body { width: 100% !important; margin: 0 !important; }
            .page-1 {
              height: 280mm !important;
              max-height: 280mm !important;
              page-break-after: always !important;
              break-after: page !important;
            }
            .page-2 {
              height: 280mm !important;
              max-height: 280mm !important;
              page-break-before: always !important;
              break-before: page !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="action-bar">
          <button class="action-btn primary" onclick="window.print()">🖨️ Imprimir 2 Páginas / Guardar PDF</button>
          <button class="action-btn" onclick="window.close()">✕ Cerrar</button>
        </div>

        <!-- ========================================== -->
        <!-- PÁGINA 1: IDÉNTICA A LA PREVISUALIZACIÓN    -->
        <!-- ========================================== -->
        <div class="page page-1">
          <div style="flex: 1; display: flex; flex-direction: column;">
            <!-- Membrete Oficial Idéntico -->
            <div class="header-box">
              <div class="logo-area">
                <img 
                  src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" 
                  alt="Escudo PJN" 
                  class="logo-img"
                />
                <div>
                  <div class="inst-pjn">Poder Judicial de la Nación</div>
                  <div class="inst-cft">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                  <div class="inst-intendencia">INTENDENCIA</div>
                </div>
              </div>
              <div class="badge-box">
                <div class="badge-num">Nº FICHA: ${f.codigo || 'FICHA N° 01'}</div>
                <div class="badge-date">Fecha: ____ / ____ / ________</div>
              </div>
            </div>

            <div class="bar-title">
              REGISTRO DE INSPECCIONES DE MANTENIMIENTO PREVENTIVO — ${(f.titulo || '').toUpperCase()}
            </div>

            <!-- 1. DATOS DE LOCALIZACIÓN Y RELEVANTE -->
            <div class="sec-box">
              <div class="sec-hdr">1. DATOS DE LOCALIZACIÓN Y RELEVANTE</div>
              <div class="grid-2">
                <div class="grid-col">
                  <p><strong>Edificio:</strong> ${f.edificio || 'Edificio Central CFT'}</p>
                  <p><strong>Sector Analizado:</strong> ${f.sector || 'Fachada Principal y Perimetral'}</p>
                  <p><strong>Nivel:</strong> ${f.nivel || 'Niveles 1 a 4'}</p>
                  <p><strong>Última Inspección:</strong> ________________________</p>
                </div>
                <div class="grid-col">
                  <p><strong>Inspector Técnico:</strong> ________________________</p>
                  <p><strong>Fecha de Inspección:</strong> ____ / ____ / ________</p>
                  <div style="margin-top: 3px;">
                    <strong style="display: block; margin-bottom: 2px;">Motivo de la Inspección:</strong>
                    <div style="margin-bottom: 2px;">
                      <span class="circle-opt"></span>
                      <span>Inspección Periódica (preventiva)</span>
                    </div>
                    <div>
                      <span class="circle-opt"></span>
                      <span>Solicitud de Mantenimiento (correctivo)</span>
                    </div>
                  </div>
                </div>
              </div>
              <div style="padding: 4px 8px; border-top: 1px solid #cbd5e1; background: #f8fafc; font-size: 9px;">
                <strong>Descripción técnica:</strong>
                <div style="margin-top: 2px; padding: 4px 6px; background: white; border: 1px solid #dce5ee; border-radius: 3px;">
                  ${f.descripcionCabecera || 'Relevamiento preventivo, inspección de conservación, fijaciones mecánicas, sellados y estanqueidad.'}
                </div>
              </div>
            </div>

            <!-- 2. RELEVAMIENTO DE CAMPO (DETERIOROS Y CONDICIÓN) -->
            <div class="sec-box">
              <div class="sec-hdr">2. RELEVAMIENTO DE CAMPO (DETERIOROS Y CONDICIÓN)</div>
              <table class="matrix-table">
                <thead>
                  <tr>
                    <th style="width: 44%; text-align: left;">DETERIORO / FALLA</th>
                    <th colspan="3" style="width: 24%; text-align: center; border-left: 1.5px solid #0f2d59; border-right: 1.5px solid #0f2d59;">
                      CONDICION DEL DETERIORO/FALLA
                      <div style="display: flex; justify-content: space-around; border-top: 1px solid #0f2d59; margin-top: 2px; padding-top: 1px; font-size: 8px;">
                        <span>NINGUNA</span>
                        <span>LEVE</span>
                        <span>GRAVE</span>
                      </div>
                    </th>
                    <th style="width: 32%; text-align: left;">OBSERVACIONES (A MANO)</th>
                  </tr>
                </thead>
                <tbody>
                  ${(f.rubros && f.rubros.length > 0) ? f.rubros.map(r => `
                    <tr class="matrix-group-row">
                      <td colspan="5">${r.nombre}</td>
                    </tr>
                    ${r.patologias.map(p => `
                      <tr>
                        <td>${p.descripcion}</td>
                        <td style="width: 8%; text-align: center; border-left: 1px solid #cbd5e1;">
                          <span class="circle-opt"></span>
                        </td>
                        <td style="width: 8%; text-align: center; border-left: 1px solid #cbd5e1; border-right: 1px solid #cbd5e1;">
                          <span class="circle-opt"></span>
                        </td>
                        <td style="width: 8%; text-align: center; border-right: 1px solid #cbd5e1;">
                          <span class="circle-opt"></span>
                        </td>
                        <td style="border-bottom: 1px dashed #cbd5e1; height: 18px;"></td>
                      </tr>
                    `).join('')}
                  `).join('') : `
                    <tr><td colspan="5" style="text-align: center; color: #64748b; padding: 10px;">Sin patologías definidas.</td></tr>
                  `}
                </tbody>
              </table>
            </div>

            <!-- 3. OBSERVACIONES ADICIONALES Y NOTAS EN CAMPO (Dinámico hasta abajo) -->
            <div class="obs-dynamic-box">
              <div class="sec-hdr">3. OBSERVACIONES ADICIONALES Y NOTAS EN CAMPO</div>
              <div class="obs-ruled-bg">
                <div style="font-size: 9px; color: #94a3b8; font-family: monospace;">01.</div>
              </div>
            </div>
          </div>

          <div class="footer-strip">
            PODER JUDICIAL DE LA NACIÓN · CÁMARA FEDERAL DE TUCUMÁN — HOJA 1 DE 2
          </div>
        </div>

        <!-- ========================================== -->
        <!-- PÁGINA 2: IDÉNTICA A LA PREVISUALIZACIÓN    -->
        <!-- ========================================== -->
        <div class="page page-2">
          <div style="flex: 1; display: flex; flex-direction: column;">
            <!-- Membrete Oficial Hoja 2 -->
            <div class="header-box">
              <div class="logo-area">
                <img 
                  src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" 
                  alt="Escudo PJN" 
                  class="logo-img"
                />
                <div>
                  <div class="inst-pjn">Poder Judicial de la Nación</div>
                  <div class="inst-cft">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                  <div class="inst-intendencia">INTENDENCIA — SÍNTESIS DIAGNÓSTICA Y CRONOGRAMA</div>
                </div>
              </div>
              <div class="badge-box">
                <div class="badge-num">${f.codigo || 'FICHA N° 01'} (Carilla 2)</div>
              </div>
            </div>

            <div class="bar-title">
              RESUMEN DE LA INSPECCIÓN Y PLAN PREVENTIVO REGLAMENTARIO
            </div>

            <!-- 4. SÍNTESIS DIAGNÓSTICA DEL ESTADO EDILICIO -->
            <div class="sec-box">
              <div class="sec-hdr">4. SÍNTESIS DIAGNÓSTICA DEL ESTADO EDILICIO</div>
              <table class="eval-table">
                <tbody>
                  <tr>
                    <td>Condición General</td>
                    <td>
                      <span class="circle-opt"></span> Aceptable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Regular &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Deficiente
                    </td>
                  </tr>
                  <tr>
                    <td>Plazo de Intervención</td>
                    <td>
                      <span class="circle-opt"></span> Ninguno &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Programable &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Urgente
                    </td>
                  </tr>
                  <tr>
                    <td>Intervención Requerida</td>
                    <td>
                      <span class="circle-opt"></span> Ninguno &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Reparación &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Sustitución / renovación
                    </td>
                  </tr>
                  <tr>
                    <td>Periodicidad de Inspección</td>
                    <td>
                      <span class="circle-opt"></span> Mensual &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Trimestral &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <span class="circle-opt"></span> Semestral
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="background: white; padding: 6px 8px;">
                      <div style="font-weight: bold; font-size: 9.5px; color: #0f2d59; margin-bottom: 4px;">Observaciones Generales de Dictamen (A mano):</div>
                      <div style="border-bottom: 1px dashed #94a3b8; height: 18px;"></div>
                      <div style="border-bottom: 1px dashed #94a3b8; height: 18px;"></div>
                      <div style="border-bottom: 1px dashed #94a3b8; height: 18px;"></div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- 5. CRONOGRAMA DE INSPECCIONES Y MANTENIMIENTO PREVENTIVO -->
            <div class="sec-box">
              <div class="sec-hdr">5. CRONOGRAMA DE INSPECCIONES Y MANTENIMIENTO PREVENTIVO</div>
              <table class="crono-table">
                <tbody>
                  ${(f.cronograma && f.cronograma.length > 0) ? f.cronograma.map(c => `
                    <tr>
                      <td class="crono-type-td">
                        <div class="crono-type-name">${c.tarea}</div>
                        <div class="crono-type-freq">${c.frecuencia}</div>
                      </td>
                      <td style="line-height: 1.4; color: #1e293b;">
                        ${c.accion}
                      </td>
                    </tr>
                  `).join('') : `
                    <tr><td colspan="2" style="text-align: center; color: #64748b; padding: 10px;">Sin cronograma registrado.</td></tr>
                  `}
                </tbody>
              </table>
            </div>

            <!-- Recuadro de Dictamen y Firma al Pie -->
            <div class="sig-container">
              <div style="line-height: 1.6; font-size: 9.5px;">
                <div><strong>Fecha de Dictamen:</strong> ____ / ____ / ________</div>
                <div><strong>Aclaración Inspector:</strong> ____________________________________</div>
                <div><strong>Legajo / DNI:</strong> ____________________________________</div>
              </div>

              <div class="sig-line-area">
                <div class="rubrica-txt">(Espacio para sello y rúbrica)</div>
                <div class="line"></div>
                <div class="sig-name">FIRMA INSPECTOR TÉCNICO</div>
              </div>
            </div>
          </div>

          <div class="footer-strip">
            PODER JUDICIAL DE LA NACIÓN · CÁMARA FEDERAL DE TUCUMÁN — HOJA 2 DE 2
          </div>
        </div>

      </body>
      </html>
    `;

    printWin.document.open();
    printWin.document.write(htmlContent);
    printWin.document.close();
  };

  // Función robusta para imprimir o descargar PDF directamente abriendo una ventana limpia fuera del iframe sandbox
  const handlePrintDocument = (type, data = null) => {
    const orderData = data || selectedOrder || orders[0];
    const printWindow = window.open('', '_blank', 'width=1000,height=900');
    if (!printWindow) {
      alert('El navegador bloqueó la vista previa. Permita las ventanas emergentes para este sitio y vuelva a intentarlo.');
      return;
    }

    let docTitle = 'Documento Oficial - PJN';
    let contentHtml = '';

    if (type === 'proveedores') {
      const reportRows = Array.isArray(data?.filteredProveedores) ? data.filteredProveedores : proveedoresData;
      const selectedCategory = data?.categoriaFiltro && data.categoriaFiltro !== 'all'
        ? data.categoriaFiltro
        : 'Todos los rubros';
      const searchFilter = data?.busquedaFiltro || 'Sin búsqueda';
      const escapePrintText = (value) => String(value || '—').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
      })[character]);

      docTitle = `Padron_Oficial_Proveedores_${selectedCategory.replace(/[^a-z0-9]+/gi, '_')}`;
      contentHtml = `
        <div class="provider-report">
          <div class="provider-header">
            <div class="provider-logo">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo del Poder Judicial de la Nación" />
              <div>
                <div class="provider-inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="provider-inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="provider-inst-3">INTENDENCIA — SISTEMA DE MANTENIMIENTO EDILICIO INTEGRAL</div>
              </div>
            </div>
            <div class="provider-document-title">
              <strong>PADRÓN OFICIAL DE PROVEEDORES</strong>
              <span>INFORME DE RUBROS Y SERVICIOS</span>
              <span>Emisión: ${new Date().toLocaleDateString('es-AR')}</span>
            </div>
          </div>

          <div class="provider-bar">LISTADO DE PROVEEDORES Y PRESTADORES</div>

          <div class="provider-summary">
            <span><strong>RUBRO:</strong> ${escapePrintText(selectedCategory)}</span>
            <span><strong>BÚSQUEDA:</strong> ${escapePrintText(searchFilter)}</span>
            <span><strong>REGISTROS:</strong> ${reportRows.length}</span>
          </div>

          <table class="provider-table">
            <thead>
              <tr>
                <th style="width: 4%;">N°</th>
                <th style="width: 14%;">Razón social</th>
                <th style="width: 13%;">Rubro</th>
                <th style="width: 8%;">CUIT</th>
                <th style="width: 10%;">Contacto</th>
                <th style="width: 10%;">Teléfono / Guardia</th>
                <th style="width: 12%;">Correo electrónico</th>
                <th style="width: 13%;">Domicilio</th>
                <th style="width: 12%;">Contrato / Expediente</th>
                <th style="width: 4%;">Estado</th>
              </tr>
            </thead>
            <tbody>
              ${reportRows.length > 0 ? reportRows.map((provider, index) => `
                <tr style="background: ${index % 2 ? '#f8fafc' : '#ffffff'};">
                  <td class="provider-center">${index + 1}</td>
                  <td class="provider-strong">${escapePrintText(provider.nombre)}</td>
                  <td>${escapePrintText(provider.categoria)}</td>
                  <td class="provider-nowrap">${escapePrintText(provider.cuit)}</td>
                  <td>${escapePrintText(provider.contacto)}</td>
                  <td>${escapePrintText(provider.telefono)}</td>
                  <td>${escapePrintText(provider.email)}</td>
                  <td>${escapePrintText(provider.direccion)}</td>
                  <td>${escapePrintText(provider.expteContrato)}</td>
                  <td class="provider-center">${escapePrintText(provider.estado || 'Activo')}</td>
                </tr>
              `).join('') : `
                <tr><td colspan="10" class="provider-empty">No hay proveedores que coincidan con los filtros seleccionados.</td></tr>
              `}
            </tbody>
          </table>

          <div class="provider-signatures">
            <div><span></span><strong>Área de Arquitectura y Mantenimiento</strong></div>
            <div><span></span><strong>Intendencia CFT</strong></div>
          </div>

          <div class="provider-footer">
            <span>SISTEMA DE MANTENIMIENTO EDILICIO INTEGRAL · SMEIK</span>
            <span>CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</span>
          </div>
        </div>
      `;
    } else if (type === 'order') {
      docTitle = `Orden_de_Trabajo_${orderData.id.replace(/\s+/g, '_').replace(/\//g, '-')}`;
      contentHtml = `
        <div class="page carilla-1 full-a4">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">Nº OT: ${orderData.id}</div>
              <div class="date-txt">Fecha: ____ / ____ / ________</div>
            </div>
          </div>

          <div class="bar-title">ORDEN DE TRABAJO DE MANTENIMIENTO</div>

          <div class="sec-box">
            <div class="sec-hdr">1. DATOS DE SOLICITUD Y LOCALIZACIÓN</div>
            <div class="grid-2">
              <div class="col">
                <p><strong>Tipo de mantenimiento:</strong> ${orderData.tipoMantenimiento || '—'}</p>
                <p><strong>Dependencia:</strong> ${orderData.dependencia || '—'}</p>
                <p><strong>Edificio:</strong> ${orderData.edificio || '—'}</p>
                <p><strong>Piso / Sector:</strong> ${orderData.sector || '—'}</p>
                <p><strong>Oficina:</strong> ${orderData.oficina || '—'}</p>
              </div>
              <div class="col">
                <p><strong>Solicitante:</strong> ${orderData.solicitante || '—'}</p>
                <p><strong>Prioridad:</strong> ${orderData.prioridad || '—'}</p>
                <div style="margin-top: 4px;">
                  <strong>Estado de Ejecución:</strong>
                  <div style="margin-top: 2px;">
                    <span style="display:inline-block; width:12px; height:12px; border:1.5px solid #0f2d59; margin-right:4px; vertical-align:middle;"></span>
                    <span>${orderData.estadoEjecucion || 'Pendiente'}</span>
                  </div>
                </div>
              </div>
            </div>
            <div style="padding: 5px 10px; border-top: 1px solid #d9e2ec; background: #fbfcfe;">
              <strong>Descripción del trabajo solicitado:</strong>
              <div style="margin-top: 3px; padding: 5px 8px; background: white; border: 1px solid #dce5ee; min-height: 38px; font-size: 11px;">
                ${orderData.descripcion || '—'}
              </div>
            </div>
          </div>

          <div class="sec-box">
            <div class="sec-hdr">2. ASIGNACIÓN TÉCNICA</div>
            <div class="grid-2">
              <div class="col">
                <p><strong>Técnico asignado:</strong> ${orderData.tecnicoFinal || orderData.tecnico || '—'}</p>
              </div>
              <div class="col">
                <p><strong>Fecha de asignación:</strong> ${orderData.fechaAsignacion || '—'}</p>
              </div>
            </div>
            <div style="padding: 4px 10px; border-top: 1px solid #d9e2ec;">
              <strong>Observaciones de coordinación:</strong> ${orderData.observaciones || '—'}
            </div>
          </div>

          <div class="sec-box fill-box" style="flex: 1; display: flex; flex-direction: column;">
            <div class="sec-hdr">3. INFORME DE EJECUCIÓN (DESCRIPCIÓN TÉCNICA Y TAREAS EN CAMPO)</div>
            <div style="padding: 8px; flex: 1; display: flex; flex-direction: column;">
              ${orderData.tareas ? `
                <div style="padding: 6px; font-size: 11px; line-height: 1.5; background: #f8fafc; border: 1px solid #cbd5e1; min-height: 140px; white-space: pre-line;">
                  ${orderData.tareas}
                </div>
              ` : `
                <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
                  ${Array.from({ length: 8 }).map((_, i) => `
                    <div style="border-bottom: 1px dashed #94a3b8; height: 22px; display: flex; align-items: flex-end; padding-bottom: 1px;">
                      <span style="font-size: 9px; color: #94a3b8; margin-right: 6px;">${(i + 1).toString().padStart(2, '0')}.</span>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>
          </div>

          <div class="sec-box">
            <div class="sec-hdr">4. MATERIALES E INSUMOS UTILIZADOS</div>
            <table class="mat-tbl">
              <thead>
                <tr>
                  <th style="text-align: left;">Material / Insumo</th>
                  <th style="width: 70px;">Cant.</th>
                  <th style="width: 70px;">Unidad</th>
                  <th>Observación / Devolución</th>
                </tr>
              </thead>
              <tbody>
                ${(orderData.materiales && orderData.materiales.length > 0) ? orderData.materiales.map(m => `
                  <tr>
                    <td>${m.descripcion}</td>
                    <td style="text-align: center; font-weight: bold;">${m.cantidad}</td>
                    <td style="text-align: center;">${m.unidad}</td>
                    <td style="text-align: center;">${m.devolucion ? 'Requiere Devolución' : '—'}</td>
                  </tr>
                `).join('') : `
                  <tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
                  <tr><td>&nbsp;</td><td></td><td></td><td></td></tr>
                `}
              </tbody>
            </table>
          </div>

          <div class="footer-note">PODER JUDICIAL DE LA NACIÓN · CÁMARA FEDERAL DE TUCUMÁN — HOJA 1 DE 2</div>
        </div>

        <div class="page carilla-2 full-a4">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA — RELEVAMIENTO TÉCNICO EN CAMPO</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">Nº OT: ${orderData.id} (Carilla 2)</div>
            </div>
          </div>

          <div class="bar-title">OBSERVACIONES ADICIONALES Y RELEVAMIENTO TÉCNICO EN CAMPO</div>

          <div class="sec-box fill-box" style="padding: 10px; display: flex; flex-direction: column; flex: 1;">
            <div style="font-weight: bold; font-size: 11px; margin-bottom: 4px; color: #0f2d59;">
              REGISTRO DETALLADO DE OBSERVACIONES, MEDICIONES Y PLAN DE ACCIÓN:
            </div>
            <div style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              ${Array.from({ length: 22 }).map((_, i) => `
                <div style="border-bottom: 1px dashed #94a3b8; height: 26px; display: flex; align-items: flex-end; padding-bottom: 2px;">
                  <span style="font-size: 9.5px; color: #64748b; font-family: monospace; margin-right: 8px;">${(i + 1).toString().padStart(2, '0')}.</span>
                </div>
              `).join('')}
            </div>
          </div>

          <div class="signatures" style="margin-top: 15px; margin-bottom: 4px;">
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Firma del Técnico Interviniente</div>
            </div>
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Firma e Inspección del Responsable</div>
            </div>
          </div>

          <div class="footer-note">PODER JUDICIAL DE LA NACIÓN · CÁMARA FEDERAL DE TUCUMÁN — HOJA 2 DE 2</div>
        </div>
      `;
    } else if (type === 'resumen_con_filtros') {
      docTitle = `Resumen_y_OT_Filtradas_CFT_${new Date().toLocaleDateString('es-AR').replace(/\//g, '-')}`;
      
      const filteredList = data && data.filteredOrders ? data.filteredOrders : filteredOrders;
      const totalAll = orders.length;
      const termAll = orders.filter(o => o.estadoEjecucion === 'Finalizada').length;
      const penAll = orders.filter(o => o.estadoEjecucion === 'Pendiente').length;
      const sinAsignarAll = orders.filter(o => o.estadoEjecucion === 'Sin Asignar').length;
      const rateResolutionAll = totalAll > 0 ? Math.round((termAll / totalAll) * 100) : 0;

      // 1. Desglose por Tipo de Mantenimiento
      const typesAll = ['Correctiva', 'Preventiva', 'Predictiva', 'Inspección Edilicia'];
      const typeCounts = typesAll.map(t => ({
        tipo: t,
        count: orders.filter(o => o.tipoMantenimiento === t).length,
        pct: totalAll > 0 ? Math.round((orders.filter(o => o.tipoMantenimiento === t).length / totalAll) * 100) : 0
      }));

      // 2. Desglose por Prioridad
      const prioritiesAll = [
        { label: 'Urgente', color: '#ef4444', text: '#991b1b', bg: '#fee2e2' },
        { label: 'Alta', color: '#f59e0b', text: '#92400e', bg: '#fef3c7' },
        { label: 'Media', color: '#0ea5e9', text: '#075985', bg: '#e0f2fe' },
        { label: 'Baja', color: '#94a3b8', text: '#475569', bg: '#f1f5f9' }
      ];
      const priorityCounts = prioritiesAll.map(p => ({
        ...p,
        count: orders.filter(o => o.prioridad === p.label).length,
        pct: totalAll > 0 ? Math.round((orders.filter(o => o.prioridad === p.label).length / totalAll) * 100) : 0
      }));

      // 3. Desglose por Piso / Sector Edilicio
      const pisoCountsMap = {};
      orders.forEach(o => {
        const p = o.sector && o.sector !== '-- Seleccionar opción --' ? o.sector : 'Sin Especificar';
        pisoCountsMap[p] = (pisoCountsMap[p] || 0) + 1;
      });
      const sortedPisos = Object.entries(pisoCountsMap).sort((a, b) => b[1] - a[1]);

      // 4. Reiteración de Oficinas Solicitantes (Ranking)
      const oficinaMap = {};
      orders.forEach(o => {
        const ofc = o.oficina && o.oficina.trim() ? o.oficina.trim() : 'Sin Oficina Indicada';
        oficinaMap[ofc] = (oficinaMap[ofc] || 0) + 1;
      });
      const topOficinas = Object.entries(oficinaMap).sort((a, b) => b[1] - a[1]);

      // 5. Carga de Trabajo por Técnico Asignado
      const tecnicoMap = {};
      orders.forEach(o => {
        const tec = o.tecnicoFinal || o.tecnico;
        const tecName = tec && tec !== '-- Seleccionar opción --' ? tec : 'Sin Asignar';
        if (!tecnicoMap[tecName]) {
          tecnicoMap[tecName] = { total: 0, finalizadas: 0, pendientes: 0 };
        }
        tecnicoMap[tecName].total += 1;
        if (o.estadoEjecucion === 'Finalizada') tecnicoMap[tecName].finalizadas += 1;
        else tecnicoMap[tecName].pendientes += 1;
      });
      const sortedTecnicos = Object.entries(tecnicoMap).sort((a, b) => b[1].total - a[1].total);

      // 6. Desglose por Rubro Especializado
      const rubroMap = {};
      orders.forEach(o => {
        const rub = o.rubroFinal || o.rubro || 'General';
        rubroMap[rub] = (rubroMap[rub] || 0) + 1;
      });
      const sortedRubros = Object.entries(rubroMap).sort((a, b) => b[1] - a[1]);

      // Filtros activos informados
      const activeFiltersText = [
        searchTerm ? `Búsqueda: "${searchTerm}"` : null,
        filterType !== 'all' ? `Tipo: ${filterType}` : null,
        filterDependencia !== 'all' ? `Dependencia: ${filterDependencia}` : null,
        filterRubro !== 'all' ? `Rubro: ${filterRubro}` : null,
        filterPriority !== 'all' ? `Prioridad: ${filterPriority}` : null
      ].filter(Boolean).join(' · ') || 'Sin filtros específicos (Listado Completo)';

      contentHtml = `
        <!-- HOJA 1: RESUMEN DE ÓRDENES (TODAS LAS ESTADÍSTICAS DEL TABLERO ANALÍTICO) -->
        <div class="page carilla-1 full-a4">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA — TABLERO ANALÍTICO DE MANTENIMIENTO</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">RESUMEN DE ÓRDENES (CARILLA 1)</div>
              <div class="date-txt">Emisión: ${new Date().toLocaleDateString('es-AR')}</div>
            </div>
          </div>

          <div class="bar-title">INDICADORES DE RENDIMIENTO Y ESTADÍSTICAS DE ÓRDENES DE TRABAJO</div>

          <!-- Cuatro Tarjetas Principales de Volumen -->
          <div style="display: flex; gap: 6px; margin-bottom: 6px;">
            <div style="flex: 1; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f8fafc; text-align: center;">
              <div style="font-size: 8px; font-weight: bold; color: #475569; text-transform: uppercase;">Volumen Total OT</div>
              <div style="font-size: 15px; font-weight: 800; color: #0f2d59; line-height: 1.1;">${totalAll}</div>
              <div style="font-size: 7.5px; color: #64748b;">100% de expedientes</div>
            </div>
            <div style="flex: 1; border: 1px solid #86efac; border-radius: 4px; padding: 4px 6px; background: #f0fdf4; text-align: center;">
              <div style="font-size: 8px; font-weight: bold; color: #166534; text-transform: uppercase;">Finalizadas</div>
              <div style="font-size: 15px; font-weight: 800; color: #166534; line-height: 1.1;">${termAll}</div>
              <div style="font-size: 7.5px; color: #15803d; font-weight: bold;">Tasa: ${rateResolutionAll}%</div>
            </div>
            <div style="flex: 1; border: 1px solid #fde047; border-radius: 4px; padding: 4px 6px; background: #fefce8; text-align: center;">
              <div style="font-size: 8px; font-weight: bold; color: #854d0e; text-transform: uppercase;">Pendientes</div>
              <div style="font-size: 15px; font-weight: 800; color: #854d0e; line-height: 1.1;">${penAll}</div>
              <div style="font-size: 7.5px; color: #a16207;">En curso operativo</div>
            </div>
            <div style="flex: 1; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 6px; background: #f1f5f9; text-align: center;">
              <div style="font-size: 8px; font-weight: bold; color: #334155; text-transform: uppercase;">Sin Asignar</div>
              <div style="font-size: 15px; font-weight: 800; color: #334155; line-height: 1.1;">${sinAsignarAll}</div>
              <div style="font-size: 7.5px; color: #64748b;">Aguardando designación</div>
            </div>
          </div>

          <!-- Fila 1 de Estadísticas: Tipo de Mantenimiento & Prioridad / Criticidad -->
          <div style="display: flex; gap: 6px; margin-bottom: 6px;">
            <!-- Tipo de Mantenimiento -->
            <div class="sec-box" style="flex: 1; margin-bottom: 0;">
              <div class="sec-hdr" style="font-size: 8.5px; padding: 2px 6px;">1. VOLUMEN POR TIPO DE MANTENIMIENTO</div>
              <div style="padding: 4px 6px;">
                ${typeCounts.map(t => `
                  <div style="margin-bottom: 3px;">
                    <div style="display: flex; justify-content: space-between; font-size: 8px; font-weight: 600;">
                      <span>${t.tipo}</span>
                      <span style="font-family: monospace; color: #0f2d59;">${t.count} OT (${t.pct}%)</span>
                    </div>
                    <div style="height: 4px; width: 100%; background: #e2e8f0; border-radius: 2px; overflow: hidden; margin-top: 1px;">
                      <div style="height: 100%; width: ${Math.max(t.pct, t.count > 0 ? 5 : 0)}%; background: #0f2d59; border-radius: 2px;"></div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Clasificación por Prioridad -->
            <div class="sec-box" style="flex: 1; margin-bottom: 0;">
              <div class="sec-hdr" style="font-size: 8.5px; padding: 2px 6px;">2. CLASIFICACIÓN POR PRIORIDAD / CRITICIDAD</div>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding: 4px 6px;">
                ${priorityCounts.map(p => `
                  <div style="background: ${p.bg}; border: 1px solid #cbd5e1; border-radius: 3px; padding: 3px 5px; display: flex; justify-content: space-between; align-items: center;">
                    <div>
                      <div style="font-size: 7.5px; font-weight: 800; color: ${p.text}; text-transform: uppercase;">${p.label}</div>
                      <div style="font-size: 11px; font-weight: 900; color: ${p.text};">${p.count}</div>
                    </div>
                    <span style="font-size: 7.5px; font-weight: bold; background: white; padding: 1px 3px; border-radius: 2px; border: 1px solid #cbd5e1;">${p.pct}%</span>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>

          <!-- Fila 2 de Estadísticas: Sectores Edilicios & Reiteración de Oficinas -->
          <div style="display: flex; gap: 6px; margin-bottom: 6px;">
            <!-- Intervenciones por Piso / Sector -->
            <div class="sec-box" style="flex: 1; margin-bottom: 0;">
              <div class="sec-hdr" style="font-size: 8.5px; padding: 2px 6px;">3. INTERVENCIONES POR PISO / SECTOR EDILICIO</div>
              <div style="padding: 3px 6px; font-size: 8px;">
                ${sortedPisos.slice(0, 5).map(([piso, count]) => {
                  const pct = totalAll > 0 ? Math.round((count / totalAll) * 100) : 0;
                  return `
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #e2e8f0; padding: 1.5px 0;">
                      <span style="font-weight: 600; color: #1e293b; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${piso}</span>
                      <span><strong style="color: #0f2d59;">${count} OT</strong> <span style="color: #64748b; font-family: monospace;">(${pct}%)</span></span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Reiteración de Oficinas Solicitantes -->
            <div class="sec-box" style="flex: 1; margin-bottom: 0;">
              <div class="sec-hdr" style="font-size: 8.5px; padding: 2px 6px;">4. REITERACIÓN DE OFICINAS SOLICITANTES</div>
              <div style="padding: 3px 6px; font-size: 8px;">
                ${topOficinas.slice(0, 5).map(([ofc, count], i) => {
                  const pct = totalAll > 0 ? Math.round((count / totalAll) * 100) : 0;
                  return `
                    <div style="display: flex; justify-content: space-between; border-bottom: 1px dotted #e2e8f0; padding: 1.5px 0;">
                      <span style="font-weight: 600; color: #1e293b; max-width: 140px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${i + 1}. ${ofc}</span>
                      <span><strong style="color: #0f2d59;">${count} req.</strong> <span style="color: #64748b; font-family: monospace;">(${pct}%)</span></span>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Fila 3 de Estadísticas: Carga por Técnico & Distribución por Rubro -->
          <div style="display: flex; gap: 6px; margin-bottom: 6px;">
            <!-- Carga por Técnico -->
            <div class="sec-box" style="flex: 1; margin-bottom: 0;">
              <div class="sec-hdr" style="font-size: 8.5px; padding: 2px 6px;">5. CARGA DE TRABAJO Y ASIGNACIÓN POR TÉCNICO</div>
              <div style="padding: 3px 6px; font-size: 8px;">
                ${sortedTecnicos.slice(0, 4).map(([tec, d]) => {
                  const pct = totalAll > 0 ? Math.round((d.total / totalAll) * 100) : 0;
                  return `
                    <div style="display: flex; justify-content: space-between; align-items: center; border-bottom: 1px dotted #e2e8f0; padding: 2px 0;">
                      <span style="font-weight: 700; color: #0f2d59;">${tec}</span>
                      <div style="font-size: 7.5px;">
                        <span style="color: #166534; font-weight: bold;">${d.finalizadas} fin.</span> · 
                        <span style="color: #854d0e; font-weight: bold;">${d.pendientes} pend.</span> · 
                        <strong style="color: #0f2d59;">${d.total} tot.</strong>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>

            <!-- Distribución por Rubro -->
            <div class="sec-box" style="flex: 1; margin-bottom: 0;">
              <div class="sec-hdr" style="font-size: 8.5px; padding: 2px 6px;">6. DISTRIBUCIÓN POR RUBRO Y ESPECIALIDAD</div>
              <div style="padding: 3px 6px; font-size: 8px;">
                ${sortedRubros.slice(0, 4).map(([rub, count]) => {
                  const pct = totalAll > 0 ? Math.round((count / totalAll) * 100) : 0;
                  return `
                    <div style="margin-bottom: 2px;">
                      <div style="display: flex; justify-content: space-between;">
                        <span style="font-weight: 600;">${rub}</span>
                        <span style="font-family: monospace; color: #0f2d59;">${count} OT (${pct}%)</span>
                      </div>
                      <div style="height: 3px; width: 100%; background: #e2e8f0; border-radius: 1.5px; overflow: hidden; margin-top: 1px;">
                        <div style="height: 100%; width: ${Math.max(pct, count > 0 ? 6 : 0)}%; background: #166534; border-radius: 1.5px;"></div>
                      </div>
                    </div>
                  `;
                }).join('')}
              </div>
            </div>
          </div>

          <!-- Banda de Conexión a la Segunda Hoja -->
          <div style="padding: 4px 8px; background: #f0f6fa; border: 1px solid #cbdbe8; border-radius: 4px; font-size: 8px; color: #1e3a5f; margin-bottom: 4px;">
            <strong>Filtros aplicados en la pestaña Gestión y Listado de OT:</strong> ${activeFiltersText} &bull; 
            <strong>Total en Hoja 2:</strong> ${filteredList.length} de ${totalAll} órdenes
          </div>

          <!-- Firmas Oficiales al pie de la Hoja 1 -->
          <div class="signatures" style="padding: 8px 20px 2px 20px;">
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Supervisión Técnica de Intendencia</div>
            </div>
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Intendencia General CFT</div>
            </div>
          </div>

          <div class="footer-note">Sistema de Mantenimiento Edilicio · CFT — Resumen de Órdenes (Carilla 1 de 2)</div>
        </div>

        <!-- HOJA 2: GESTIÓN Y LISTADO DE OT (ÓRDENES FILTRADAS EN LA PESTAÑA) -->
        <div class="page carilla-2 full-a4">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA — GESTIÓN Y LISTADO DE OT</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">GESTIÓN Y LISTADO DE OT (CARILLA 2)</div>
              <div class="date-txt">Coincidencias: ${filteredList.length}</div>
            </div>
          </div>

          <div class="bar-title">NÓMINA DE ÓRDENES DE TRABAJO FILTRADAS</div>

          <div style="display: flex; justify-content: space-between; align-items: center; background: #f8fafc; border: 1px solid #cbd5e1; border-radius: 4px; padding: 4px 8px; font-size: 8.5px; margin-bottom: 6px;">
            <span><strong>Criterio de filtrado activo:</strong> ${activeFiltersText}</span>
            <span style="font-weight: bold; color: #0f2d59;">Total mostradas: ${filteredList.length} órdenes</span>
          </div>

          <div class="sec-box fill-box" style="margin-bottom: 6px; overflow: hidden;">
            <table style="width: 100%; border-collapse: collapse; font-size: 8.5px;">
              <thead>
                <tr style="background: #0f2d59; color: white; text-align: left;">
                  <th style="padding: 3px 5px; width: 62px;">Nº OT</th>
                  <th style="padding: 3px 5px; width: 75px;">Tipo Mant.</th>
                  <th style="padding: 3px 5px; width: 125px;">Dependencia</th>
                  <th style="padding: 3px 5px; width: 85px;">Ubicación</th>
                  <th style="padding: 3px 5px; width: 85px;">Solicitante</th>
                  <th style="padding: 3px 5px; width: 65px;">Rubro</th>
                  <th style="padding: 3px 5px; width: 80px;">Técnico</th>
                  <th style="padding: 3px 5px; width: 55px; text-align: center;">Estado</th>
                  <th style="padding: 3px 5px;">Descripción del Requerimiento</th>
                </tr>
              </thead>
              <tbody>
                ${filteredList.length > 0 ? filteredList.map((o, idx) => `
                  <tr style="border-bottom: 1px solid #e2e8f0; ${idx % 2 === 1 ? 'background: #f8fafc;' : 'background: white;'}">
                    <td style="padding: 3px 5px; font-family: monospace; font-weight: bold; color: #0f2d59; white-space: nowrap;">${o.id}</td>
                    <td style="padding: 3px 5px; font-weight: 600;">${o.tipoMantenimiento || '—'}</td>
                    <td style="padding: 3px 5px; font-weight: 600; color: #1e293b; max-width: 125px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">${o.dependencia || '—'}</td>
                    <td style="padding: 3px 5px; color: #475569;">${o.sector || ''} ${o.oficina ? `(${o.oficina})` : ''}</td>
                    <td style="padding: 3px 5px;">${o.solicitante || '—'}</td>
                    <td style="padding: 3px 5px; font-weight: 500;">${o.rubroFinal || o.rubro || '—'}</td>
                    <td style="padding: 3px 5px; color: #0f2d59; font-weight: 600;">${o.tecnicoFinal || o.tecnico || 'Sin Asignar'}</td>
                    <td style="padding: 3px 5px; text-align: center;">
                      <span style="display: inline-block; padding: 1px 4px; border-radius: 3px; font-size: 7.5px; font-weight: bold; background: ${
                        o.estadoEjecucion === 'Finalizada' ? '#dcfce7; color: #166534; border: 1px solid #86efac;' :
                        o.estadoEjecucion === 'Pendiente' ? '#fef9c3; color: #854d0e; border: 1px solid #fde047;' :
                        '#f1f5f9; color: #475569; border: 1px solid #cbd5e1;'
                      }">
                        ${o.estadoEjecucion}
                      </span>
                    </td>
                    <td style="padding: 3px 5px; color: #334155; font-size: 8px; line-height: 1.2; max-width: 160px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${o.descripcion || '—'}</td>
                  </tr>
                `).join('') : `
                  <tr>
                    <td colspan="9" style="padding: 18px; text-align: center; color: #94a3b8; font-style: italic;">
                      No se encontraron órdenes de trabajo que coincidan con los filtros ingresados.
                    </td>
                  </tr>
                `}
              </tbody>
            </table>
          </div>

          <!-- Firmas Oficiales de Conformidad de la Nómina -->
          <div class="signatures" style="padding: 8px 20px 2px 20px;">
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Responsable de Mantenimiento Edilicio</div>
            </div>
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Intendencia General CFT</div>
            </div>
          </div>

          <div class="footer-note">Sistema de Mantenimiento Edilicio · CFT — Gestión y Listado de OT (Carilla 2 de 2)</div>
        </div>
      `;
    } else if (type === 'ficha') {
      docTitle = `Ficha_Edilicia_${catalogFormData.code}`;
      contentHtml = `
        <div class="page">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA — FICHA TÉCNICA EDILICIA</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">${catalogFormData.code}</div>
              <div class="date-txt">Fecha: ${catalogFormData.fechaInspeccion}</div>
            </div>
          </div>

          <div class="bar-title">${catalogFormData.nombre}</div>

          <div class="sec-box">
            <div class="sec-hdr">PARÁMETROS DE LA FICHA</div>
            <div class="grid-2">
              <div class="col">
                <p><strong>Grupo Constructivo:</strong> ${catalogFormData.grupo}</p>
                <p><strong>Frecuencia Reglamentaria:</strong> ${catalogFormData.freq}</p>
              </div>
              <div class="col">
                <p><strong>Inspector Técnico:</strong> ${catalogFormData.inspector}</p>
                <p><strong>Estado:</strong> ${catalogFormData.estadoInspeccion}</p>
              </div>
            </div>
          </div>

          <div class="sec-box">
            <div class="sec-hdr">1. OBSERVACIONES TÉCNICAS Y RELEVAMIENTO</div>
            <div style="padding: 10px; font-size: 11.5px; line-height: 1.5;">${catalogFormData.observacionesTecnicas}</div>
          </div>

          <div class="sec-box">
            <div class="sec-hdr">2. HALLAZGOS Y ESTADO DEL SISTEMA</div>
            <div style="padding: 10px; font-size: 11.5px; line-height: 1.5;">${catalogFormData.hallazgos}</div>
          </div>

          <div class="sec-box">
            <div class="sec-hdr">3. RECOMENDACIONES DE MANTENIMIENTO</div>
            <div style="padding: 10px; font-size: 11.5px; line-height: 1.5;">${catalogFormData.recomendaciones}</div>
          </div>

          <div class="signatures" style="margin-top: 50px;">
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Firma del Inspector Técnico</div>
            </div>
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Firma de Intendencia</div>
            </div>
          </div>

          <div class="footer-note">Programa de Inspecciones Edilicias · CFT 2026</div>
        </div>
      `;
    } else if (type === 'cuadros_bombas') {
      docTitle = `Estado_Cuadros_de_Bombas_CFT_${new Date().toLocaleDateString('es-AR').replace(/\//g, '-')}`;
      contentHtml = `
        <div class="page full-a4">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA — MONITOREO DE SISTEMAS ELECTROMECÁNICOS</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">ESTADO DE CUADROS DE BOMBAS</div>
              <div class="date-txt">Fecha de emisión: ${new Date().toLocaleDateString('es-AR')}</div>
            </div>
          </div>

          <div class="bar-title">INFORME DE ESTADO GENERAL DE CUADROS Y SALAS DE BOMBEO</div>

          <div style="font-size: 10px; color: #475569; margin-bottom: 8px;">
            Relevamiento técnico del estado electromecánico de los cuadros edilicios, alternancias activas y equipos montados en cada posición física.
          </div>

          ${cuadrosData.map((c, idx) => {
            const bPos1 = bombasData.find(b => b.cuadro === c.nombre && b.posicionSlot === 1);
            const bPos2 = bombasData.find(b => b.cuadro === c.nombre && b.posicionSlot === 2);
            const ultMant = c.mantenimientos && c.mantenimientos.length > 0 ? c.mantenimientos[0] : null;

            return `
              <div class="sec-box" style="margin-bottom: 10px; page-break-inside: avoid;">
                <div class="sec-hdr" style="display: flex; justify-content: space-between; align-items: center;">
                  <span>${idx + 1}. ${c.nombre}</span>
                  <span style="font-size: 9px; font-weight: normal; opacity: 0.9;">
                    ${ultMant ? `Último Mant.: ${ultMant.fecha}` : 'Sin mantenimiento reciente'}
                  </span>
                </div>
                <div style="padding: 4px 8px; font-size: 9.5px; background: #f8fafc; border-bottom: 1px solid #d9e2ec;">
                  <strong>Función / Destino:</strong> ${c.desc}
                  ${c.tableroInfo ? ` &bull; <strong>Tablero:</strong> ${c.tableroInfo}` : ''}
                </div>
                <table style="width: 100%; border-collapse: collapse; font-size: 10px;">
                  <thead>
                    <tr style="background: #f1f5f9; text-align: left; font-size: 9px; border-bottom: 1px solid #cbd5e1;">
                      <th style="padding: 4px 8px; width: 120px;">Posición</th>
                      <th style="padding: 4px 8px; width: 130px;">Tag / Identificador</th>
                      <th style="padding: 4px 8px;">Equipo Instalado</th>
                      <th style="padding: 4px 8px; width: 120px; text-align: center;">Condición Operativa</th>
                      <th style="padding: 4px 8px; width: 90px; text-align: right;">Tiempo Activo</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid #e2e8f0;">
                      <td style="padding: 4px 8px; font-weight: bold; color: #0f2d59;">${c.pos1Label || 'POSICIÓN 01'}</td>
                      <td style="padding: 4px 8px; font-family: monospace; font-weight: bold;">${bPos1 ? (bPos1.tagFisico || bPos1.id) : '—'}</td>
                      <td style="padding: 4px 8px;">${bPos1 ? bPos1.nombre : '<em style="color:#94a3b8;">SIN BOMBA ASIGNADA (Vacante)</em>'}</td>
                      <td style="padding: 4px 8px; text-align: center;">
                        ${bPos1 ? `
                          <span style="display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 8.5px; font-weight: bold; background: ${bPos1.alternancia === 'BOMBA EN USO' ? '#dcfce7; color: #166534; border: 1px solid #86efac;' : '#fef9c3; color: #854d0e; border: 1px solid #fde047;'}">
                            ${bPos1.alternancia}
                          </span>
                        ` : '<span style="color:#94a3b8; font-size: 9px;">Vacante</span>'}
                      </td>
                      <td style="padding: 4px 8px; text-align: right; font-weight: bold;">${bPos1 && bPos1.alternancia === 'BOMBA EN USO' ? `${bPos1.diasUso || 0} días` : '—'}</td>
                    </tr>
                    <tr>
                      <td style="padding: 4px 8px; font-weight: bold; color: #0f2d59;">${c.pos2Label || 'POSICIÓN 02'}</td>
                      <td style="padding: 4px 8px; font-family: monospace; font-weight: bold;">${bPos2 ? (bPos2.tagFisico || bPos2.id) : '—'}</td>
                      <td style="padding: 4px 8px;">${bPos2 ? bPos2.nombre : '<em style="color:#94a3b8;">SIN BOMBA ASIGNADA (Vacante)</em>'}</td>
                      <td style="padding: 4px 8px; text-align: center;">
                        ${bPos2 ? `
                          <span style="display: inline-block; padding: 1px 6px; border-radius: 3px; font-size: 8.5px; font-weight: bold; background: ${bPos2.alternancia === 'BOMBA EN USO' ? '#dcfce7; color: #166534; border: 1px solid #86efac;' : '#fef9c3; color: #854d0e; border: 1px solid #fde047;'}">
                            ${bPos2.alternancia}
                          </span>
                        ` : '<span style="color:#94a3b8; font-size: 9px;">Vacante</span>'}
                      </td>
                      <td style="padding: 4px 8px; text-align: right; font-weight: bold;">${bPos2 && bPos2.alternancia === 'BOMBA EN USO' ? `${bPos2.diasUso || 0} días` : '—'}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            `;
          }).join('')}

          <div class="signatures" style="margin-top: 25px;">
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Técnico Electromecánico Interviniente</div>
            </div>
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Firma e Inspección de Intendencia</div>
            </div>
          </div>

          <div class="footer-note">Sistema de Mantenimiento Edilicio · CFT — Monitoreo Oficial de Cuadros de Bombas</div>
        </div>
      `;
    } else if (type === 'equipos_bombas_costos') {
      docTitle = `Informe_Mantenimiento_Costos_Bombas_${new Date().toLocaleDateString('es-AR').replace(/\//g, '-')}`;

      // Cálculo preciso del costo total acumulado sumando todos los parciales
      let costoTotalNumerico = 0;
      let totalIntervenciones = 0;

      bombasData.forEach(b => {
        (b.reparaciones || []).forEach(r => {
          totalIntervenciones += 1;
          const parsed = parseMoneda(r.costo);
          costoTotalNumerico += parsed;
        });
      });

      const formattedTotalCosto = formatMonedaPesos(costoTotalNumerico);

      contentHtml = `
        <div class="page full-a4">
          <div class="header">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" />
              <div>
                <div class="inst-1">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3">INTENDENCIA — PARQUE DE MOTOBOMBAS E HISTORIAL DE COSTOS</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num">INFORME TÉCNICO Y COSTOS</div>
              <div class="date-txt">Fecha: ${new Date().toLocaleDateString('es-AR')}</div>
            </div>
          </div>

          <div class="bar-title">PARQUE DE EQUIPOS DE BOMBEO: DETALLE TÉCNICO, MANTENIMIENTOS Y COSTOS</div>

          <div style="display: flex; justify-content: space-between; align-items: center; background: #f0f6fa; border: 1px solid #cbdbe8; border-radius: 4px; padding: 7px 12px; margin-bottom: 10px; font-size: 10px;">
            <div>
              <span><strong>TOTAL DE EQUIPOS:</strong> ${bombasData.length} Motobombas</span> &bull; 
              <span><strong>OPERATIVAS:</strong> ${bombasData.filter(b => b.estado === 'Operativa').length}</span> &bull; 
              <span><strong>A REPARAR / TALLER:</strong> ${bombasData.filter(b => b.estado !== 'Operativa').length}</span> &bull;
              <span><strong>INTERVENCIONES TOTALES:</strong> ${totalIntervenciones}</span>
            </div>
            <div style="font-size: 11px; font-weight: bold; color: #166534; background: #dcfce7; padding: 3px 8px; border-radius: 4px; border: 1px solid #86efac;">
              TOTAL INVERSIÓN MANTENIMIENTO: ${formattedTotalCosto}
            </div>
          </div>

          ${bombasData.map((b, idx) => {
            const reparaciones = b.reparaciones || [];
            let subtotalBomba = 0;
            reparaciones.forEach(r => {
              subtotalBomba += parseMoneda(r.costo);
            });

            return `
              <div class="sec-box" style="margin-bottom: 12px; page-break-inside: avoid;">
                <div class="sec-hdr" style="display: flex; justify-content: space-between; align-items: center;">
                  <span>${idx + 1}. [${b.tagFisico || b.id}] ${b.nombre}</span>
                  <span style="font-size: 9px; font-weight: bold; background: white; color: #0f2d59; padding: 1px 6px; border-radius: 3px;">
                    ${b.estado.toUpperCase()}
                  </span>
                </div>
                
                <div style="padding: 6px 10px; font-size: 9.5px; background: #fbfcfe; border-bottom: 1px solid #d9e2ec; line-height: 1.4;">
                  <div style="display: flex; justify-content: space-between;">
                    <div><strong>Posición de Instalación:</strong> ${b.posicionInstalacion || b.ubicacion || '—'}</div>
                    <div><strong>Horas de Uso:</strong> ${b.horasUso || 0} hs</div>
                  </div>
                  <div style="display: flex; justify-content: space-between; margin-top: 2px;">
                    <div><strong>Marca/Modelo:</strong> ${b.marca || '—'} ${b.modelo || '—'} &bull; <strong>Potencia:</strong> ${b.potencia || '—'}</div>
                    <div><strong>Caudal / Altura:</strong> ${b.caudal || '—'} &bull; ${b.alturaManometrica || '—'}</div>
                  </div>
                </div>

                <div style="padding: 4px 8px; background: #f1f5f9; font-weight: bold; font-size: 9px; color: #334155; border-bottom: 1px solid #cbd5e1; display: flex; justify-content: space-between;">
                  <span>HISTORIAL DE TRABAJOS DE MANTENIMIENTO Y REPARACIONES (${reparaciones.length})</span>
                  <span style="color: #166534; font-weight: 800;">Subtotal Invertido: ${formatMonedaPesos(subtotalBomba)}</span>
                </div>

                ${reparaciones.length > 0 ? `
                  <table style="width: 100%; border-collapse: collapse; font-size: 9.5px;">
                    <thead>
                      <tr style="background: white; border-bottom: 1px solid #e2e8f0; text-align: left; font-size: 8.5px; color: #64748b;">
                        <th style="padding: 3px 8px; width: 80px;">Fecha</th>
                        <th style="padding: 3px 8px; width: 170px;">Tarea / Trabajo</th>
                        <th style="padding: 3px 8px; width: 120px;">Técnico / Taller</th>
                        <th style="padding: 3px 8px;">Detalle Técnico y Repuestos</th>
                        <th style="padding: 3px 8px; width: 95px; text-align: right;">Costo</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${reparaciones.map(rep => `
                        <tr style="border-bottom: 1px solid #f1f5f9;">
                          <td style="padding: 3px 8px; font-weight: bold; color: #0f2d59;">${rep.fecha}</td>
                          <td style="padding: 3px 8px; font-weight: 600;">${rep.tipo}</td>
                          <td style="padding: 3px 8px;">${rep.tecnico}</td>
                          <td style="padding: 3px 8px; color: #334155;">${rep.detalle}</td>
                          <td style="padding: 3px 8px; text-align: right; font-weight: bold; font-family: monospace; color: #166534;">${rep.costo || '—'}</td>
                        </tr>
                      `).join('')}
                    </tbody>
                    <tfoot>
                      <tr style="background: #f8fafc; border-top: 1.5px solid #cbd5e1; font-weight: bold;">
                        <td colspan="4" style="padding: 4px 8px; text-align: right; text-transform: uppercase; font-size: 8.5px; color: #475569;">
                          Subtotal Parcial Bomba [${b.tagFisico || b.id}]:
                        </td>
                        <td style="padding: 4px 8px; text-align: right; font-family: monospace; font-size: 10px; color: #166534; font-weight: 800;">
                          ${formatMonedaPesos(subtotalBomba)}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                ` : `
                  <div style="padding: 6px 10px; font-size: 9px; color: #94a3b8; font-style: italic;">
                    Sin intervenciones mecánicas o reparaciones onerosas registradas en el período.
                  </div>
                `}
              </div>
            `;
          }).join('')}

          <!-- CUADRO DE RESUMEN FINAL: SUMATORIA DE PARCIALES Y TOTAL GENERAL -->
          <div class="sec-box" style="margin-top: 15px; page-break-inside: avoid; border: 1.5px solid #0f2d59;">
            <div class="sec-hdr" style="font-size: 10.5px; letter-spacing: 0.8px;">
              BALANCE Y RESUMEN GENERAL DE COSTOS POR EQUIPO
            </div>
            <table style="width: 100%; border-collapse: collapse; font-size: 9.5px;">
              <thead>
                <tr style="background: #f1f5f9; border-bottom: 1px solid #cbd5e1; text-align: left; font-size: 8.5px; color: #475569;">
                  <th style="padding: 4px 8px; width: 35px; text-align: center;">#</th>
                  <th style="padding: 4px 8px; width: 140px;">Tag / Identificador</th>
                  <th style="padding: 4px 8px;">Equipo de Bombeo</th>
                  <th style="padding: 4px 8px; width: 100px; text-align: center;">Intervenciones</th>
                  <th style="padding: 4px 8px; width: 120px; text-align: right;">Subtotal Invertido</th>
                </tr>
              </thead>
              <tbody>
                ${bombasData.map((b, i) => {
                  const reparaciones = b.reparaciones || [];
                  let sub = 0;
                  reparaciones.forEach(r => { sub += parseMoneda(r.costo); });
                  return `
                    <tr style="border-bottom: 1px solid #e2e8f0; ${i % 2 === 1 ? 'background: #fafbfc;' : ''}">
                      <td style="padding: 3px 8px; text-align: center; color: #64748b; font-family: monospace;">${(i + 1).toString().padStart(2, '0')}</td>
                      <td style="padding: 3px 8px; font-family: monospace; font-weight: bold; color: #0f2d59;">${b.tagFisico || b.id}</td>
                      <td style="padding: 3px 8px; font-weight: 500;">${b.nombre}</td>
                      <td style="padding: 3px 8px; text-align: center; font-weight: bold; color: #334155;">${reparaciones.length}</td>
                      <td style="padding: 3px 8px; text-align: right; font-family: monospace; font-weight: bold; color: ${sub > 0 ? '#166534' : '#64748b'};">
                        ${formatMonedaPesos(sub)}
                      </td>
                    </tr>
                  `;
                }).join('')}
              </tbody>
              <tfoot>
                <tr style="background: #0f2d59; color: white; font-weight: bold; font-size: 10.5px;">
                  <td colspan="3" style="padding: 6px 10px; text-transform: uppercase; letter-spacing: 0.5px;">
                    TOTAL GENERAL INVERSIÓN EN MANTENIMIENTO DEL PARQUE:
                  </td>
                  <td style="padding: 6px 8px; text-align: center; font-family: monospace;">
                    ${totalIntervenciones} trabajos
                  </td>
                  <td style="padding: 6px 10px; text-align: right; font-family: monospace; font-size: 11.5px; color: #86efac; font-weight: 900;">
                    ${formattedTotalCosto}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>

          <div class="signatures" style="margin-top: 25px;">
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Responsable de Mantenimiento Edilicio</div>
            </div>
            <div class="sig-line">
              <div class="line"></div>
              <div class="lbl">Intendencia General CFT</div>
            </div>
          </div>

          <div class="footer-note">Sistema de Mantenimiento Edilicio · CFT — Registro Oficial de Equipos de Bomba y Costos</div>
        </div>
      `;
    } else if (type === 'a3') {
      docTitle = 'Planificacion_Anual_Inspecciones_A3_2026';
      // Construir tabla A3 con aprovechamiento dinámico del 100% del alto y ancho útil
      contentHtml = `
        <div class="page a3-page full-a3-container">
          <div class="header" style="margin-bottom: 4px; padding-bottom: 4px;">
            <div class="logo-box">
              <img src="https://media.licdn.com/dms/image/v2/C4E0BAQH5mX1kscMWTA/company-logo_200_200/company-logo_200_200/0/1630608104615?e=2147483647&v=beta&t=wCTEWg_xv0Z4dIqAQZLvyMZ4fzByXvbHijhdeY8e7dE" alt="Escudo" class="logo-img" style="width: 44px; height: 44px;" />
              <div>
                <div class="inst-1" style="font-size: 11px; font-weight: normal; color: #000000;">PODER JUDICIAL DE LA NACIÓN</div>
                <div class="inst-2" style="font-size: 13px; font-weight: 800; color: #0f2d59;">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</div>
                <div class="inst-3" style="font-size: 10px; font-weight: 700; color: #334155; letter-spacing: 0.8px;">INTENDENCIA — ÁREA DE ARQUITECTURA Y MANTENIMIENTO EDILICIO</div>
              </div>
            </div>
            <div class="ot-badge-box">
              <div class="badge-num" style="font-size: 12.5px; padding: 4px 12px;">PLANIFICACIÓN ANUAL DE INSPECCIONES EDILICIAS 2026</div>
              <div class="date-txt" style="font-size: 10px; font-weight: 700;">Edificio Central: Calle Las Piedras 418 · Matriz Integral Oficial</div>
            </div>
          </div>

          <div class="a3-summary-bar">
            <div style="display: flex; gap: 18px; align-items: center;">
              <span><strong>PROGRAMA CFT:</strong> ${inspectionSheets.length} Planillas del Catálogo</span>
              <span><strong>PERÍODO:</strong> 48 Semanas (12 Meses × 4 Semanas)</span>
              <span><strong>COBERTURA:</strong> Envolventes Constructivos · Instalaciones Críticas · Servicios</span>
            </div>
            <div style="display: flex; gap: 14px; align-items: center; font-weight: bold;">
              <span style="color: #166534;"><span style="display:inline-block; width:10px; height:10px; background:#86efac; border:1px solid #4ade80; margin-right:4px; vertical-align:middle;"></span>Finalizadas</span>
              <span style="color: #854d0e;"><span style="display:inline-block; width:10px; height:10px; background:#fef08a; border:1px solid #facc15; margin-right:4px; vertical-align:middle;"></span>Pendientes</span>
              <span style="color: #475569;"><span style="display:inline-block; width:10px; height:10px; background:#cbd5e1; border:1px solid #94a3b8; margin-right:4px; vertical-align:middle;"></span>Sin Iniciar</span>
            </div>
          </div>

          <div class="a3-table-wrapper">
            <table class="a3-table dynamic-a3-table">
              <thead>
                <tr style="background: #0f2d59; color: white;">
                  <th style="width: 280px; text-align: left; padding: 4px 6px; font-size: 9.5px;">Planilla Oficial CFT</th>
                  <th style="width: 48px; text-align: center; font-size: 9px;">Frec.</th>
                  ${meses.map(m => `<th colspan="4" style="text-align: center; border-left: 1px solid #234c85; font-size: 9px; padding: 3px 0;">${m.nombre.toUpperCase()}</th>`).join('')}
                </tr>
                <tr style="background: #f0f5fa; color: #0f2d59; font-size: 8.5px;">
                  <th style="text-align: left; padding: 3px 6px;">Detalle / Sistema Edilicio</th>
                  <th style="text-align: center;">Tipo</th>
                  ${meses.map(m => m.weeks.map(w => `<th style="width: calc((100% - 328px) / 48); text-align: center; border-left: 1px solid #dbe7f2; font-family: monospace; font-size: 8px; padding: 2px 0;">S${((w-1)%4)+1}</th>`).join('')).join('')}
                </tr>
              </thead>
              <tbody>
                ${[
                  { grupo: 'Envolventes y Sistemas Constructivos', r: [1, 10] },
                  { grupo: 'Instalaciones Críticas', r: [11, 17] },
                  { grupo: 'Servicios Contratados', r: [18, 22] }
                ].map(grp => `
                  <tr style="background: #e2ecf5; font-weight: bold; color: #0f2d59; font-size: 8.5px; height: 16px;">
                    <td colspan="50" style="padding: 1px 6px; letter-spacing: 0.5px; border-top: 1px solid #b8d1e6; border-bottom: 1px solid #b8d1e6;">
                      ▪ ${grp.grupo.toUpperCase()}
                    </td>
                  </tr>
                  ${inspectionSheets.filter(s => s.id >= grp.r[0] && s.id <= grp.r[1]).map(s => `
                    <tr class="gantt-row">
                      <td style="padding: 1px 6px; font-weight: 600; font-size: 9px; border-right: 1px solid #cbd5e1; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">
                        <span style="font-family: monospace; color: #0f2d59; font-weight: bold; margin-right: 4px;">[${s.code}]</span> ${s.nombre}
                      </td>
                      <td style="text-align: center; font-size: 8px; font-weight: bold; border-right: 1px solid #cbd5e1; color: #475569;">${s.freq.slice(0, 4)}</td>
                      ${meses.map(m => m.weeks.map(w => {
                        const isSched = s.weeks.includes(w);
                        const isDone = (s.completedWeeks || []).includes(w);
                        const downloadKey = `${s.id}-${m.id}`;
                        const isDownloaded = !!downloadedSheets[downloadKey];
                        
                        let bg = 'transparent';
                        let mark = '';
                        let color = '#0f2d59';

                        if (isSched) {
                          if (isDone) {
                            bg = '#86efac';
                            mark = '✓';
                            color = '#14532d';
                          } else if (isDownloaded) {
                            bg = '#fef08a';
                            mark = '⏳';
                            color = '#854d0e';
                          } else {
                            bg = '#cbd5e1';
                            mark = '•';
                            color = '#334155';
                          }
                        }

                        return `<td style="background: ${bg}; color: ${color}; text-align: center; font-size: 8px; font-weight: bold; border-right: 1px solid #f1f5f9; padding: 0;">${mark}</td>`;
                      }).join('')).join('')}
                    </tr>
                  `).join('')}
                `).join('')}
              </tbody>
            </table>
          </div>

          <div class="a3-footer-signatures">
            <div class="sig-line-a3">
              <div class="line"></div>
              <div class="lbl">Supervisión e Intendencia CFAT</div>
              <div class="sub-lbl">Cámara Federal de Apelaciones de Tucumán</div>
            </div>
            <div class="sig-line-a3">
              <div class="line"></div>
              <div class="lbl">Encargado de Mantenimiento Edilicio</div>
              <div class="sub-lbl">Área Operativa de Mantenimiento</div>
            </div>
            <div class="sig-line-a3">
              <div class="line"></div>
              <div class="lbl">Responsable Técnico-Administrativa</div>
              <div class="sub-lbl">Gestión y Registro Operativo</div>
            </div>
          </div>

          <div class="a3-bottom-strip">
            <span>Poder Judicial de la Nación · Cámara Federal de Apelaciones de Tucumán · Planificación Anual Edilicia</span>
            <span>Formato A3 Apaisado Oficial (100% de Aprovechamiento de Hoja en 1 Sola Carilla)</span>
          </div>
        </div>
      `;
    }

    const htmlDoc = `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="utf-8" />
        <title>${docTitle}</title>
        <style>
          @page {
            size: ${type === 'a3' ? 'A3 landscape' : type === 'proveedores' ? 'A4 landscape' : 'A4 portrait'};
            margin: ${type === 'a3' ? '3mm 4mm' : type === 'proveedores' ? '9mm' : '7mm'};
          }
          * { box-sizing: border-box; }
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Arial, sans-serif;
            color: #1c2d42;
            background: white;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .page {
            max-width: ${type === 'a3' ? '100%' : '200mm'};
            margin: 0 auto;
          }
          .provider-report {
            width: 100%;
            margin: 0 auto;
            color: #1c2d42;
          }
          .provider-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 16px;
            border-bottom: 2px solid #0f2d59;
            padding: 0 0 8px;
          }
          .provider-logo {
            display: flex;
            align-items: center;
            gap: 10px;
            min-width: 0;
          }
          .provider-logo img {
            width: 48px;
            height: 48px;
            object-fit: contain;
          }
          .provider-inst-1 { color: #111827; font-size: 9px; }
          .provider-inst-2 { color: #0f2d59; font-size: 12px; font-weight: 800; }
          .provider-inst-3 { color: #334155; font-size: 8px; font-weight: 700; }
          .provider-document-title {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            gap: 3px;
            color: #0f2d59;
            font-size: 8px;
            text-align: right;
          }
          .provider-document-title strong {
            background: #0f2d59;
            color: white;
            padding: 5px 8px;
            font-size: 10px;
          }
          .provider-bar {
            margin: 8px 0 6px;
            padding: 5px 8px;
            background: #0f2d59;
            color: white;
            font-size: 9px;
            font-weight: 800;
          }
          .provider-summary {
            display: flex;
            justify-content: space-between;
            gap: 12px;
            margin-bottom: 6px;
            padding: 5px 8px;
            border: 1px solid #cbdbe8;
            background: #f0f6fa;
            color: #334155;
            font-size: 8px;
          }
          .provider-table {
            width: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            font-size: 7.5px;
          }
          .provider-table th,
          .provider-table td {
            border: 1px solid #cbd5e1;
            padding: 4px 3px;
            vertical-align: top;
            overflow-wrap: anywhere;
          }
          .provider-table th {
            background: #0f2d59;
            color: white;
            text-align: left;
            font-size: 7px;
          }
          .provider-table thead { display: table-header-group; }
          .provider-table tbody tr { break-inside: avoid; page-break-inside: avoid; }
          .provider-center { text-align: center; }
          .provider-strong { color: #0f2d59; font-weight: 700; }
          .provider-nowrap { white-space: nowrap; }
          .provider-empty { padding: 16px !important; color: #64748b; text-align: center; }
          .provider-signatures {
            display: flex;
            justify-content: space-around;
            gap: 32px;
            margin: 32px 0 12px;
            text-align: center;
          }
          .provider-signatures div { width: 40%; font-size: 8px; font-weight: 700; color: #0f2d59; }
          .provider-signatures span { display: block; height: 22px; border-bottom: 1px solid #0f2d59; margin-bottom: 4px; }
          .provider-footer {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #d9e2ec;
            padding-top: 4px;
            color: #64748b;
            font-size: 7px;
            font-weight: 700;
          }
          .full-a3-container {
            width: 100vw;
            height: 98vh;
            max-width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            padding: 4px 6px;
            box-sizing: border-box;
          }
          .a3-summary-bar {
            display: flex;
            justify-content: space-between;
            align-items: center;
            background: #f0f6fa;
            border: 1px solid #cbdbe8;
            border-radius: 4px;
            padding: 3px 10px;
            font-size: 9px;
            margin-bottom: 4px;
            flex-shrink: 0;
          }
          .a3-table-wrapper {
            flex: 1;
            display: flex;
            flex-direction: column;
            min-height: 0;
            margin-bottom: 4px;
          }
          .dynamic-a3-table {
            width: 100%;
            height: 100%;
            border-collapse: collapse;
            table-layout: fixed;
            border: 1.5px solid #0f2d59;
          }
          .dynamic-a3-table thead tr {
            height: 20px;
          }
          .dynamic-a3-table tbody tr.gantt-row {
            height: calc((100% - 70px) / 22);
          }
          .dynamic-a3-table th, .dynamic-a3-table td {
            border: 1px solid #cbd5e1;
            line-height: 1.1;
          }
          .a3-footer-signatures {
            display: flex;
            justify-content: space-around;
            padding: 6px 30px 2px 30px;
            text-align: center;
            flex-shrink: 0;
          }
          .sig-line-a3 {
            width: 250px;
          }
          .sig-line-a3 .line {
            border-bottom: 1.5px solid #0f2d59;
            height: 24px;
            margin-bottom: 3px;
          }
          .sig-line-a3 .lbl {
            font-size: 9.5px;
            font-weight: bold;
            color: #0f2d59;
            text-transform: uppercase;
          }
          .sig-line-a3 .sub-lbl {
            font-size: 8px;
            color: #64748b;
          }
          .a3-bottom-strip {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid #e2e8f0;
            padding-top: 2px;
            font-size: 7.5px;
            color: #64748b;
            flex-shrink: 0;
          }
          .full-a4 {
            min-height: 275mm;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          .fill-box {
            flex: 1;
            display: flex;
            flex-direction: column;
          }
          .header {
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-bottom: 2px solid #0f2d59;
            padding-bottom: 4px;
            margin-bottom: 6px;
          }
          .logo-box {
            display: flex;
            align-items: center;
            gap: 12px;
          }
          .logo-img {
            width: 44px;
            height: 44px;
            object-fit: contain;
          }
          .inst-1 { font-size: 10.5px; font-weight: normal; color: #000; letter-spacing: 0.5px; }
          .inst-2 { font-size: 11.5px; font-weight: 800; color: #0f2d59; }
          .inst-3 { font-size: 9.5px; font-weight: 700; color: #475569; letter-spacing: 1px; }
          .ot-badge-box { text-align: right; }
          .badge-num {
            background: #0f2d59;
            color: white;
            font-family: monospace;
            font-weight: bold;
            font-size: 11.5px;
            padding: 3px 8px;
            border-radius: 4px;
            display: inline-block;
          }
          .date-txt { font-size: 9px; color: #64748b; font-weight: 600; margin-top: 2px; }
          .bar-title {
            background: #0f2d59;
            color: white;
            text-align: center;
            padding: 3px;
            font-weight: 800;
            font-size: 11px;
            letter-spacing: 1.5px;
            border-radius: 3px;
            margin-bottom: 6px;
          }
          .sec-box {
            border: 1px solid #0f2d59;
            border-radius: 4px;
            overflow: hidden;
            margin-bottom: 6px;
            font-size: 10px;
          }
          .sec-hdr {
            background: #0f2d59;
            color: white;
            font-weight: bold;
            padding: 2.5px 6px;
            font-size: 9.5px;
            letter-spacing: 0.5px;
          }
          .grid-2 {
            display: flex;
          }
          .grid-2 > .col {
            flex: 1;
            padding: 5px 8px;
          }
          .grid-2 > .col:first-child {
            border-right: 1px solid #d9e2ec;
          }
          .col p { margin: 2px 0; }
          .mat-tbl {
            width: 100%;
            border-collapse: collapse;
            font-size: 10px;
          }
          .mat-tbl th {
            background: #f1f5f9;
            border-bottom: 1px solid #cbd5e1;
            padding: 3px 6px;
            font-size: 9px;
          }
          .mat-tbl td {
            padding: 3px 6px;
            border-bottom: 1px solid #e2e8f0;
          }
          .signatures {
            display: flex;
            justify-content: space-around;
            padding: 12px 15px 4px 15px;
            text-align: center;
          }
          .sig-line { width: 200px; }
          .sig-line .line {
            border-bottom: 1px solid #1c2d42;
            height: 28px;
            margin-bottom: 3px;
          }
          .sig-line .lbl {
            font-size: 9.5px;
            font-weight: bold;
            color: #1c2d42;
          }
          .carilla-1 {
            page-break-before: auto !important;
            break-before: auto !important;
            page-break-after: always !important;
            break-after: page !important;
            height: 275mm !important;
            max-height: 275mm !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .carilla-2 {
            page-break-before: always !important;
            break-before: page !important;
            page-break-after: avoid !important;
            break-after: avoid !important;
            height: 275mm !important;
            max-height: 275mm !important;
            overflow: hidden !important;
            box-sizing: border-box !important;
          }
          .footer-note {
            text-align: center;
            font-size: 8.5px;
            color: #64748b;
            font-weight: 600;
            margin-top: 3px;
          }
          .action-bar {
            position: fixed;
            top: 10px;
            right: 10px;
            background: #0f2d59;
            padding: 8px 12px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: flex;
            gap: 8px;
            z-index: 9999;
          }
          .action-btn {
            background: white;
            color: #0f2d59;
            border: none;
            padding: 6px 14px;
            border-radius: 5px;
            font-weight: bold;
            cursor: pointer;
            font-size: 11px;
          }
          .action-btn.primary {
            background: #22c55e;
            color: white;
          }
          @media print {
            .action-bar { display: none !important; }
            html, body {
              width: 100% !important;
              height: auto !important;
              margin: 0 !important;
              padding: 0 !important;
              overflow: visible !important;
            }
            .page {
              margin: 0 auto !important;
            }
            .carilla-1 {
              height: 275mm !important;
              max-height: 275mm !important;
              overflow: hidden !important;
              page-break-after: always !important;
              break-after: page !important;
              box-sizing: border-box !important;
            }
            .carilla-2 {
              height: 275mm !important;
              max-height: 275mm !important;
              overflow: hidden !important;
              page-break-before: always !important;
              break-before: page !important;
              page-break-after: avoid !important;
              break-after: avoid !important;
              box-sizing: border-box !important;
            }
            .full-a3-container {
              width: 100% !important;
              height: 100vh !important;
              padding: 2mm 3mm !important;
            }
          }
        </style>
      </head>
      <body>
        <div class="action-bar">
          <button class="action-btn primary" onclick="window.print()">🖨️ Abrir Diálogo de Impresión (o Microsoft Print to PDF)</button>
          <button class="action-btn" onclick="window.close()">✕ Cerrar</button>
        </div>
        ${contentHtml}
      </body>
      </html>
    `;

    printWindow.document.open();
    printWindow.document.write(htmlDoc);
    printWindow.document.close();
  };

  // Función para descargar directamente como archivo HTML oficial (offline / imprimible en cualquier momento)
  const handleDownloadOfflineHTML = (type, data = null) => {
    handlePrintDocument(type, data);
  };

  // Lista de 12 meses con 4 semanas cada uno (48 semanas en total)
  const meses = [
    { id: 0, nombre: 'Enero', weeks: [1, 2, 3, 4] },
    { id: 1, nombre: 'Febrero', weeks: [5, 6, 7, 8] },
    { id: 2, nombre: 'Marzo', weeks: [9, 10, 11, 12] },
    { id: 3, nombre: 'Abril', weeks: [13, 14, 15, 16] },
    { id: 4, nombre: 'Mayo', weeks: [17, 18, 19, 20] },
    { id: 5, nombre: 'Junio', weeks: [21, 22, 23, 24] },
    { id: 6, nombre: 'Julio', weeks: [25, 26, 27, 28] },
    { id: 7, nombre: 'Agosto', weeks: [29, 30, 31, 32] },
    { id: 8, nombre: 'Septiembre', weeks: [33, 34, 35, 36] },
    { id: 9, nombre: 'Octubre', weeks: [37, 38, 39, 40] },
    { id: 10, nombre: 'Noviembre', weeks: [41, 42, 43, 44] },
    { id: 11, nombre: 'Diciembre', weeks: [45, 46, 47, 48] }
  ];

  // Mes en curso actual del sistema (0 = Enero, 11 = Diciembre)
  const currentSystemMonth = new Date().getMonth();

  // Estado para el mes en hover dentro del gráfico dinámico
  const [hoveredMonthId, setHoveredMonthId] = useState(null);
  const [selectedMonthModal, setSelectedMonthModal] = useState(null);

  // Estado para la ficha seleccionada activamente dentro del panel mensual
  const [selectedSheetInMonth, setSelectedSheetInMonth] = useState(null);
  
  // Estado para la pestaña de semana seleccionada dentro del detalle mensual (all | 1 | 2 | 3 | 4)
  const [selectedWeekTab, setSelectedWeekTab] = useState('all');
  
  // Estado para Ficha Edilicia Seleccionada para Edición / Previsualización en el Módulo de Fichas (1-22)
  const [selectedCatalogSheet, setSelectedCatalogSheet] = useState(null);
  const [isCatalogModalOpen, setIsCatalogModalOpen] = useState(false);
  const [isCatalogPreviewOpen, setIsCatalogPreviewOpen] = useState(false);
  const [catalogEditMode, setCatalogEditMode] = useState(false);
  const [catalogFormData, setCatalogFormData] = useState({
    id: 1,
    code: 'PL-01',
    grupo: 'Envolventes y Sistemas Constructivos',
    nombre: 'Fachada (Alucobond y Granito)',
    freq: 'Trimestral',
    estadoInspeccion: 'Pendiente',
    inspector: 'Di Gregori, Ramón',
    fechaInspeccion: new Date().toLocaleDateString('es-AR'),
    observacionesTecnicas: 'Revisión ocular general de paneles compuestos, anclajes perimetrales y estado de juntas de estanqueidad sin fisuras visibles.',
    hallazgos: 'Sin anomalías estructurales de riesgo en el sector frontal.',
    recomendaciones: 'Mantener programa de limpieza trimestral de cristales y paneles.',
    materialesUtilizados: [
      { id: 1, cantidad: 1, unidad: 'Kit', descripcion: 'Sellador acrílico y elementos de limpieza' }
    ]
  });

  // Registro de fichas descargadas por mes: clave `${sheetId}-${monthId}` => boolean
  const [downloadedSheets, setDownloadedSheets] = useState<Record<string, boolean>>({
    // Inicializar algunas del mes de enero como descargadas de ejemplo
    '1-0': true,
    '2-0': true,
    '3-0': true,
    '4-0': true,
    '6-0': true,
    '7-0': true,
    '8-0': true,
    '11-0': true,
    '12-0': true,
    '13-0': true,
    '14-0': true,
    '16-0': true,
    '17-0': true,
    '18-0': true,
    '19-0': true,
    '20-0': true,
    '21-0': true,
    '22-0': true
  });

  // Componente interactivo deslizable (Slider) suave: solo finaliza al soltar el mouse al final del recorrido
  const SlideToFinishButton = ({ sheetId, monthWeeks, isDone, onFinish, onReopen }) => {
    const [sliderPos, setSliderPos] = useState(isDone ? 100 : 0);
    const [isDragging, setIsDragging] = useState(false);
    const trackRef = React.useRef(null);
    const startXRef = React.useRef(0);
    const currentPosRef = React.useRef(isDone ? 100 : 0);

    React.useEffect(() => {
      setSliderPos(isDone ? 100 : 0);
      currentPosRef.current = isDone ? 100 : 0;
    }, [isDone]);

    const handlePointerDown = (e) => {
      if (isDone) return;
      e.stopPropagation();
      e.preventDefault();

      const target = e.currentTarget;
      target.setPointerCapture(e.pointerId);

      setIsDragging(true);
      startXRef.current = e.clientX;
      currentPosRef.current = sliderPos;
    };

    const handlePointerMove = (e) => {
      if (!isDragging || isDone || !trackRef.current) return;
      e.stopPropagation();

      const trackRect = trackRef.current.getBoundingClientRect();
      const knobSize = 28;
      // Cálculo corregido para contener exactamente el pomo dentro de los límites del contenedor
      const travelDistance = trackRect.width - knobSize - 6;
      if (travelDistance <= 0) return;

      const deltaX = e.clientX - startXRef.current;
      const deltaPct = (deltaX / travelDistance) * 100;
      const newPos = Math.max(0, Math.min(100, deltaPct));

      currentPosRef.current = newPos;
      setSliderPos(newPos);
    };

    const handlePointerUp = (e) => {
      if (!isDragging || isDone) return;
      e.stopPropagation();
      setIsDragging(false);

      try {
        if (e.currentTarget?.hasPointerCapture(e.pointerId)) {
          e.currentTarget.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}

      if (currentPosRef.current >= 85) {
        setSliderPos(100);
        currentPosRef.current = 100;
        onFinish();
      } else {
        setSliderPos(0);
        currentPosRef.current = 0;
      }
    };

    if (isDone) {
      return (
        <div className="flex items-center space-x-2 select-none">
          <div className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[11px] font-bold bg-[#16a34a] text-white shadow-xs">
            <Check className="w-3.5 h-3.5 stroke-[3]" />
            <span>✓ Finalizado</span>
          </div>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onReopen();
            }}
            className="text-[10.5px] font-semibold text-[#64748b] hover:text-[#991b1b] underline cursor-pointer transition-colors"
            title="Reabrir inspección"
          >
            Reabrir
          </button>
        </div>
      );
    }

    return (
      <div
        ref={trackRef}
        onClick={(e) => e.stopPropagation()}
        className="relative w-44 sm:w-48 h-8 rounded-lg bg-[#fef08a] border border-[#facc15] p-0.5 flex items-center select-none overflow-hidden touch-none"
      >
        {/* Relleno verde pastel suave */}
        <div 
          className={`absolute left-0 top-0 bottom-0 bg-[#86efac] border-r border-[#4ade80] pointer-events-none ${
            isDragging ? 'transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{ width: `${Math.max(0, Math.min(100, sliderPos))}%` }}
        />

        {/* Texto orientador */}
        <span className="w-full text-center text-[10px] font-bold text-[#713f12] pointer-events-none z-10 pl-6 select-none tracking-tight">
          {sliderPos >= 85 ? 'Suelte para finalizar' : 'Deslizar al final »'}
        </span>

        {/* Perilla deslizable con límites ajustados para no sobresalir */}
        <div
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          className={`absolute left-0.5 top-0.5 bottom-0.5 w-7 h-7 rounded-md bg-[#0f2d59] hover:bg-[#153e77] active:bg-[#091b36] text-white flex items-center justify-center shadow-md z-20 cursor-grab active:cursor-grabbing select-none ${
            isDragging ? 'scale-105 shadow-lg transition-none' : 'transition-all duration-300 ease-out'
          }`}
          style={{ 
            transform: `translateX(calc(${(sliderPos / 100)} * (100% - 2px)))`,
            left: `${(sliderPos / 100) * 138}px`
          }}
        >
          <ChevronRight className="w-4 h-4 stroke-[3]" />
        </div>
      </div>
    );
  };

  // Cálculo dinámico de inspecciones por mes divididas en:
  // 1. Finalizadas (Verde pastel)
  // 2. Pendientes (Amarillo pastel)
  // 3. Sin Iniciar (Gris pastel)
  const monthlyStats = meses.map(m => {
    const sheetsInMonth = inspectionSheets.filter(s => 
      s.weeks.some(w => m.weeks.includes(w))
    );

    let finalizadasCount = 0;
    let pendientesCount = 0;
    let sinIniciarCount = 0;

    sheetsInMonth.forEach(s => {
      const isDone = (s.completedWeeks || []).some(w => m.weeks.includes(w));
      const downloadKey = `${s.id}-${m.id}`;
      const isDownloaded = !!downloadedSheets[downloadKey];

      if (isDone) {
        finalizadasCount += 1;
      } else if (isDownloaded) {
        pendientesCount += 1;
      } else {
        sinIniciarCount += 1;
      }
    });

    const totalSlots = inspectionSheets.reduce((acc, s) => {
      const countInMonth = s.weeks.filter(w => m.weeks.includes(w)).length;
      return acc + countInMonth;
    }, 0);

    return {
      id: m.id,
      nombre: m.nombre,
      weeks: m.weeks,
      sheets: sheetsInMonth,
      uniqueCount: sheetsInMonth.length,
      finalizadas: finalizadasCount,
      pendientes: pendientesCount,
      sinIniciar: sinIniciarCount,
      totalIntervenciones: totalSlots
    };
  });

  const maxMonthCount = Math.max(...monthlyStats.map(s => s.uniqueCount), 1);

  // Manejo de la descarga de la planilla: pasa a estado Pendiente (amarillo)
  const handleDownloadSheet = (sheetId, monthId, monthWeeks, sheetName, sheetCode) => {
    const key = `${sheetId}-${monthId}`;
    setDownloadedSheets(prev => ({ ...prev, [key]: true }));

    // Si estaba marcada como realizada, la remueve para colocarla en pendiente al descargar
    setInspectionSheets(prev => prev.map(sheet => {
      if (sheet.id === sheetId) {
        const currentCompleted = sheet.completedWeeks || [];
        const updatedCompleted = currentCompleted.filter(w => !monthWeeks.includes(w));
        return {
          ...sheet,
          completedWeeks: updatedCompleted
        };
      }
      return sheet;
    }));

    // Vincular con la ficha real del catálogo para abrir directamente el diálogo de impresión oficial A4
    const fichaEncontrada = fichasEdiliciasData.find(f => 
      f.id === sheetCode || 
      f.codigo === sheetCode || 
      f.id.replace('PL-', '') === sheetId.toString() ||
      f.titulo.toLowerCase().trim() === sheetName.toLowerCase().trim()
    );

    if (fichaEncontrada) {
      handleOpenPrintFicha(fichaEncontrada);
    } else {
      // Si no existiera en el catálogo, generar estructura al vuelo y abrir impresión
      const fallbackFicha = {
        id: `PL-${sheetId}`,
        codigo: sheetCode || `FICHA N° ${sheetId}`,
        titulo: sheetName,
        grupoNombre: 'PROGRAMA DE MANTENIMIENTO EDILICIO',
        edificio: 'Cámara Federal de Apelaciones de Tucumán (Sede Central)',
        sector: 'Sector Asignado',
        nivel: 'Planta Edilicia',
        inspector: 'Di Gregori, Ramón',
        fecha: new Date().toLocaleDateString('es-AR'),
        motivo: 'Periódica / Preventiva',
        rubros: [
          {
            id: 'R-1',
            nombre: sheetName,
            patologias: [
              { id: 'p1', descripcion: 'Estado general y conservación', estado: 'Ninguna', obs: 'Relevamiento conforme' },
              { id: 'p2', descripcion: 'Fisuras, suciedad o deterioro de funcionamiento', estado: 'Ninguna', obs: 'Sin novedades de riesgo' }
            ]
          }
        ],
        cronograma: [
          { tarea: 'Inspección ocular y mantenimiento preventivo', frecuencia: 'Mensual / Trimestral', accion: 'Procedimiento estándar CFT' }
        ]
      };
      handleOpenPrintFicha(fallbackFicha);
    }
  };

  // Finalizar planilla: pasa a estado Finalizado (verde pastel) de forma inmediata y persistente
  const handleFinishSheet = (sheetId, monthWeeks) => {
    setInspectionSheets(prev => prev.map(sheet => {
      if (sheet.id === sheetId) {
        const currentCompleted = sheet.completedWeeks || [];
        const sheetScheduledInMonth = sheet.weeks.filter(w => monthWeeks.includes(w));
        // Si no tenía semanas explícitamente programadas en el mes, asigna la primera semana del mes
        const weeksToAdd = sheetScheduledInMonth.length > 0 ? sheetScheduledInMonth : [monthWeeks[0]];
        const updatedCompleted = Array.from(new Set([...currentCompleted, ...weeksToAdd]));
        return {
          ...sheet,
          completedWeeks: updatedCompleted
        };
      }
      return sheet;
    }));
  };

  // Reabrir o alternar el estado de ejecución de una planilla en un mes específico
  const toggleSheetCompletionInMonth = (sheetId, monthWeeks) => {
    setInspectionSheets(prev => prev.map(sheet => {
      if (sheet.id === sheetId) {
        const currentCompleted = sheet.completedWeeks || [];
        const monthActiveCompleted = currentCompleted.filter(w => monthWeeks.includes(w));
        const sheetScheduledInMonth = sheet.weeks.filter(w => monthWeeks.includes(w));
        const weeksToAdd = sheetScheduledInMonth.length > 0 ? sheetScheduledInMonth : [monthWeeks[0]];

        let updatedCompleted;
        if (monthActiveCompleted.length > 0) {
          // Reabrir: la vuelve a colocar en pendiente
          updatedCompleted = currentCompleted.filter(w => !monthWeeks.includes(w));
        } else {
          // Finalizar
          updatedCompleted = Array.from(new Set([...currentCompleted, ...weeksToAdd]));
        }

        return {
          ...sheet,
          completedWeeks: updatedCompleted
        };
      }
      return sheet;
    }));
  };

  // Alternar programación de una planilla en una semana específica
  const toggleInspectionWeek = (sheetId, weekNum) => {
    setInspectionSheets(prev => prev.map(sheet => {
      if (sheet.id === sheetId) {
        const exists = sheet.weeks.includes(weekNum);
        return {
          ...sheet,
          weeks: exists ? sheet.weeks.filter(w => w !== weekNum) : [...sheet.weeks, weekNum].sort((a, b) => a - b),
          completedWeeks: (sheet.completedWeeks || []).filter(w => exists ? w !== weekNum : true)
        };
      }
      return sheet;
    }));
  };

  const findInspectionSheetForFicha = (ficha, sheets = inspectionSheets) => sheets.find(sheet =>
    sheet.fichaIdRef === ficha.id ||
    sheet.code === ficha.id ||
    sheet.code === ficha.codigo ||
    String(sheet.id).padStart(2, '0') === ficha.id.replace('PL-', '')
  );

  const handleOpenAnnualPlanner = () => {
    const draft = Object.fromEntries(meses.map(month => [month.id, []]));
    const weekDraft = Object.fromEntries(meses.map(month => [month.id, 1]));

    inspectionSheets.forEach(sheet => {
      const ficha = fichasEdiliciasData.find(item =>
        item.id === sheet.fichaIdRef ||
        item.id === sheet.code ||
        item.codigo === sheet.code ||
        item.id.replace('PL-', '') === String(sheet.id).padStart(2, '0')
      );
      if (!ficha) return;

      (sheet.weeks || []).forEach(week => {
        const monthId = Math.floor((week - 1) / 4);
        if (!draft[monthId].includes(ficha.id)) {
          draft[monthId].push(ficha.id);
          weekDraft[monthId] = ((week - 1) % 4) + 1;
        }
      });
    });

    setAnnualPlanDraft(draft);
    setPlannerWeekByMonth(weekDraft);
    setActivePlannerMonth(currentSystemMonth);
    setActiveTab('planificacion');
    setIsAnnualPlannerOpen(true);
  };

  const handleSaveAnnualPlanner = () => {
    const nextSheets = fichasEdiliciasData.map((ficha, index) => {
      const previous = findInspectionSheetForFicha(ficha);
      const weeks = meses.flatMap(month => (
        (annualPlanDraft[month.id] || []).includes(ficha.id)
          ? [month.id * 4 + Math.min(4, Math.max(1, Number(plannerWeekByMonth[month.id]) || 1))]
          : []
      ));
      const rawFrequency = ficha.cronograma?.[0]?.frecuencia || '';
      const frequencyNumber = Number(rawFrequency.match(/\d+/)?.[0] || 0);
      let frequency = previous?.freq || 'Trimestral';
      if (/año|anual/i.test(rawFrequency)) frequency = 'Anual';
      else if (frequencyNumber === 1) frequency = 'Mensual';
      else if (frequencyNumber > 1 && frequencyNumber <= 3) frequency = 'Trimestral';
      else if (frequencyNumber > 3 && frequencyNumber <= 6) frequency = 'Semestral';

      const grupo = ficha.grupoId === 'sistema-edilicio'
        ? 'Envolventes y Sistemas Constructivos'
        : ficha.grupoId === 'instalaciones-criticas'
          ? 'Instalaciones Críticas'
          : 'Servicios';

      return {
        id: previous?.id || index + 1,
        fichaIdRef: ficha.id,
        code: ficha.codigo || ficha.id,
        grupo,
        nombre: ficha.titulo,
        freq: frequency,
        color: previous?.color || 'bg-blue-600',
        weeks,
        completedWeeks: (previous?.completedWeeks || []).filter(week => weeks.includes(week))
      };
    });

    setInspectionSheets(nextSheets);
    setDownloadedSheets({});
    setSelectedMonthModal(null);
    setSelectedSheetInMonth(null);
    setIsAnnualPlannerOpen(false);
  };

  // Alternar directamente estado realizado/pendiente en una semana desde el Gantt
  const toggleWeekCompletion = (sheetId, weekNum, e) => {
    e.stopPropagation();
    setInspectionSheets(prev => prev.map(sheet => {
      if (sheet.id === sheetId) {
        const completed = sheet.completedWeeks || [];
        const isDone = completed.includes(weekNum);
        return {
          ...sheet,
          completedWeeks: isDone ? completed.filter(w => w !== weekNum) : [...completed, weekNum]
        };
      }
      return sheet;
    }));
  };

  // --- CONFIGURACIÓN DINÁMICA DE LISTADOS DESPLEGABLES ---
  const [configSection, setConfigSection] = useState('parametros-ot'); // 'root' | 'parametros-ot'
  const [configSubSection, setConfigSubSection] = useState('listas-desplegables'); // 'listas-desplegables'
  const [configSubTab, setConfigSubTab] = useState('dependencias');
  const [dropdownOptions, setDropdownOptions] = useState({
    dependencias: [
      'Cámara Federal de Apelaciones de Tucumán',
      'Juzgado Federal N° 1',
      'Juzgado Federal N° 2',
      'Secretaría Electoral de Tucumán'
    ],
    pisos: [
      '1° Subsuelo',
      '2° Subsuelo',
      'Planta Baja',
      '1° Piso',
      '2° Piso',
      '3° Piso',
      '4° Piso',
      '5° Piso',
      '6° Piso',
      'Terraza 1° Piso',
      'Azotea y Cubiertas',
      'Vereda'
    ],
    rubros: [
      'Electricidad',
      'Sanitarios',
      'Albañilería',
      'Cerrajería',
      'Pintura',
      'Herrería',
      'Otros'
    ],
    tecnicos: [
      'Di Gregori, Ramón',
      'Di Gregori, Gabriel',
      'Santiago Gigena',
      'Otros'
    ],
    prioridades: [
      'Baja',
      'Media',
      'Alta',
      'Urgente'
    ],
    edificios: [
      'Cámara Federal de Apelaciones de Tucumán, calle Las Piedras 418'
    ]
  });

  const [newOptionInput, setNewOptionInput] = useState('');

  const handleAddDropdownOption = (category) => {
    if (!newOptionInput.trim()) return;
    if (dropdownOptions[category].includes(newOptionInput.trim())) {
      alert('Esta opción ya existe en el listado.');
      return;
    }
    setDropdownOptions(prev => {
      const currentList = prev[category] || [];
      const hasOtros = currentList.includes('Otros');
      const filtered = currentList.filter(item => item !== 'Otros');
      const updated = [...filtered, newOptionInput.trim()];
      if (hasOtros) {
        updated.push('Otros');
      }
      return {
        ...prev,
        [category]: updated
      };
    });
    setNewOptionInput('');
  };

  const handleRemoveDropdownOption = (category, item) => {
    if (dropdownOptions[category].length <= 1) {
      alert('El listado debe contener al menos una opción.');
      return;
    }
    setDropdownOptions(prev => ({
      ...prev,
      [category]: prev[category].filter(opt => opt !== item)
    }));
  };

  // Función para dar de alta usuario desde Configuración
  const handleCreateUser = () => {
    if (!newUserFormData.nombre.trim() || !newUserFormData.usuario.trim()) {
      alert('Por favor complete el nombre completo y el nombre de usuario.');
      return;
    }
    const cleanUser = newUserFormData.usuario.trim().toLowerCase();
    if (usuariosSistema.some(u => u.usuario.toLowerCase() === cleanUser)) {
      alert('Ese nombre de usuario ya está registrado en el sistema.');
      return;
    }
    const newId = `USR-${(usuariosSistema.length + 1).toString().padStart(2, '0')}`;
    const newUser = {
      id: newId,
      nombre: newUserFormData.nombre.trim(),
      usuario: cleanUser,
      clave: newUserFormData.clave || '1234',
      email: newUserFormData.email.trim() || `${cleanUser}@pjn.gov.ar`,
      rol: newUserFormData.rol,
      estado: 'Activo',
      fechaAlta: new Date().toLocaleDateString('es-AR')
    };

    setUsuariosSistema(prev => [...prev, newUser]);

    // Si es Técnico, ofrecer o agregarlo automáticamente al listado de técnicos de OT
    if (newUser.rol === 'Técnico' && !dropdownOptions.tecnicos.includes(newUser.nombre)) {
      setDropdownOptions(prev => {
        const currentList = prev.tecnicos || [];
        const hasOtros = currentList.includes('Otros');
        const filtered = currentList.filter(item => item !== 'Otros');
        const updated = [...filtered, newUser.nombre];
        if (hasOtros) updated.push('Otros');
        return { ...prev, tecnicos: updated };
      });
    }

    setIsNewUserModalOpen(false);
    setNewUserFormData({
      nombre: '',
      usuario: '',
      clave: '1234',
      email: '',
      rol: 'Técnico'
    });
  };

  const handleToggleUserStatus = (userId) => {
    setUsuariosSistema(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, estado: u.estado === 'Activo' ? 'Inactivo' : 'Activo' };
      }
      return u;
    }));
  };

  const handleDeleteUser = (userId) => {
    if (usuariosSistema.length <= 1) {
      alert('Debe existir al menos un usuario registrado en el sistema.');
      return;
    }
    setUsuariosSistema(prev => prev.filter(u => u.id !== userId));
  };

  // Material item counter & attributes
  const [matQty, setMatQty] = useState(1);
  const [matDesc, setMatDesc] = useState('');
  const [matUnit, setMatUnit] = useState('Un.');
  const [matDevolucion, setMatDevolucion] = useState(false);

  // Initial Work Orders data
  const [orders, setOrders] = useState([
    {
      id: 'OT 01/26',
      tipoMantenimiento: 'Correctiva',
      dependencia: 'Cámara Federal de Apelaciones de Tucumán',
      edificio: 'Cámara Federal de Apelaciones de Tucumán, calle Las Piedras 418',
      sector: '1° Piso',
      oficina: 'Secretaría de Cámara N° 2',
      solicitante: 'Dr. Fernando Morales',
      prioridad: 'Alta',
      rubro: 'Electricidad',
      rubroOtro: '',
      descripcion: 'Falla intermitente en circuito de tomas y parpadeo de luminaria en sala de despacho.',
      tecnico: 'Di Gregori, Ramón',
      tecnicoOtro: '',
      fechaSolicitud: new Date().toLocaleDateString('es-AR'),
      fechaAsignacion: new Date().toLocaleDateString('es-AR'),
      fechaInicio: new Date().toLocaleDateString('es-AR'),
      fechaFin: '',
      estadoEjecucion: 'En Curso',
      observaciones: 'Coordinar ingreso con personal de mesa de entrada en horario de 8 a 13 hs.',
      tareas: 'Revisión de llave termomagnética y sustitución de artefacto LED.',
      fichaRequerida: '',
      materiales: [
        { id: 1, cantidad: 2, unidad: 'Un.', descripcion: 'Tubo LED 18W Philips', devolucion: false },
        { id: 2, cantidad: 1, unidad: 'Un.', descripcion: 'Llave unipolar Sica', devolucion: true }
      ]
    },
    {
      id: 'OT 02/26',
      tipoMantenimiento: 'Inspección Edilicia',
      dependencia: 'Cámara Federal de Apelaciones de Tucumán',
      edificio: 'Cámara Federal de Apelaciones de Tucumán, calle Las Piedras 418',
      sector: 'Azotea y Cubiertas',
      oficina: 'Exterior',
      solicitante: 'Intendencia de Cámara',
      prioridad: 'Media',
      rubro: 'Otros',
      rubroOtro: 'Estructura e Impermeabilización',
      descripcion: 'Inspección técnica ocular trimestral de juntas de dilatación y paneles Alucobond.',
      tecnico: 'Di Gregori, Gabriel',
      tecnicoOtro: '',
      fechaSolicitud: new Date().toLocaleDateString('es-AR'),
      fechaAsignacion: new Date().toLocaleDateString('es-AR'),
      fechaInicio: new Date().toLocaleDateString('es-AR'),
      fechaFin: new Date().toLocaleDateString('es-AR'),
      estadoEjecucion: 'Finalizada',
      observaciones: 'Completar protocolo según Ficha Técnica N° 1.',
      tareas: 'Revisión perimetral, sellado y fijaciones sin fisuras de riesgo.',
      fichaRequerida: 'Ficha N°1 — Fachada (Paneles Alucobond y Granito) (Trimestral / Anual)',
      materiales: [
        { id: 1, cantidad: 1, unidad: 'Kit', descripcion: 'Sellador Poliuretánico Sikaflex 1A', devolucion: false }
      ]
    }
  ]);

  // Form State
  const [formData, setFormData] = useState({
    id: `OT ${(orders.length + 1).toString().padStart(2, '0')}/26`,
    tipoMantenimiento: '-- Seleccionar opción --',
    dependencia: '-- Seleccionar opción --',
    edificio: 'Cámara Federal de Apelaciones de Tucumán, calle Las Piedras 418',
    sector: '-- Seleccionar opción --',
    oficina: '',
    solicitante: '',
    prioridad: '-- Seleccionar opción --',
    rubro: '-- Seleccionar opción --',
    rubroOtro: '',
    descripcion: '',
    tecnico: '-- Seleccionar opción --',
    tecnicoOtro: '',
    fechaSolicitud: new Date().toLocaleDateString('es-AR'),
    fechaAsignacion: new Date().toLocaleDateString('es-AR'),
    fechaInicio: '',
    fechaFin: '',
    estadoEjecucion: 'Pendiente',
    observaciones: '',
    tareas: '',
    fichaRequerida: '-- Seleccionar opción --',
    materiales: []
  });

  // Estado para resaltar campos obligatorios incompletos al intentar registrar/imprimir
  const [formErrors, setFormErrors] = useState({});

  const handleOpenNewOrder = () => {
    setFormData({
      id: `OT ${(orders.length + 1).toString().padStart(2, '0')}/26`,
      tipoMantenimiento: '-- Seleccionar opción --',
      dependencia: '-- Seleccionar opción --',
      edificio: 'Cámara Federal de Apelaciones de Tucumán, calle Las Piedras 418',
      sector: '-- Seleccionar opción --',
      oficina: '',
      solicitante: '',
      prioridad: '-- Seleccionar opción --',
      rubro: '-- Seleccionar opción --',
      rubroOtro: '',
      descripcion: '',
      tecnico: '-- Seleccionar opción --',
      tecnicoOtro: '',
      fechaSolicitud: new Date().toLocaleDateString('es-AR'),
      fechaAsignacion: '',
      fechaInicio: '',
      fechaFin: '',
      estadoEjecucion: 'Sin Asignar',
      observaciones: '',
      tareas: '',
      fichaRequerida: '-- Seleccionar opción --',
      materiales: []
    });
    setFormErrors({});
    setMatQty(1);
    setMatDesc('');
    setMatDevolucion(false);
    setIsNewOrderModal(true);
    setIsOrderEditLocked(false); // Abierta y desbloqueada directamente para cargar
    setIsModalOpen(true);
  };

  const handleAddMaterial = () => {
    if (!matDesc.trim()) return;
    const newMat = {
      id: Date.now(),
      cantidad: matQty,
      unidad: matUnit,
      descripcion: matDesc,
      devolucion: matDevolucion
    };
    setFormData(prev => ({
      ...prev,
      materiales: [...prev.materiales, newMat]
    }));
    setMatDesc('');
    setMatQty(1);
    setMatDevolucion(false);
  };

  const handleRemoveMaterial = (id) => {
    setFormData(prev => ({
      ...prev,
      materiales: prev.materiales.filter(m => m.id !== id)
    }));
  };

  // NUEVO: Alternar dinámicamente si un material requiere devolución o es consumible
  const handleToggleMaterialDevolucion = (id) => {
    setFormData(prev => ({
      ...prev,
      materiales: prev.materiales.map(m => 
        m.id === id ? { ...m, devolucion: !m.devolucion } : m
      )
    }));
  };

  // Función de validación de campos obligatorios
  const validateForm = () => {
    const errors = {};
    if (!formData.tipoMantenimiento || formData.tipoMantenimiento === '-- Seleccionar opción --') {
      errors.tipoMantenimiento = true;
    }
    if (!formData.dependencia || formData.dependencia === '-- Seleccionar opción --') {
      errors.dependencia = true;
    }
    if (!formData.edificio || formData.edificio === '-- Seleccionar opción --') {
      errors.edificio = true;
    }
    if (!formData.sector || formData.sector === '-- Seleccionar opción --') {
      errors.sector = true;
    }
    if (!formData.oficina || !formData.oficina.trim()) {
      errors.oficina = true;
    }
    if (!formData.prioridad || formData.prioridad === '-- Seleccionar opción --') {
      errors.prioridad = true;
    }
    if (!formData.descripcion || !formData.descripcion.trim()) {
      errors.descripcion = true;
    }
    if (formData.tipoMantenimiento === 'Inspección Edilicia') {
      if (!formData.fichaRequerida || formData.fichaRequerida === '-- Seleccionar opción --') {
        errors.fichaRequerida = true;
      }
    }
    if (formData.rubro === 'Otros' && (!formData.rubroOtro || !formData.rubroOtro.trim())) {
      errors.rubroOtro = true;
    }
    if (formData.tecnico === 'Otros' && (!formData.tecnicoOtro || !formData.tecnicoOtro.trim())) {
      errors.tecnicoOtro = true;
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegisterOrder = () => {
    if (!validateForm()) {
      return;
    }
    const orderToSave = {
      ...formData,
      rubroFinal: formData.rubro === 'Otros' && formData.rubroOtro ? formData.rubroOtro : formData.rubro,
      tecnicoFinal: formData.tecnico === 'Otros' && formData.tecnicoOtro ? formData.tecnicoOtro : formData.tecnico
    };
    setOrders(prev => [orderToSave, ...prev]);
    setFormErrors({});
    setIsModalOpen(false);
  };

  const handleRegisterAndPrint = () => {
    if (!validateForm()) {
      return;
    }
    const orderToSave = {
      ...formData,
      rubroFinal: formData.rubro === 'Otros' && formData.rubroOtro ? formData.rubroOtro : formData.rubro,
      tecnicoFinal: formData.tecnico === 'Otros' && formData.tecnicoOtro ? formData.tecnicoOtro : formData.tecnico
    };
    setOrders(prev => [orderToSave, ...prev]);
    setSelectedOrder(orderToSave);
    setFormErrors({});
    setIsModalOpen(false);
    
    // Disparar ventana de impresión limpia inmediata
    handlePrintDocument('order', orderToSave);
  };

  const handlePreviewCurrent = () => {
    const previewData = {
      ...formData,
      rubroFinal: formData.rubro === 'Otros' && formData.rubroOtro ? formData.rubroOtro : formData.rubro,
      tecnicoFinal: formData.tecnico === 'Otros' && formData.tecnicoOtro ? formData.tecnicoOtro : formData.tecnico
    };
    setSelectedOrder(previewData);
    setIsPreviewOpen(true);
  };

  const filteredOrders = orders.filter(o => {
    const tecText = o.tecnicoFinal || o.tecnico || '';
    const rubText = o.rubroFinal || o.rubro || '';
    const matchesSearch = o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.solicitante.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tecText.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rubText.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = filterPriority === 'all' || o.prioridad === filterPriority;
    const matchesType = filterType === 'all' || o.tipoMantenimiento === filterType;
    const matchesDependencia = filterDependencia === 'all' || o.dependencia === filterDependencia;
    const matchesRubro = filterRubro === 'all' || rubText === filterRubro;
    return matchesSearch && matchesPriority && matchesType && matchesDependencia && matchesRubro;
  });

  // =========================================================================
  // PANTALLA PRINCIPAL: PORTAL DE ACCESO INSTITUCIONAL (SI NO ESTÁ AUTENTICADO)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0a1e3b] via-[#0f2d59] to-[#163e75] text-[#1c2d42] font-sans flex flex-col justify-between p-4 sm:p-6 select-none">
        
        {/* Cabecera Superior del Portal */}
        <header className="w-full max-w-5xl mx-auto flex items-center justify-between pb-4 border-b border-white/10 text-white">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-xl bg-white p-1 flex items-center justify-center shadow-md">
              <EscudoPJN className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="text-[10px] tracking-widest uppercase font-semibold text-sky-200 block">
                República Argentina
              </span>
              <h1 className="text-xs sm:text-sm font-extrabold tracking-wide uppercase leading-tight">
                Poder Judicial de la Nación
              </h1>
            </div>
          </div>
          <div className="text-right hidden sm:block">
            <span className="text-[10px] font-mono text-sky-200/90 block">Sistema Oficial de Gestión</span>
            <span className="text-xs font-bold text-white uppercase tracking-wider">Intendencia CFT</span>
          </div>
        </header>

        {/* Tarjeta Central de Inicio de Sesión */}
        <div className="w-full max-w-md mx-auto my-auto py-6">
          <div className="bg-white rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden">
            
            {/* Encabezado Institucional del Cuadro de Acceso */}
            <div className="p-6 sm:p-8 bg-gradient-to-b from-[#f8fafc] to-[#eef4f9] border-b border-[#dce5ee] text-center flex flex-col items-center">
              <div className="w-20 h-20 rounded-2xl bg-[#0f2d59] p-1.5 shadow-lg border border-white/40 flex items-center justify-center mb-3.5">
                <EscudoPJN className="w-full h-full object-contain" />
              </div>

              <h2 className="text-xs font-normal tracking-wider uppercase text-black">
                PODER JUDICIAL DE LA NACIÓN
              </h2>
              <p className="text-xs sm:text-[13px] font-extrabold text-[#0f2d59] uppercase tracking-tight mt-1 leading-snug">
                INTENDENCIA DE LA CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN
              </p>
              <div className="mt-2.5 inline-flex items-center space-x-1.5 px-3 py-1 rounded-full bg-[#0f2d59] text-white text-[10px] font-bold tracking-wide shadow-xs uppercase">
                <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                <span>Portal de Acceso y Gestión Operativa</span>
              </div>
            </div>

            {/* Formulario de Login */}
            <div className="p-6 sm:p-8 space-y-4">
              {loginError && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center space-x-2 animate-in fade-in">
                  <AlertTriangle className="w-4 h-4 text-red-600 flex-shrink-0" />
                  <span className="font-medium">{loginError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#0f2d59] mb-1">
                    Usuario Institucional
                  </label>
                  <div className="relative">
                    <Users className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Ej: admin.intendencia"
                      value={loginUser}
                      onChange={(e) => setLoginUser(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f2d59] focus:ring-2 focus:ring-[#0f2d59]/15 outline-none font-medium text-slate-800 bg-[#fbfcfe]"
                      autoFocus
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#0f2d59] mb-1">
                    Contraseña
                  </label>
                  <div className="relative">
                    <KeyRound className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 focus:border-[#0f2d59] focus:ring-2 focus:ring-[#0f2d59]/15 outline-none font-medium text-slate-800 bg-[#fbfcfe]"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-[#0f2d59] hover:bg-[#163e75] active:bg-[#0a1e3b] text-white font-bold text-xs shadow-md hover:shadow-lg transition-all flex items-center justify-center space-x-2 cursor-pointer mt-2"
                >
                  <Lock className="w-4 h-4 text-cyan-400" />
                  <span>Ingresar al Sistema</span>
                </button>
              </form>

              {/* ACCESO RÁPIDO PARA PRUEBAS (ADMINISTRADOR, ENCARGADO, TÉCNICO) */}
              <div className="pt-4 border-t border-slate-200 space-y-2">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 text-center block">
                  Accesos Directos por Perfil de Usuario
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => handleQuickLogin(usuariosSistema[0])}
                    className="p-2 rounded-xl bg-purple-50 hover:bg-purple-100 border border-purple-200 text-purple-900 text-center transition-all group"
                  >
                    <span className="block text-[11px] font-extrabold text-purple-800 group-hover:scale-105 transition-transform">
                      Administrador
                    </span>
                    <span className="text-[9px] text-purple-600 font-mono block">Intendencia</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin(usuariosSistema[1])}
                    className="p-2 rounded-xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 text-center transition-all group"
                  >
                    <span className="block text-[11px] font-extrabold text-sky-800 group-hover:scale-105 transition-transform">
                      Encargado
                    </span>
                    <span className="text-[9px] text-sky-600 font-mono block">Mantenimiento</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickLogin(usuariosSistema[2])}
                    className="p-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-emerald-900 text-center transition-all group"
                  >
                    <span className="block text-[11px] font-extrabold text-emerald-800 group-hover:scale-105 transition-transform">
                      Técnico
                    </span>
                    <span className="text-[9px] text-emerald-600 font-mono block">Operativo</span>
                  </button>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Pie de Página Institucional */}
        <footer className="w-full max-w-5xl mx-auto text-center pt-3 border-t border-white/10 text-[10.5px] text-sky-200/80">
          <p className="font-semibold text-white">
            Cámara Federal de Apelaciones de Tucumán &bull; Jurisdicción Federal Tucumán, Catamarca y Santiago del Estero
          </p>
          <p className="text-[9.5px] text-sky-300/60 mt-0.5">
            Marco normativo Ley N° 24.937 y Reglamentación del Consejo de la Magistratura de la Nación
          </p>
        </footer>

      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f7fa] text-[#1c2d42] font-sans">
      
      <div className="flex h-screen overflow-hidden">
        
        {/* Sidebar Institucional Fijo con Dos Grandes Grupos con transición suave y agradable */}
        <aside
          onMouseEnter={handleSidebarMouseEnter}
          onMouseLeave={handleSidebarMouseLeave}
          className={`${
          isSidebarCollapsed ? 'w-20' : 'w-72'
        } transition-[width] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex-shrink-0 h-screen sticky top-0 flex flex-col justify-between border-r border-[#d9e2ec] bg-[#ffffff] shadow-sm select-none print:hidden z-30 will-change-[width]`}
        >
          <div className="flex-1 flex flex-col min-h-0">
            {/* Membrete del Sidebar con el botón de 3 filas (hamburguesa) y logo oficial */}
            <div className={`border-b border-[#e5ecf3] bg-[#f8fafc] flex-shrink-0 relative transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
              isSidebarCollapsed ? 'p-3 flex flex-col items-center' : 'p-4 text-center'
            }`}>
              {/* Botón de 3 filas (hamburguesa) para replegar / abrir la barra lateral */}
              <div className={`w-full flex items-center transition-all duration-500 ${isSidebarCollapsed ? 'justify-center pb-2' : 'justify-between pb-3'}`}>
                <span className={`text-[10px] font-black uppercase tracking-wider text-[#3d7bb5] transition-all duration-400 overflow-hidden whitespace-nowrap ${
                  isSidebarCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[140px] opacity-100'
                }`}>
                  Menú Navegación
                </span>
                <button
                  type="button"
                  onClick={handleSidebarPinToggle}
                  aria-pressed={isSidebarPinned}
                  className="p-1.5 rounded-lg bg-white border border-[#cfdbe6] text-[#0f2d59] hover:bg-[#eaf1f7] hover:border-[#0f2d59] transition-all duration-300 shadow-xs cursor-pointer active:scale-95 group"
                  title={isSidebarPinned ? 'Liberar barra lateral automática' : 'Mantener barra lateral desplegada'}
                >
                  <Menu className={`w-4 h-4 stroke-[2.5] transition-transform duration-500 ${isSidebarCollapsed ? 'rotate-90 text-[#3d7bb5]' : 'group-hover:scale-110'}`} />
                </button>
              </div>

              {/* Contenedor del Logo / Escudo con transición fluida */}
              <div className="flex flex-col items-center justify-center w-full transition-all duration-500">
                <div 
                  className={`rounded-xl bg-[#0f2d59] flex items-center justify-center shadow-md overflow-hidden p-1 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${
                    isSidebarCollapsed 
                      ? 'w-12 h-12 cursor-pointer hover:scale-105 hover:shadow-lg ring-2 ring-[#0f2d59]/20' 
                      : 'w-16 h-16 mb-2'
                  }`}
                  onClick={() => isSidebarCollapsed && setIsSidebarCollapsed(false)}
                  title={isSidebarCollapsed ? "Poder Judicial de la Nación - Intendencia CFT (Clic para expandir)" : ""}
                >
                  <EscudoPJN className="w-full h-full object-contain rounded-lg transition-transform duration-500" />
                </div>
                
                <div className={`text-center w-full transition-all duration-400 ease-in-out overflow-hidden ${
                  isSidebarCollapsed ? 'max-h-0 opacity-0 pointer-events-none scale-95' : 'max-h-24 opacity-100 scale-100'
                }`}>
                  <h1 className="text-[11px] font-normal tracking-tight uppercase text-black leading-tight text-center">
                    PODER JUDICIAL DE LA NACIÓN
                  </h1>
                  <p className="text-[10px] font-bold text-[#0f2d59] mt-0.5 leading-snug uppercase tracking-tight text-center">
                    CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN
                  </p>
                  <p className="text-[9.5px] font-extrabold text-[#1c2d42] uppercase tracking-wider mt-0.5 text-center">
                    INTENDENCIA
                  </p>
                </div>
              </div>
            </div>

            {/* Menú General (Home) */}
            <div className={`pt-3 pb-2 transition-all duration-500 ${isSidebarCollapsed ? 'px-2.5' : 'px-3'}`}>
              <button 
                onClick={() => setActiveTab('home')}
                title="Menú General - Inicio"
                className={`w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                  isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2.5'
                } ${
                  activeTab === 'home'
                    ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                    : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                }`}
              >
                <div className="flex items-center space-x-3 overflow-hidden">
                  <FolderTree className="w-4 h-4 opacity-90 flex-shrink-0 transition-transform duration-300" />
                  <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                    isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[140px] opacity-100 translate-x-0'
                  }`}>
                    Menú General
                  </span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded font-bold transition-all duration-400 overflow-hidden whitespace-nowrap ${
                  isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[60px] opacity-100 scale-100'
                } ${
                  activeTab === 'home' ? 'bg-[#20457a] text-white' : 'bg-[#e2edf6] text-[#2c5382]'
                }`}>
                  Inicio
                </span>
              </button>
            </div>

            {/* Navegación dividida en Dos Grupos Grandes */}
            <nav className={`space-y-3 overflow-y-auto flex-1 pb-4 overflow-x-hidden transition-all duration-500 ${isSidebarCollapsed ? 'px-2.5' : 'px-3'}`}>
              
              {/* Grupo 1: Mantenimiento Edilicio */}
              <div className="space-y-1">
                <button
                  type="button"
                  onClick={() => !isSidebarCollapsed && setMantenimientoGroupOpen(!mantenimientoGroupOpen)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-slate-100 text-[10px] font-black uppercase tracking-wider text-[#3d7bb5] transition-all duration-300 select-none ${
                    isSidebarCollapsed ? 'justify-center opacity-60' : 'opacity-100'
                  }`}
                  title={isSidebarCollapsed ? "Mantenimiento Edilicio" : "Colapsar / Expandir grupo Mantenimiento Edilicio"}
                >
                  <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    isSidebarCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[180px] opacity-100'
                  }`}>
                    Mantenimiento Edilicio
                  </span>
                  {!isSidebarCollapsed && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-[#3d7bb5] ${mantenimientoGroupOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>
                
                {(mantenimientoGroupOpen || isSidebarCollapsed) && (
                  <div className="space-y-1 pt-0.5 animate-in fade-in duration-300">
                    {/* Órdenes de Trabajo con Submenús */}
                    <div className="space-y-1">
                      <button 
                        onClick={() => {
                          if (isSidebarCollapsed) {
                            setActiveTab('ordenes');
                            setOrdenesViewMode('list');
                          } else {
                            setOrdenesSubOpen(!ordenesSubOpen);
                          }
                        }}
                        title="Órdenes de Trabajo"
                        className={`w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                          isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                        } ${
                          activeTab === 'ordenes'
                            ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                            : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                        }`}
                      >
                        <div className="flex items-center text-left space-x-3 overflow-hidden">
                          <ClipboardList className="w-4 h-4 opacity-90 flex-shrink-0" />
                          <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                            isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[150px] opacity-100 translate-x-0'
                          }`}>
                            Órdenes de Trabajo
                          </span>
                        </div>
                        <div className={`flex items-center space-x-1.5 transition-all duration-400 overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[80px] opacity-100 scale-100'
                        }`}>
                          <span className={`text-[10.5px] px-1.5 py-0.2 rounded-full font-bold ${
                            activeTab === 'ordenes' ? 'bg-[#20457a] text-white' : 'bg-[#e2edf6] text-[#2c5382]'
                          }`}>
                            {orders.length}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 transition-transform duration-300 ${ordenesSubOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {/* Submenús de Órdenes de Trabajo (solo cuando está expandido) */}
                      {!isSidebarCollapsed && ordenesSubOpen && (
                        <div className="pl-6 space-y-1 pt-0.5 animate-in fade-in duration-200">
                          <button
                            onClick={() => {
                              setActiveTab('ordenes');
                              setOrdenesViewMode('resumen');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              activeTab === 'ordenes' && ordenesViewMode === 'resumen'
                                ? 'bg-[#20457a] text-white font-bold'
                                : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                            }`}
                          >
                            <span>Resumen de Órdenes</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveTab('ordenes');
                              setOrdenesViewMode('list');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              activeTab === 'ordenes' && ordenesViewMode === 'list'
                                ? 'bg-[#20457a] text-white font-bold'
                                : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                            }`}
                          >
                            <span>Gestión y Listado de OT</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* NUEVO APARTADO: Sistemas de Bombas */}
                    <div className="space-y-1 pt-0.5">
                      <button 
                        onClick={() => {
                          if (isSidebarCollapsed) {
                            setActiveTab('bombas');
                            setBombasViewMode('tablero');
                          } else {
                            setBombasSubOpen(!bombasSubOpen);
                            setActiveTab('bombas');
                          }
                        }}
                        title="Sistemas de Bombas"
                        className={`w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                          isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                        } ${
                          activeTab === 'bombas'
                            ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                            : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                        }`}
                      >
                        <div className="flex items-center text-left space-x-3 overflow-hidden">
                          <Droplets className="w-4 h-4 opacity-90 flex-shrink-0 text-cyan-400" />
                          <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                            isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[150px] opacity-100 translate-x-0'
                          }`}>
                            Sistemas de Bombas
                          </span>
                        </div>
                        <div className={`flex items-center space-x-1.5 transition-all duration-400 overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[80px] opacity-100 scale-100'
                        }`}>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                            activeTab === 'bombas' ? 'bg-[#20457a] text-white' : 'bg-[#e0f2fe] text-[#0369a1]'
                          }`}>
                            {bombasData.length}
                          </span>
                          <ChevronDown className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 transition-transform duration-300 ${bombasSubOpen ? 'rotate-180' : ''}`} />
                        </div>
                      </button>

                      {/* Submenús de Sistemas de Bombas */}
                      {!isSidebarCollapsed && bombasSubOpen && (
                        <div className="pl-6 space-y-1 pt-0.5 animate-in fade-in duration-200">
                          <button
                            onClick={() => {
                              setActiveTab('bombas');
                              setBombasViewMode('tablero');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              activeTab === 'bombas' && bombasViewMode === 'tablero'
                                ? 'bg-[#20457a] text-white font-bold'
                                : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                            }`}
                          >
                            <span>Monitoreo de Cuadros de Bombas</span>
                          </button>

                          <button
                            onClick={() => {
                              setActiveTab('bombas');
                              setBombasViewMode('equipos');
                            }}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              activeTab === 'bombas' && bombasViewMode === 'equipos'
                                ? 'bg-[#20457a] text-white font-bold'
                                : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                            }`}
                          >
                            <span>Equipo de Bombas</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Planificación de Inspecciones Edilicias */}
                    <div className="space-y-1 pt-0.5">
                      <button 
                        onClick={() => {
                          if (isSidebarCollapsed) {
                            handleOpenAnnualPlanner();
                          } else {
                            setPlanificacionSubOpen(!planificacionSubOpen);
                          }
                        }}
                        title="Planificación de Inspecciones Edilicias"
                        className={`w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                          isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                        } ${
                          activeTab === 'planificacion' || activeTab === 'fichas'
                            ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                            : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                        }`}
                      >
                        <div className="flex items-center text-left space-x-3 overflow-hidden">
                          <Calendar className="w-4 h-4 opacity-90 flex-shrink-0" />
                          <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                            isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[170px] opacity-100 translate-x-0'
                          }`}>
                            Planificación Inspecciones
                          </span>
                        </div>
                        {!isSidebarCollapsed && (
                          <ChevronDown className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 ml-1 transition-transform duration-300 ${planificacionSubOpen ? 'rotate-180' : ''}`} />
                        )}
                      </button>

                      {/* Submenú Fichas Edilicias */}
                      {!isSidebarCollapsed && planificacionSubOpen && (
                        <div className="pl-6 space-y-1 pt-1 animate-in fade-in duration-200">
                          <button
                            onClick={handleOpenAnnualPlanner}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              activeTab === 'planificacion' ? 'bg-[#20457a] text-white font-bold' : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                            }`}
                          >
                            <span>Cronograma / Gantt</span>
                          </button>

                          <button
                            onClick={() => setActiveTab('fichas')}
                            className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                              activeTab === 'fichas' ? 'bg-[#20457a] text-white font-bold' : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                            }`}
                          >
                            <span>Catálogo de Fichas (1-22)</span>
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Grupo 2: Finanzas e Inventario */}
              <div className="space-y-1 pt-1 border-t border-[#eaf0f6]">
                <button
                  type="button"
                  onClick={() => !isSidebarCollapsed && setFinanzasGroupOpen(!finanzasGroupOpen)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-slate-100 text-[10px] font-black uppercase tracking-wider text-[#3d7bb5] transition-all duration-300 select-none ${
                    isSidebarCollapsed ? 'justify-center opacity-60' : 'opacity-100'
                  }`}
                  title={isSidebarCollapsed ? "Finanzas e Inventario" : "Colapsar / Expandir grupo Finanzas e Inventario"}
                >
                  <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    isSidebarCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[180px] opacity-100'
                  }`}>
                    Finanzas e Inventario
                  </span>
                  {!isSidebarCollapsed && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-[#3d7bb5] ${finanzasGroupOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {(finanzasGroupOpen || isSidebarCollapsed) && (
                  <div className="flex flex-col space-y-1 pt-0.5 animate-in fade-in duration-300">
                    <button
                      onClick={() => {
                        setActiveTab('finanzas');
                        setFinanzasViewMode('ingresos-egresos');
                      }}
                      title="Finanzas: Ingresos y Egresos"
                      className={`order-1 w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                        isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'ingresos-egresos'
                          ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                          : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                      }`}
                    >
                      <div className="flex items-center text-left space-x-3 overflow-hidden">
                        <DollarSign className="w-4 h-4 opacity-90 flex-shrink-0 text-emerald-500" />
                        <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[150px] opacity-100 translate-x-0'
                        }`}>
                          Ingresos y Egresos
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-all duration-400 overflow-hidden ${
                        isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[40px] opacity-100 scale-100'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'ingresos-egresos'
                          ? 'bg-[#20457a] text-white'
                          : 'bg-[#e0f2fe] text-[#0369a1]'
                      }`}>
                        {finanzasData.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('finanzas');
                        setFinanzasViewMode('inventario');
                      }}
                      title="Inventario"
                      className={`order-3 w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                        isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'inventario'
                          ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                          : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                      }`}
                    >
                      <div className="flex items-center text-left space-x-3 overflow-hidden">
                        <Boxes className="w-4 h-4 opacity-90 flex-shrink-0 text-cyan-500" />
                        <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[150px] opacity-100 translate-x-0'
                        }`}>
                          Inventario
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-all duration-400 overflow-hidden ${
                        isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[40px] opacity-100 scale-100'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'inventario'
                          ? 'bg-[#20457a] text-white'
                          : 'bg-[#e0f2fe] text-[#0369a1]'
                      }`}>
                        {inventarioData.length}
                      </span>
                    </button>

                    <button
                      onClick={() => {
                        setActiveTab('finanzas');
                        setFinanzasViewMode('facturacion-servicios');
                      }}
                      title="Facturación de servicios contratados"
                      className={`order-2 w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                        isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'facturacion-servicios'
                          ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                          : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                      }`}
                    >
                      <div className="flex items-center text-left space-x-3 overflow-hidden">
                        <FileCheck className="w-4 h-4 opacity-90 flex-shrink-0 text-emerald-600" />
                        <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[190px] opacity-100 translate-x-0'
                        }`}>
                          Facturación de Servicios Contratados
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-all duration-400 overflow-hidden ${
                        isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[40px] opacity-100 scale-100'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'facturacion-servicios'
                          ? 'bg-[#20457a] text-white'
                          : 'bg-[#dcfce7] text-[#166534]'
                      }`}>
                        {facturasServicios.length}
                      </span>
                    </button>

                    {/* NUEVO SUBMENÚ: PROVEEDORES */}
                    <button
                      onClick={() => {
                        setActiveTab('finanzas');
                        setFinanzasViewMode('proveedores');
                      }}
                      title="Listado y Gestión de Proveedores"
                      className={`order-4 w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                        isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'proveedores'
                          ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                          : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                      }`}
                    >
                      <div className="flex items-center text-left space-x-3 overflow-hidden">
                        <Truck className="w-4 h-4 opacity-90 flex-shrink-0 text-blue-500" />
                        <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[150px] opacity-100 translate-x-0'
                        }`}>
                          Proveedores
                        </span>
                      </div>
                      <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold transition-all duration-400 overflow-hidden ${
                        isSidebarCollapsed ? 'max-w-0 opacity-0 scale-75 pointer-events-none' : 'max-w-[40px] opacity-100 scale-100'
                      } ${
                        activeTab === 'finanzas' && finanzasViewMode === 'proveedores'
                          ? 'bg-[#20457a] text-white'
                          : 'bg-[#e0f2fe] text-[#0369a1]'
                      }`}>
                        {proveedoresData.length}
                      </span>
                    </button>
                  </div>
                )}
              </div>

              {/* Grupo 3: Expedientes Administrativos */}
              <div className="space-y-1 pt-1 border-t border-[#eaf0f6]">
                <button
                  type="button"
                  onClick={() => !isSidebarCollapsed && setExpedientesGroupOpen(!expedientesGroupOpen)}
                  className={`w-full flex items-center justify-between px-3 py-1.5 rounded-md hover:bg-slate-100 text-[10px] font-black uppercase tracking-wider text-[#3d7bb5] transition-all duration-300 select-none ${
                    isSidebarCollapsed ? 'justify-center opacity-60' : 'opacity-100'
                  }`}
                  title={isSidebarCollapsed ? "Expedientes Administrativos" : "Colapsar / Expandir grupo Expedientes Administrativos"}
                >
                  <span className={`transition-all duration-300 overflow-hidden whitespace-nowrap ${
                    isSidebarCollapsed ? 'max-w-0 opacity-0 pointer-events-none' : 'max-w-[180px] opacity-100'
                  }`}>
                    Expedientes
                  </span>
                  {!isSidebarCollapsed && (
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-300 text-[#3d7bb5] ${expedientesGroupOpen ? 'rotate-180' : ''}`} />
                  )}
                </button>

                {(expedientesGroupOpen || isSidebarCollapsed) && (
                  <div className="space-y-1 pt-0.5 animate-in fade-in duration-300">
                    <button 
                      onClick={() => {
                        if (isSidebarCollapsed) {
                          setActiveTab('expedientes');
                          setExpedientesTab('administrativos');
                        } else {
                          setExpedientesSubOpen(!expedientesSubOpen);
                        }
                      }}
                      title="Expedientes Administrativos"
                      className={`w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                        isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2'
                      } ${
                        activeTab === 'expedientes'
                          ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                          : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                      }`}
                    >
                      <div className="flex items-center space-x-3 overflow-hidden">
                        <FileText className="w-4 h-4 opacity-90 flex-shrink-0" />
                        <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                          isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[150px] opacity-100 translate-x-0'
                        }`}>
                          Expedientes
                        </span>
                      </div>
                      {!isSidebarCollapsed && (
                        <ChevronDown className={`w-3.5 h-3.5 opacity-60 flex-shrink-0 transition-transform duration-300 ${expedientesSubOpen ? 'rotate-180' : ''}`} />
                      )}
                    </button>

                    {/* Submenús de Expedientes */}
                    {!isSidebarCollapsed && expedientesSubOpen && (
                      <div className="pl-6 space-y-1 pt-0.5 animate-in fade-in duration-200">
                        <button
                          onClick={() => {
                            setActiveTab('expedientes');
                            setExpedientesTab('administrativos');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            activeTab === 'expedientes' && expedientesTab === 'administrativos'
                              ? 'bg-[#20457a] text-white font-bold'
                              : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                          }`}
                        >
                          <span className="truncate">Expedientes Administrativos</span>
                        </button>

                        <button
                          onClick={() => {
                            setActiveTab('expedientes');
                            setExpedientesTab('en-curso');
                          }}
                          className={`w-full flex items-center justify-between px-3 py-1.5 rounded-lg text-[11px] font-medium transition-colors ${
                            activeTab === 'expedientes' && expedientesTab === 'en-curso'
                              ? 'bg-[#20457a] text-white font-bold'
                              : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
                          }`}
                        >
                          <span className="truncate">Expedientes en Curso</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

            </nav>
          </div>

          {/* Menú de Configuración situado sobre el pie de página */}
          <div className={`border-t border-[#e5ecf3] bg-[#ffffff] flex-shrink-0 transition-all duration-500 ${isSidebarCollapsed ? 'px-2.5 py-2' : 'px-3 py-3'}`}>
            <button
              onClick={() => {
                setActiveTab('configuracion');
                setConfigSection('root');
                setConfigSubSection('menu');
              }}
              title="Configuración del Sistema"
              className={`w-full flex items-center rounded-xl font-medium text-xs tracking-wide transition-all duration-300 ${
                isSidebarCollapsed ? 'justify-center p-3' : 'justify-between px-4 py-2.5'
              } ${
                activeTab === 'configuracion'
                  ? 'bg-[#0f2d59] text-white shadow-sm font-semibold'
                  : 'text-[#384c63] hover:text-[#0f2d59] hover:bg-[#eaf1f7]'
              }`}
            >
              <div className="flex items-center space-x-3 overflow-hidden">
                <Settings className={`w-4 h-4 flex-shrink-0 transition-transform duration-300 ${activeTab === 'configuracion' ? 'text-white' : 'text-[#3d7bb5]'}`} />
                <span className={`transition-all duration-400 whitespace-nowrap overflow-hidden ${
                  isSidebarCollapsed ? 'max-w-0 opacity-0 -translate-x-2' : 'max-w-[140px] opacity-100 translate-x-0'
                }`}>
                  Configuración
                </span>
              </div>
              {!isSidebarCollapsed && <ChevronRight className="w-3.5 h-3.5 opacity-60 flex-shrink-0" />}
            </button>
          </div>

          {/* Pie del Sidebar con animación suave */}
          <div className={`border-t border-[#e5ecf3] bg-[#f8fafc] text-center flex-shrink-0 transition-all duration-500 ease-in-out ${
            isSidebarCollapsed ? 'p-3' : 'p-4'
          }`}>
            <div className={`flex items-center transition-all duration-500 ${isSidebarCollapsed ? 'justify-center' : 'justify-center space-x-1.5'}`}>
              <ShieldCheck className="w-4 h-4 text-[#3d7bb5] flex-shrink-0 transition-transform duration-300 hover:scale-110" />
              <span className={`text-[9.5px] font-bold text-[#0f2d59] text-center uppercase tracking-wide transition-all duration-400 overflow-hidden whitespace-nowrap ${
                isSidebarCollapsed ? 'max-w-[40px] opacity-100' : 'max-w-[220px] opacity-100'
              }`}>
                {isSidebarCollapsed ? 'SMEIK' : 'SISTEMA DE MANTENIMIENTO EDILICIO INTEGRAL'}
              </span>
            </div>
            <p className={`text-[10px] font-black text-[#6b8299] uppercase tracking-wider mt-0.5 transition-all duration-400 overflow-hidden whitespace-nowrap ${
              isSidebarCollapsed ? 'max-w-0 max-h-0 opacity-0 pointer-events-none' : 'max-w-[200px] max-h-6 opacity-100'
            }`}>
              SMEIK
            </p>
          </div>
        </aside>

        {/* Área Principal de Contenido */}
        <main className="flex-1 flex flex-col h-screen overflow-y-auto print:hidden">
          
          {/* Barra Superior Institucional con Botón Hamburguesa Rápido, Sesión y Salida */}
          <header className="px-6 py-4 border-b border-[#dce5ee] bg-white flex flex-col xl:flex-row xl:items-center justify-between gap-4">
            <div className="flex items-center space-x-3">
              {/* Botón rápido de 3 filas en la cabecera cuando está replegado */}
              {isSidebarCollapsed && (
                <button
                  type="button"
                  onClick={() => setIsSidebarCollapsed(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-[#0f2d59] text-[#0f2d59] hover:text-white transition-all shadow-xs cursor-pointer flex-shrink-0"
                  title="Abrir barra lateral de navegación"
                >
                  <Menu className="w-4 h-4 stroke-[2.5]" />
                </button>
              )}

              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#3d7bb5]">Portal Institucional CFT</span>
                  <span className="text-[#a0b3c6]">/</span>
                  <h2 className="text-base font-bold text-[#0f2d59]">
                    {activeTab === 'home' && 'Menú General — Resumen Ejecutivo y Estadísticas'}
                    {activeTab === 'ordenes' && (ordenesViewMode === 'resumen' ? 'Órdenes de Trabajo — Resumen General' : 'Órdenes de Trabajo — Gestión y Listado')}
                    {activeTab === 'bombas' && (bombasViewMode === 'tablero' ? 'Sistemas de Bombas — Monitoreo de Cuadros de Bombas' : 'Sistemas de Bombas — Equipo de Bombas')}
                    {activeTab === 'finanzas' && (
                      finanzasViewMode === 'ingresos-egresos' ? 'Finanzas e Inventario — Ingresos y Egresos' :
                      finanzasViewMode === 'inventario' ? 'Finanzas — Inventario' :
                      finanzasViewMode === 'facturacion-servicios' ? 'Finanzas — Facturación de Servicios Contratados' :
                      'Finanzas e Inventario — Padrón y Gestión de Proveedores'
                    )}
                    {activeTab === 'planificacion' && 'Planificación de Inspecciones Edilicias'}
                    {activeTab === 'fichas' && 'Catálogo de Fichas Técnicas de Inspección'}
                    {activeTab === 'expedientes' && (expedientesTab === 'administrativos' ? 'Gestión de Expedientes Administrativos' : 'Gestión de Expedientes en Curso')}
                    {activeTab === 'configuracion' && 'Configuración del Sistema'}
                  </h2>
                </div>
                <p className="text-xs text-[#526a84] mt-0.5">
                  {activeTab === 'home'
                    ? 'Panel principal con comparativas analíticas de órdenes de trabajo y agenda de inspecciones del mes en curso.'
                    : activeTab === 'bombas'
                    ? 'Control electromecánico de bombas de elevación de agua potable, bombas pluviales de subsuelo y evacuación cloacal.'
                    : activeTab === 'finanzas'
                    ? 'Control presupuestario, fondos de intendencia, partidas y existencias de pañol de mantenimiento.'
                    : activeTab === 'configuracion'
                    ? 'Administración de parámetros y listados desplegables.'
                    : 'Sistema de Mantenimiento Edilicio y Gestión Operativa.'}
                </p>
              </div>
            </div>

            {/* SECCIÓN DE USUARIO ACTIVO Y BOTONES SUPERIORES */}
            <div className="flex items-center space-x-3">
              {currentUserSession && (
                <div className="flex items-center space-x-2.5 bg-[#f0f6fa] border border-[#cfe0ee] px-3 py-1.5 rounded-xl">
                  <div className="w-8 h-8 rounded-lg bg-[#0f2d59] text-white flex items-center justify-center font-bold text-xs flex-shrink-0">
                    {currentUserSession.nombre.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="text-left hidden sm:block">
                    <span className="font-bold text-xs text-[#0f2d59] block leading-tight truncate max-w-[150px]">
                      {currentUserSession.nombre}
                    </span>
                    <span className={`text-[9.5px] font-black uppercase tracking-wider px-1.5 py-0.2 rounded inline-block ${
                      currentUserSession.rol === 'Administrador' ? 'bg-purple-100 text-purple-800' :
                      currentUserSession.rol === 'Encargado' ? 'bg-sky-100 text-sky-800' :
                      'bg-emerald-100 text-emerald-800'
                    }`}>
                      {currentUserSession.rol}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="p-1.5 rounded-lg text-slate-500 hover:text-red-600 hover:bg-white transition-colors"
                    title="Cerrar Sesión del Portal"
                  >
                    <LogOut className="w-4 h-4" />
                  </button>
                </div>
              )}

              {activeTab === 'ordenes' && ordenesViewMode === 'list' && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={handleOpenNewOrder}
                    className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg font-semibold text-xs text-white bg-[#0f2d59] hover:bg-[#153e77] shadow-sm transition-all active:scale-98"
                  >
                    <Plus className="w-4 h-4 stroke-[2.5]" />
                    <span>Crear Nueva OT</span>
                  </button>
                </div>
              )}

              {activeTab === 'bombas' && (
                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => handlePrintDocument('cuadros_bombas')}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] shadow-2xs transition-colors"
                    title="Imprimir informe con el estado de todos los cuadros de bombas"
                  >
                    <Printer className="w-3.5 h-3.5 text-[#3d7bb5]" />
                    <span>Imprimir Estado de Cuadros</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePrintDocument('equipos_bombas_costos')}
                    className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-bold bg-[#0f2d59] hover:bg-[#163e75] text-white shadow-xs transition-colors"
                    title="Imprimir informe completo de equipos detallando cada mantenimiento y su costo"
                  >
                    <Printer className="w-3.5 h-3.5" />
                    <span>Imprimir Equipos y Costos</span>
                  </button>
                </div>
              )}
            </div>
          </header>

          {/* Vistas Dinámicas */}
          <div className="p-6 flex-1 space-y-6">
            
            {/* VISTA 0: MENÚ GENERAL (HOME) */}
            {activeTab === 'home' && (() => {
              // Cálculos estadísticos para gráficos y resúmenes comparativos
              const totalOT = orders.length;
              const termOT = orders.filter(o => o.estadoEjecucion === 'Finalizada').length;
              const penOT = orders.filter(o => o.estadoEjecucion === 'Pendiente').length;
              const sinAsignarOT = orders.filter(o => o.estadoEjecucion === 'Sin Asignar').length;

              // Distribución por Dependencia
              const depMap = {};
              orders.forEach(o => {
                const d = o.dependencia || 'Sin Especificar';
                depMap[d] = (depMap[d] || 0) + 1;
              });

              // Distribución por Rubro
              const rubMap = {};
              orders.forEach(o => {
                const r = o.rubroFinal || o.rubro || 'General';
                rubMap[r] = (rubMap[r] || 0) + 1;
              });

              // Distribución por Piso / Sector
              const pisoMap = {};
              orders.forEach(o => {
                const p = o.sector || 'Sin Especificar';
                pisoMap[p] = (pisoMap[p] || 0) + 1;
              });

              // Inspecciones agendadas y realizadas para el mes en curso
              const currentMonthObj = monthlyStats[currentSystemMonth] || monthlyStats[0];
              const totalMonthInspections = currentMonthObj.sheets.length;
              const doneMonthInspections = currentMonthObj.finalizadas;

              // Insumos críticos
              const lowStockItems = inventarioData.filter(art => art.stockActual <= art.stockMinimo);

              return (
                <div className="space-y-6">
                  
                  {/* TRES BOTONES DESTACADOS: DATOS IMPORTANTES DE EDIFICIOS, NÚMEROS DE CONTACTO Y DOCUMENTOS IMPORTANTES */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEdificioDetail(null);
                        setIsEdificiosModalOpen(true);
                      }}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#0f2d59] to-[#1a3d6d] text-white shadow-md hover:shadow-lg transition-all text-left flex items-center justify-between group border border-[#2b5288] active:scale-[0.99]"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-white/20">
                          <Building2 className="w-6 h-6 text-cyan-300" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-sky-200 uppercase tracking-widest block">
                            Infraestructura Edilicia
                          </span>
                          <span className="text-sm font-extrabold block leading-tight text-white mt-0.5">
                            Datos Importantes de Edificios
                          </span>
                          <span className="text-[11px] text-slate-200/80 block mt-0.5">
                            Ubicaciones, cortes de servicios y fichas técnicas
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-sky-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsContactosModalOpen(true)}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#0b4d38] to-[#126b4f] text-white shadow-md hover:shadow-lg transition-all text-left flex items-center justify-between group border border-[#1d8a67] active:scale-[0.99]"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-white/20">
                          <PhoneCall className="w-6 h-6 text-emerald-300" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-emerald-200 uppercase tracking-widest block">
                            Directorio y Emergencias
                          </span>
                          <span className="text-sm font-extrabold block leading-tight text-white mt-0.5">
                            Números de Contacto
                          </span>
                          <span className="text-[11px] text-emerald-100/80 block mt-0.5">
                            Guardias técnicas, intendencias y servicios
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-emerald-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsDocumentosModalOpen(true)}
                      className="p-4 rounded-2xl bg-gradient-to-br from-[#6b21a8] to-[#86198f] text-white shadow-md hover:shadow-lg transition-all text-left flex items-center justify-between group border border-[#a21caf] active:scale-[0.99]"
                    >
                      <div className="flex items-center space-x-3.5">
                        <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform border border-white/20">
                          <BookOpen className="w-6 h-6 text-fuchsia-300" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-fuchsia-200 uppercase tracking-widest block">
                            Biblioteca Institucional
                          </span>
                          <span className="text-sm font-extrabold block leading-tight text-white mt-0.5">
                            Documentos Importantes
                          </span>
                          <span className="text-[11px] text-fuchsia-100/80 block mt-0.5">
                            Normativa, protocolos de evacuación y manuales
                          </span>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-fuchsia-300 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </button>
                  </div>

                  {/* NUEVO: PANEL DE ACCESOS DIRECTOS A CADA SUBMENÚ ORGANIZADO POR SU MENÚ CORRESPONDIENTE */}
                  <div className="bg-white p-5 rounded-2xl border border-[#d9e3ec] shadow-sm space-y-5">
                    <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white">
                          <FolderTree className="w-4 h-4 text-cyan-400" />
                        </div>
                        <div>
                          <h3 className="font-bold text-sm text-[#0f2d59]">Navegación Rápida por Módulos y Submenús</h3>
                          <p className="text-xs text-[#526a84]">
                            Acceda directamente a cada área operativa clasificada por su menú correspondiente
                          </p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-[#3d7bb5] bg-[#eef4f9] px-2.5 py-1 rounded-md border border-[#cfe0ee] hidden sm:inline-block">
                        Acceso Rápido CFAT
                      </span>
                    </div>

                    <div className="space-y-5">
                      
                      {/* GRUPO A: MANTENIMIENTO EDILICIO */}
                      <div className="space-y-2.5">
                        <button
                          type="button"
                          aria-expanded={homeMaintenanceOpen}
                          aria-controls="home-maintenance-links"
                          onClick={() => setHomeMaintenanceOpen(open => !open)}
                          className="w-full flex items-center justify-between gap-3 text-left"
                        >
                          <span className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0f2d59]"></span>
                            <span className="font-black text-xs uppercase tracking-wider text-[#0f2d59]">Mantenimiento Edilicio</span>
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">
                              (Órdenes de Trabajo, Sistemas de Bombas e Inspecciones)
                            </span>
                          </span>
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform ${homeMaintenanceOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div id="home-maintenance-links" className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5 ${homeMaintenanceOpen ? '' : 'hidden'}`}>
                          {/* 1. Resumen de Órdenes */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('ordenes');
                              setOrdenesViewMode('resumen');
                              setMantenimientoGroupOpen(true);
                              setOrdenesSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-slate-200 hover:border-[#0f2d59] bg-[#fbfcfe] hover:bg-[#f0f6fa] text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-[#eef4f9] group-hover:bg-[#0f2d59] text-[#0f2d59] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <BarChart3 className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f2d59] block leading-tight">
                                  Resumen de Órdenes
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Tablero e indicadores estadísticos
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f2d59] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 2. Gestión y Listado de OT */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('ordenes');
                              setOrdenesViewMode('list');
                              setMantenimientoGroupOpen(true);
                              setOrdenesSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-slate-200 hover:border-[#0f2d59] bg-[#fbfcfe] hover:bg-[#f0f6fa] text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-[#eef4f9] group-hover:bg-[#0f2d59] text-[#0f2d59] group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <ClipboardList className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-[#0f2d59] block leading-tight">
                                  Gestión y Listado de OT
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Creación, seguimiento e impresión
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0f2d59] group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 3. Monitoreo de Cuadros de Bombas */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('bombas');
                              setBombasViewMode('tablero');
                              setMantenimientoGroupOpen(true);
                              setBombasSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-slate-200 hover:border-cyan-600 bg-[#fbfcfe] hover:bg-cyan-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan-50 group-hover:bg-cyan-600 text-cyan-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Gauge className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-800 block leading-tight">
                                  Monitoreo de Cuadros de Bombas
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Alternancia y salas de bombeo
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 4. Equipo de Bombas y Costos */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('bombas');
                              setBombasViewMode('equipos');
                              setMantenimientoGroupOpen(true);
                              setBombasSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-slate-200 hover:border-cyan-600 bg-[#fbfcfe] hover:bg-cyan-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan-50 group-hover:bg-cyan-600 text-cyan-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Droplets className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-800 block leading-tight">
                                  Equipo de Bombas
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Fichas técnicas y costos de reparación
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 5. Cronograma Gantt de Inspecciones */}
                          <button
                            type="button"
                            onClick={() => {
                              handleOpenAnnualPlanner();
                              setMantenimientoGroupOpen(true);
                              setPlanificacionSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-slate-200 hover:border-sky-600 bg-[#fbfcfe] hover:bg-sky-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-sky-50 group-hover:bg-sky-600 text-sky-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Calendar className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-800 block leading-tight">
                                  Cronograma / Gantt
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Planificación de 48 semanas en A3
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 6. Catálogo de Fichas (1-22) */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('fichas');
                              setMantenimientoGroupOpen(true);
                              setPlanificacionSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-slate-200 hover:border-sky-600 bg-[#fbfcfe] hover:bg-sky-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-sky-50 group-hover:bg-sky-600 text-sky-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Layers className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-sky-800 block leading-tight">
                                  Catálogo de Fichas (1-22)
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Envolventes, críticas y servicios
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-sky-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>
                        </div>
                      </div>

                      {/* GRUPO B: FINANZAS E INVENTARIO */}
                      <div className="space-y-2.5 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          aria-expanded={homeFinancesOpen}
                          aria-controls="home-finances-links"
                          onClick={() => setHomeFinancesOpen(open => !open)}
                          className="w-full flex items-center justify-between gap-3 text-left"
                        >
                          <span className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                            <span className="font-black text-xs uppercase tracking-wider text-emerald-800">Finanzas e Inventario</span>
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">
                              (Ingresos, Egresos, Facturación, Inventario y Proveedores)
                            </span>
                          </span>
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform ${homeFinancesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div id="home-finances-links" className={`grid grid-cols-1 sm:grid-cols-3 gap-2.5 ${homeFinancesOpen ? '' : 'hidden'}`}>
                          {/* 1. Ingresos y Egresos */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('finanzas');
                              setFinanzasViewMode('ingresos-egresos');
                              setFinanzasGroupOpen(true);
                            }}
                            className="order-1 p-3 rounded-xl border border-emerald-200/80 hover:border-emerald-600 bg-[#fbfcfe] hover:bg-emerald-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 group-hover:bg-emerald-700 text-emerald-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <DollarSign className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 block leading-tight">
                                  Ingresos y Egresos
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Partidas presupuestarias, facturas y saldos
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 3. Inventario */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('finanzas');
                              setFinanzasViewMode('inventario');
                              setFinanzasGroupOpen(true);
                            }}
                            className="order-3 p-3 rounded-xl border border-cyan-200/80 hover:border-cyan-600 bg-[#fbfcfe] hover:bg-cyan-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-cyan-100 group-hover:bg-cyan-700 text-cyan-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Boxes className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-cyan-800 block leading-tight">
                                  Inventario
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Catalogación, control de stock y reposición
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-cyan-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 2. Facturación de Servicios Contratados */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('finanzas');
                              setFinanzasViewMode('facturacion-servicios');
                              setFinanzasGroupOpen(true);
                            }}
                            className="order-2 p-3 rounded-xl border border-emerald-200/80 hover:border-emerald-600 bg-[#fbfcfe] hover:bg-emerald-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-emerald-100 group-hover:bg-emerald-700 text-emerald-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <FileCheck className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-800 block leading-tight">
                                  Facturación de Servicios Contratados
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Facturas, contratos e historial por proveedor
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-emerald-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 4. Proveedores */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('finanzas');
                              setFinanzasViewMode('proveedores');
                              setFinanzasGroupOpen(true);
                            }}
                            className="order-4 p-3 rounded-xl border border-blue-200/80 hover:border-blue-600 bg-[#fbfcfe] hover:bg-blue-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-blue-100 group-hover:bg-blue-700 text-blue-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Truck className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-blue-800 block leading-tight">
                                  Proveedores
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Climatización, ascensores, plagas e insumos
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>
                        </div>
                      </div>

                      {/* GRUPO C: EXPEDIENTES ADMINISTRATIVOS */}
                      <div className="space-y-2.5 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          aria-expanded={homeCasesOpen}
                          aria-controls="home-cases-links"
                          onClick={() => setHomeCasesOpen(open => !open)}
                          className="w-full flex items-center justify-between gap-3 text-left"
                        >
                          <span className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                            <span className="font-black text-xs uppercase tracking-wider text-indigo-900">Expedientes Administrativos</span>
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">
                              (Tramitaciones, Actuaciones y Estados)
                            </span>
                          </span>
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform ${homeCasesOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div id="home-cases-links" className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 ${homeCasesOpen ? '' : 'hidden'}`}>
                          {/* 1. Gestión de Expedientes Administrativos */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('expedientes');
                              setExpedientesTab('administrativos');
                              setExpedientesGroupOpen(true);
                              setExpedientesSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-indigo-200/80 hover:border-indigo-600 bg-[#fbfcfe] hover:bg-indigo-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-700 text-indigo-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-900 block leading-tight">
                                  Expedientes Administrativos
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Registro oficial de resoluciones y notas
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 2. Gestión de Expedientes en Curso */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('expedientes');
                              setExpedientesTab('en-curso');
                              setExpedientesGroupOpen(true);
                              setExpedientesSubOpen(true);
                            }}
                            className="p-3 rounded-xl border border-indigo-200/80 hover:border-indigo-600 bg-[#fbfcfe] hover:bg-indigo-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-indigo-100 group-hover:bg-indigo-700 text-indigo-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Activity className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-indigo-900 block leading-tight">
                                  Expedientes en Curso
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Seguimiento de plazos y trámites activos
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-indigo-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>
                        </div>
                      </div>

                      {/* GRUPO D: CONFIGURACIÓN DEL SISTEMA */}
                      <div className="space-y-2.5 pt-1 border-t border-slate-100">
                        <button
                          type="button"
                          aria-expanded={homeSettingsOpen}
                          aria-controls="home-settings-links"
                          onClick={() => setHomeSettingsOpen(open => !open)}
                          className="w-full flex items-center justify-between gap-3 text-left"
                        >
                          <span className="flex min-w-0 flex-wrap items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-purple-600"></span>
                            <span className="font-black text-xs uppercase tracking-wider text-purple-900">Configuración</span>
                            <span className="text-[10px] text-slate-400 font-semibold font-mono">
                              (Usuarios y Parámetros Operativos)
                            </span>
                          </span>
                          <ChevronDown className={`w-4 h-4 flex-shrink-0 text-slate-500 transition-transform ${homeSettingsOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <div id="home-settings-links" className={`grid grid-cols-1 sm:grid-cols-2 gap-2.5 ${homeSettingsOpen ? '' : 'hidden'}`}>
                          {/* 1. Gestión de Usuarios y Perfiles */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('configuracion');
                              setConfigSection('usuarios');
                            }}
                            className="p-3 rounded-xl border border-purple-200/80 hover:border-purple-600 bg-[#fbfcfe] hover:bg-purple-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-700 text-purple-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <Users className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900 block leading-tight">
                                  Gestión de Usuarios y Perfiles
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Administrador, Encargado y Técnicos
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>

                          {/* 2. Modificar Parámetros y Listas Desplegables */}
                          <button
                            type="button"
                            onClick={() => {
                              setActiveTab('configuracion');
                              setConfigSection('parametros-ot');
                              setConfigSubSection('listas-desplegables');
                            }}
                            className="p-3 rounded-xl border border-purple-200/80 hover:border-purple-600 bg-[#fbfcfe] hover:bg-purple-50/50 text-left transition-all group flex items-center justify-between"
                          >
                            <div className="flex items-center space-x-2.5 min-w-0 pr-2">
                              <div className="w-8 h-8 rounded-lg bg-purple-100 group-hover:bg-purple-700 text-purple-800 group-hover:text-white flex items-center justify-center transition-colors flex-shrink-0">
                                <SlidersHorizontal className="w-4 h-4" />
                              </div>
                              <div className="truncate">
                                <span className="text-xs font-bold text-slate-800 group-hover:text-purple-900 block leading-tight">
                                  Modificar Parámetros OT
                                </span>
                                <span className="text-[10.5px] text-slate-500 block truncate">
                                  Listas desplegables y opciones del formulario
                                </span>
                              </div>
                            </div>
                            <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>

                  {/* Tarjetas de Resumen Rápido en Menú General */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                    <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-[#526a84] uppercase">Total OT</p>
                        <p className="text-2xl font-bold text-[#0f2d59] mt-0.5">{totalOT}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#eef4f9] text-[#0f2d59] flex items-center justify-center">
                        <ClipboardList className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-[#526a84] uppercase">Finalizadas</p>
                        <p className="text-2xl font-bold text-[#166534] mt-0.5">{termOT}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#dcfce7] text-[#166534] flex items-center justify-center">
                        <CheckCircle2 className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-[#526a84] uppercase">Pendientes</p>
                        <p className="text-2xl font-bold text-[#854d0e] mt-0.5">{penOT}</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#fef9c3] text-[#854d0e] flex items-center justify-center">
                        <Clock className="w-5 h-5" />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                      <div>
                        <p className="text-[11px] font-semibold text-[#526a84] uppercase">Inspecciones Mes</p>
                        <p className="text-2xl font-bold text-[#0f2d59] mt-0.5">
                          {doneMonthInspections} / {totalMonthInspections}
                        </p>
                        <p className="text-[9.5px] text-[#526a84]">Realizadas / Programadas</p>
                      </div>
                      <div className="w-10 h-10 rounded-lg bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </div>

                    {/* Tarjeta de Insumos Críticos */}
                    <div 
                      onClick={() => {
                        setActiveTab('finanzas');
                        setFinanzasViewMode('inventario');
                      }}
                      className={`p-4 rounded-xl border shadow-sm flex items-center justify-between cursor-pointer transition-all ${
                        lowStockItems.length > 0 
                          ? 'border-rose-300 bg-rose-50/70 hover:bg-rose-100/80' 
                          : 'border-[#86efac] bg-[#f0fdf4]'
                      }`}
                    >
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wider text-rose-800">Insumos Críticos</p>
                        <p className="text-2xl font-black mt-0.5 text-rose-700">{lowStockItems.length}</p>
                        <span className="text-[9.5px] font-semibold text-rose-600">
                          {lowStockItems.length > 0 ? 'Bajo stock mínimo' : 'Stock óptimo'}
                        </span>
                      </div>
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                        lowStockItems.length > 0 ? 'bg-rose-200 text-rose-700 animate-pulse' : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        <AlertTriangle className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  {/* ALERTA VISUAL DE INSUMOS BAJOS SI EXISTEN */}
                  {lowStockItems.length > 0 && (
                    <div className="p-4 rounded-xl border border-rose-300 bg-rose-50/70 shadow-xs space-y-3">
                      <div className="flex items-center justify-between gap-3">
                        <button
                          type="button"
                          aria-expanded={lowStockAlertOpen}
                          aria-controls="low-stock-alert-table"
                          onClick={() => setLowStockAlertOpen(open => !open)}
                          className="flex min-w-0 flex-1 items-start gap-2.5 text-left"
                        >
                          <span className="w-8 h-8 rounded-lg bg-rose-600 text-white flex items-center justify-center flex-shrink-0 animate-pulse">
                            <AlertTriangle className="w-4 h-4" />
                          </span>
                          <span className="min-w-0 flex-1">
                            <span className="block font-bold text-xs uppercase tracking-wide text-rose-900">
                              Alerta de Insumos con Stock Bajo o Agotado en Pañol ({lowStockItems.length})
                            </span>
                            <span className="block text-[11px] text-rose-700">
                              Los siguientes materiales se encuentran por debajo del stock de seguridad reglamentario.
                            </span>
                          </span>
                          <ChevronDown className={`mt-1 h-4 w-4 flex-shrink-0 text-rose-700 transition-transform ${lowStockAlertOpen ? 'rotate-180' : ''}`} />
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setActiveTab('finanzas');
                            setFinanzasViewMode('inventario');
                          }}
                          className="px-3 py-1.5 rounded-lg bg-rose-700 hover:bg-rose-800 text-white text-xs font-bold transition-colors shadow-2xs whitespace-nowrap"
                        >
                          Ir al Inventario →
                        </button>
                      </div>

                      {lowStockAlertOpen && (
                      <div id="low-stock-alert-table" className="border border-rose-200 rounded-lg overflow-hidden bg-white">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-rose-100/70 text-rose-900 font-bold border-b border-rose-200">
                            <tr>
                              <th className="px-3 py-2 w-28 font-mono">Código</th>
                              <th className="px-3 py-2">Descripción</th>
                              <th className="px-3 py-2 w-32">Rubro</th>
                              <th className="px-3 py-2 w-36">Ubicación</th>
                              <th className="px-3 py-2 text-center w-24">Mínimo</th>
                              <th className="px-3 py-2 text-center w-28">Actual</th>
                              <th className="px-3 py-2 text-right w-24">Acción</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-rose-100 text-slate-800">
                            {lowStockItems.map(item => (
                              <tr key={item.id} className="hover:bg-rose-50/40">
                                <td className="px-3 py-2 font-mono font-bold text-rose-900">{item.codigo}</td>
                                <td className="px-3 py-2 font-semibold text-slate-900">{item.descripcion}</td>
                                <td className="px-3 py-2 text-slate-600">{item.categoria}</td>
                                <td className="px-3 py-2 text-slate-500 text-[11px]">{item.ubicacion}</td>
                                <td className="px-3 py-2 text-center font-mono font-bold text-slate-600">
                                  {item.stockMinimo} {item.unidad}
                                </td>
                                <td className="px-3 py-2 text-center font-mono font-black text-rose-700">
                                  {item.stockActual} {item.unidad}
                                </td>
                                <td className="px-3 py-2 text-right">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setActiveTab('finanzas');
                                      setFinanzasViewMode('inventario');
                                      setInventarioModalMode('reposicion');
                                      setReposicionData({
                                        articuloId: item.id,
                                        cantidadSumar: 0,
                                        nuevoCostoUnitario: item.costoUnitario.replace(/[\$\s]/g, ''),
                                        comprobanteEgresoId: '',
                                        comprobanteRef: '',
                                        filtroRubro: item.categoria,
                                        busquedaTexto: item.codigo
                                      });
                                      setIsInventarioModalOpen(true);
                                    }}
                                    className="px-2 py-1 rounded bg-[#0f2d59] hover:bg-[#163e75] text-white text-[10.5px] font-bold shadow-2xs transition-colors"
                                  >
                                    Reponer
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      )}
                    </div>
                  )}

                  {/* Sección de Gráficos Comparativos de OT */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    
                    {/* Gráfico Circular 1: Dependencia Judicial */}
                    <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4 flex flex-col items-center justify-between">
                      <div className="w-full flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                        <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                          Órdenes de Trabajo por Dependencia
                        </h4>
                        <span className="text-[11px] font-semibold text-[#526a84]">
                          Total: {totalOT}
                        </span>
                      </div>

                      {/* Donut Chart SVG Interactivo */}
                      <div className="relative w-40 h-40 flex items-center justify-center my-2">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {(() => {
                            let accumulatedPercent = 0;
                            const colors = ['#0f2d59', '#2072af', '#38bdf8', '#818cf8', '#6366f1'];
                            return Object.entries(depMap).map(([dep, count], idx) => {
                              const pct = totalOT > 0 ? (count / totalOT) * 100 : 0;
                              const strokeDasharray = `${pct} ${100 - pct}`;
                              const strokeDashoffset = -accumulatedPercent;
                              accumulatedPercent += pct;
                              const color = colors[idx % colors.length];

                              return (
                                <circle
                                  key={idx}
                                  cx="18"
                                  cy="18"
                                  r="15.9155"
                                  fill="transparent"
                                  stroke={color}
                                  strokeWidth="3.8"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                >
                                  <title>{`${dep}: ${count} Órdenes de Trabajo (${Math.round(pct)}%)`}</title>
                                </circle>
                              );
                            });
                          })()}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-xl font-bold text-[#0f2d59]">{totalOT}</span>
                          <span className="text-[9px] uppercase font-bold text-[#526a84]">Órdenes</span>
                        </div>
                      </div>

                      {/* Leyenda interactiva */}
                      <div className="w-full space-y-1.5 pt-2 border-t border-[#f1f5f9]">
                        {Object.entries(depMap).map(([dep, count], idx) => {
                          const pct = totalOT > 0 ? Math.round((count / totalOT) * 100) : 0;
                          const colors = ['bg-[#0f2d59]', 'bg-[#2072af]', 'bg-[#38bdf8]', 'bg-[#818cf8]', 'bg-[#6366f1]'];
                          return (
                            <div key={idx} className="flex items-center justify-between text-[11px]" title={`${dep}: ${count} Órdenes de Trabajo (${pct}%)`}>
                              <div className="flex items-center space-x-2 truncate">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors[idx % colors.length]}`}></span>
                                <span className="text-[#384c63] truncate font-medium">{dep}</span>
                              </div>
                              <span className="font-bold text-[#0f2d59] ml-2 flex-shrink-0">{count} ({pct}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gráfico Circular 2: Rubro Técnico */}
                    <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4 flex flex-col items-center justify-between">
                      <div className="w-full flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                        <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                          Distribución por Rubro
                        </h4>
                        <span className="text-[11px] font-semibold text-[#526a84]">
                          Especialidades
                        </span>
                      </div>

                      {/* Donut Chart SVG Interactivo */}
                      <div className="relative w-40 h-40 flex items-center justify-center my-2">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {(() => {
                            let accumulatedPercent = 0;
                            const colors = ['#166534', '#0d9488', '#0284c7', '#d97706', '#7c3aed'];
                            return Object.entries(rubMap).map(([rub, count], idx) => {
                              const pct = totalOT > 0 ? (count / totalOT) * 100 : 0;
                              const strokeDasharray = `${pct} ${100 - pct}`;
                              const strokeDashoffset = -accumulatedPercent;
                              accumulatedPercent += pct;
                              const color = colors[idx % colors.length];

                              return (
                                <circle
                                  key={idx}
                                  cx="18"
                                  cy="18"
                                  r="15.9155"
                                  fill="transparent"
                                  stroke={color}
                                  strokeWidth="3.8"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                >
                                  <title>{`${rub}: ${count} OT (${Math.round(pct)}%)`}</title>
                                </circle>
                              );
                            });
                          })()}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-xl font-bold text-[#166534]">{Object.keys(rubMap).length}</span>
                          <span className="text-[9px] uppercase font-bold text-[#526a84]">Rubros</span>
                        </div>
                      </div>

                      {/* Leyenda interactiva */}
                      <div className="w-full space-y-1.5 pt-2 border-t border-[#f1f5f9]">
                        {Object.entries(rubMap).map(([rub, count], idx) => {
                          const pct = totalOT > 0 ? Math.round((count / totalOT) * 100) : 0;
                          const colors = ['bg-[#166534]', 'bg-[#0d9488]', 'bg-[#0284c7]', 'bg-[#d97706]', 'bg-[#7c3aed]'];
                          return (
                            <div key={idx} className="flex items-center justify-between text-[11px]" title={`${rub}: ${count} OT (${pct}%)`}>
                              <div className="flex items-center space-x-2 truncate">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors[idx % colors.length]}`}></span>
                                <span className="text-[#384c63] truncate font-medium">{rub}</span>
                              </div>
                              <span className="font-bold text-[#166534] ml-2 flex-shrink-0">{count} ({pct}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    {/* Gráfico Circular 3: Piso / Sector Edilicio */}
                    <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4 flex flex-col items-center justify-between">
                      <div className="w-full flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                        <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                          Distribución por Sector
                        </h4>
                        <span className="text-[11px] font-semibold text-[#526a84]">
                          Ubicación
                        </span>
                      </div>

                      {/* Donut Chart SVG Interactivo */}
                      <div className="relative w-40 h-40 flex items-center justify-center my-2">
                        <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                          {(() => {
                            let accumulatedPercent = 0;
                            const colors = ['#047857', '#0369a1', '#b45309', '#6d28d9', '#be185d'];
                            return Object.entries(pisoMap).map(([piso, count], idx) => {
                              const pct = totalOT > 0 ? (count / totalOT) * 100 : 0;
                              const strokeDasharray = `${pct} ${100 - pct}`;
                              const strokeDashoffset = -accumulatedPercent;
                              accumulatedPercent += pct;
                              const color = colors[idx % colors.length];

                              return (
                                <circle
                                  key={idx}
                                  cx="18"
                                  cy="18"
                                  r="15.9155"
                                  fill="transparent"
                                  stroke={color}
                                  strokeWidth="3.8"
                                  strokeDasharray={strokeDasharray}
                                  strokeDashoffset={strokeDashoffset}
                                  className="transition-all duration-300 hover:opacity-80 cursor-pointer"
                                >
                                  <title>{`${piso}: ${count} OT (${Math.round(pct)}%)`}</title>
                                </circle>
                              );
                            });
                          })()}
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                          <span className="text-xl font-bold text-[#047857]">{Object.keys(pisoMap).length}</span>
                          <span className="text-[9px] uppercase font-bold text-[#526a84]">Sectores</span>
                        </div>
                      </div>

                      {/* Leyenda interactiva */}
                      <div className="w-full space-y-1.5 pt-2 border-t border-[#f1f5f9]">
                        {Object.entries(pisoMap).map(([piso, count], idx) => {
                          const pct = totalOT > 0 ? Math.round((count / totalOT) * 100) : 0;
                          const colors = ['bg-[#047857]', 'bg-[#0369a1]', 'bg-[#b45309]', 'bg-[#6d28d9]', 'bg-[#be185d]'];
                          return (
                            <div key={idx} className="flex items-center justify-between text-[11px]" title={`${piso}: ${count} OT (${pct}%)`}>
                              <div className="flex items-center space-x-2 truncate">
                                <span className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${colors[idx % colors.length]}`}></span>
                                <span className="text-[#384c63] truncate font-medium">{piso}</span>
                              </div>
                              <span className="font-bold text-emerald-700 ml-2 flex-shrink-0">{count} ({pct}%)</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                  </div>
                </div>
              );
            })()}

            {activeTab === 'ordenes' && (
              <>
                {/* SUBVISTA 1 DE OT: RESUMEN DE ÓRDENES */}
                {ordenesViewMode === 'resumen' && (() => {
                  const totalOT = orders.length;
                  const termOT = orders.filter(o => o.estadoEjecucion === 'Finalizada').length;
                  const penOT = orders.filter(o => o.estadoEjecucion === 'Pendiente').length;
                  const sinAsignarOT = orders.filter(o => o.estadoEjecucion === 'Sin Asignar').length;
                  const rateResolution = totalOT > 0 ? Math.round((termOT / totalOT) * 100) : 0;

                  // Desglose por Tipo de Mantenimiento
                  const types = ['Correctiva', 'Preventiva', 'Predictiva', 'Inspección Edilicia'];
                  const typeCounts = types.map(t => ({
                    tipo: t,
                    count: orders.filter(o => o.tipoMantenimiento === t).length,
                    pct: totalOT > 0 ? Math.round((orders.filter(o => o.tipoMantenimiento === t).length / totalOT) * 100) : 0
                  }));

                  // Desglose por Prioridad
                  const priorities = [
                    { label: 'Urgente', color: 'bg-red-500', text: 'text-red-700', bgBadge: 'bg-red-50 border-red-200' },
                    { label: 'Alta', color: 'bg-amber-500', text: 'text-amber-700', bgBadge: 'bg-amber-50 border-amber-200' },
                    { label: 'Media', color: 'bg-sky-500', text: 'text-sky-700', bgBadge: 'bg-sky-50 border-sky-200' },
                    { label: 'Baja', color: 'bg-slate-400', text: 'text-slate-600', bgBadge: 'bg-slate-50 border-slate-200' }
                  ];
                  const priorityCounts = priorities.map(p => ({
                    ...p,
                    count: orders.filter(o => o.prioridad === p.label).length,
                    pct: totalOT > 0 ? Math.round((orders.filter(o => o.prioridad === p.label).length / totalOT) * 100) : 0
                  }));

                  // Desglose por Piso / Sector
                  const pisoCountsMap = {};
                  orders.forEach(o => {
                    const p = o.sector && o.sector !== '-- Seleccionar opción --' ? o.sector : 'Sin Especificar';
                    pisoCountsMap[p] = (pisoCountsMap[p] || 0) + 1;
                  });
                  const sortedPisos = Object.entries(pisoCountsMap).sort((a, b) => b[1] - a[1]);

                  // Reiteración de Oficinas Solicitantes (Ranking)
                  const oficinaMap = {};
                  orders.forEach(o => {
                    const ofc = o.oficina && o.oficina.trim() ? o.oficina.trim() : 'Sin Oficina Indicada';
                    oficinaMap[ofc] = (oficinaMap[ofc] || 0) + 1;
                  });
                  const topOficinas = Object.entries(oficinaMap).sort((a, b) => b[1] - a[1]);

                  // Carga de Trabajo por Técnico Asignado
                  const tecnicoMap = {};
                  orders.forEach(o => {
                    const tec = o.tecnicoFinal || o.tecnico;
                    const tecName = tec && tec !== '-- Seleccionar opción --' ? tec : 'Sin Asignar';
                    if (!tecnicoMap[tecName]) {
                      tecnicoMap[tecName] = { total: 0, finalizadas: 0, pendientes: 0 };
                    }
                    tecnicoMap[tecName].total += 1;
                    if (o.estadoEjecucion === 'Finalizada') tecnicoMap[tecName].finalizadas += 1;
                    else tecnicoMap[tecName].pendientes += 1;
                  });
                  const sortedTecnicos = Object.entries(tecnicoMap).sort((a, b) => b[1].total - a[1].total);

                  // Desglose por Rubro Especializado
                  const rubroMap = {};
                  orders.forEach(o => {
                    const rub = o.rubroFinal || o.rubro || 'General';
                    rubroMap[rub] = (rubroMap[rub] || 0) + 1;
                  });
                  const sortedRubros = Object.entries(rubroMap).sort((a, b) => b[1] - a[1]);

                  return (
                    <div className="space-y-6">
                      {/* Cabecera Analítica */}
                      <div className="bg-white p-5 rounded-xl border border-[#d9e3ec] shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center space-x-3.5">
                          <div className="w-11 h-11 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center shadow-xs">
                            <BarChart3 className="w-6 h-6" />
                          </div>
                          <div>
                            <div className="text-[11px] font-bold uppercase tracking-wider text-[#3d7bb5]">
                              Tablero Estadístico de Mantenimiento
                            </div>
                            <h3 className="font-bold text-base text-[#0f2d59]">
                              Resumen General e Indicadores de Rendimiento de Órdenes de Trabajo
                            </h3>
                            <p className="text-xs text-[#526a84]">
                              Análisis integral de volumen operativo, criticidad, demanda por áreas edilicias y distribución técnica.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 self-end md:self-auto">
                          <div className="px-4 py-2 bg-[#f0f6fa] border border-[#cfe0ee] rounded-xl text-right">
                            <span className="text-[10.5px] font-bold text-[#526a84] uppercase block">Tasa de Resolución</span>
                            <span className="text-lg font-black text-[#166534]">{rateResolution}%</span>
                          </div>
                        </div>
                      </div>

                      {/* Tarjetas Principales de Volumen */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">Volumen Total OT</p>
                            <p className="text-2xl font-bold text-[#0f2d59] mt-0.5">{totalOT}</p>
                            <span className="text-[10px] text-[#6b8299] font-medium">100% registros activos</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#eef4f9] text-[#0f2d59] flex items-center justify-center">
                            <ClipboardList className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">OT Finalizadas</p>
                            <p className="text-2xl font-bold text-[#166534] mt-0.5">{termOT}</p>
                            <span className="text-[10px] text-[#166534] font-semibold">{rateResolution}% concluidas</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#dcfce7] text-[#166534] flex items-center justify-center">
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">OT Pendientes</p>
                            <p className="text-2xl font-bold text-[#854d0e] mt-0.5">{penOT}</p>
                            <span className="text-[10px] text-[#854d0e] font-semibold">En curso operativo</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#fef9c3] text-[#854d0e] flex items-center justify-center">
                            <Clock className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">OT Sin Asignar</p>
                            <p className="text-2xl font-bold text-slate-700 mt-0.5">{sinAsignarOT}</p>
                            <span className="text-[10px] text-slate-500 font-medium">Requieren técnico</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-slate-100 text-slate-700 flex items-center justify-center">
                            <AlertTriangle className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* SECCIÓN ANALÍTICA: Fila 1 - Por Tipo de Mantenimiento & Por Nivel de Prioridad */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        
                        {/* 1. Cantidad por Tipo de Mantenimiento */}
                        <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                            <div className="flex items-center space-x-2">
                              <Activity className="w-4 h-4 text-[#0f2d59]" />
                              <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                                Volumen por Tipo de Mantenimiento
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-[#526a84]">
                              {totalOT} órdenes
                            </span>
                          </div>

                          <div className="space-y-3">
                            {typeCounts.map((t, idx) => {
                              const barColors = [
                                'bg-[#0f2d59]',
                                'bg-[#0284c7]',
                                'bg-[#059669]',
                                'bg-[#7c3aed]'
                              ];
                              const colorClass = barColors[idx % barColors.length];
                              return (
                                <div key={t.tipo} className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-[#384c63]">{t.tipo}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold text-[#0f2d59]">{t.count} OT</span>
                                      <span className="text-[10.5px] text-[#6b8299] w-10 text-right font-mono">({t.pct}%)</span>
                                    </div>
                                  </div>
                                  <div className="h-2.5 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                                    <div 
                                      className={`h-full ${colorClass} rounded-full transition-all duration-500`}
                                      style={{ width: `${Math.max(t.pct, t.count > 0 ? 5 : 0)}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>

                          <div className="pt-2 border-t border-[#f1f5f9] text-[11px] text-[#6b8299] flex items-center justify-between">
                            <span>Correctivas vs Preventivas e Inspección</span>
                            <span className="font-semibold text-[#0f2d59]">
                              {orders.filter(o => o.tipoMantenimiento === 'Correctiva').length} Correctivas / {orders.filter(o => o.tipoMantenimiento !== 'Correctiva').length} Programadas
                            </span>
                          </div>
                        </div>

                        {/* 2. Cantidad por Nivel de Prioridad */}
                        <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                            <div className="flex items-center space-x-2">
                              <Flame className="w-4 h-4 text-amber-600" />
                              <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                                Clasificación por Criticidad y Prioridad
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-[#526a84]">
                              Nivel de Urgencia
                            </span>
                          </div>

                          <div className="grid grid-cols-2 gap-3 pt-1">
                            {priorityCounts.map((p) => (
                              <div 
                                key={p.label}
                                className={`p-3.5 rounded-xl border ${p.bgBadge} flex flex-col justify-between`}
                              >
                                <div className="flex items-center justify-between">
                                  <span className={`text-[11px] font-black uppercase tracking-wider ${p.text}`}>
                                    {p.label}
                                  </span>
                                  <span className="font-mono font-bold text-xs px-2 py-0.5 rounded-full bg-white text-slate-800 shadow-xs border border-slate-200">
                                    {p.pct}%
                                  </span>
                                </div>
                                <div className="mt-2 flex items-baseline justify-between">
                                  <span className={`text-2xl font-black ${p.text}`}>{p.count}</span>
                                  <span className="text-[10px] text-slate-500 font-semibold">órdenes</span>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="pt-1 text-[11px] text-[#6b8299] flex items-center justify-between">
                            <span>Órdenes de atención preferente (Urgente + Alta):</span>
                            <span className="font-bold text-[#b91c1c]">
                              {orders.filter(o => o.prioridad === 'Urgente' || o.prioridad === 'Alta').length} OT
                            </span>
                          </div>
                        </div>

                      </div>

                      {/* SECCIÓN ANALÍTICA: Fila 2 - Demanda por Piso & Reiteración de Oficinas Solicitantes */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* 3. Cantidad por Piso / Nivel Edilicio */}
                        <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                            <div className="flex items-center space-x-2">
                              <Building2 className="w-4 h-4 text-[#0f2d59]" />
                              <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                                Intervenciones por Piso / Sector Edilicio
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-[#526a84]">
                              {sortedPisos.length} sectores
                            </span>
                          </div>

                          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                            {sortedPisos.length > 0 ? (
                              sortedPisos.map(([piso, count]) => {
                                const pct = totalOT > 0 ? Math.round((count / totalOT) * 100) : 0;
                                return (
                                  <div key={piso} className="flex items-center justify-between p-2.5 rounded-lg border border-[#e8eff5] hover:bg-[#f8fafc] transition-colors text-xs">
                                    <div className="flex items-center space-x-2.5 truncate max-w-[70%]">
                                      <span className="w-2 h-2 rounded-full bg-[#0284c7] flex-shrink-0"></span>
                                      <span className="font-semibold text-[#1c2d42] truncate">{piso}</span>
                                    </div>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded text-[11px] border border-[#cfe0ee]">
                                        {count} OT
                                      </span>
                                      <span className="font-mono text-[10.5px] text-[#6b8299] w-10 text-right">
                                        {pct}%
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-center py-6 text-xs text-slate-400">Sin datos de pisos registrados.</p>
                            )}
                          </div>
                        </div>

                        {/* 4. Reiteración de Oficinas Solicitantes (Ranking) */}
                        <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                            <div className="flex items-center space-x-2">
                              <TrendingUp className="w-4 h-4 text-[#166534]" />
                              <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                                Reiteración de Oficinas y Dependencias Solicitantes
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-[#526a84]">
                              Frecuencia
                            </span>
                          </div>

                          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                            {topOficinas.length > 0 ? (
                              topOficinas.map(([oficina, count], idx) => {
                                const pct = totalOT > 0 ? Math.round((count / totalOT) * 100) : 0;
                                return (
                                  <div key={oficina} className="flex items-center justify-between p-2.5 rounded-lg border border-[#e8eff5] hover:bg-[#f8fafc] transition-colors text-xs">
                                    <div className="flex items-center space-x-2.5 truncate max-w-[75%]">
                                      <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] flex-shrink-0 ${
                                        idx === 0 ? 'bg-amber-100 text-amber-800 border border-amber-300' :
                                        idx === 1 ? 'bg-slate-200 text-slate-800' :
                                        'bg-slate-100 text-slate-600'
                                      }`}>
                                        {idx + 1}
                                      </span>
                                      <span className="font-semibold text-[#1c2d42] truncate" title={oficina}>
                                        {oficina}
                                      </span>
                                    </div>
                                    <div className="flex items-center space-x-2 flex-shrink-0">
                                      <span className="font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded text-[11px] border border-[#cfe0ee]">
                                        {count} req.
                                      </span>
                                      <span className="font-mono text-[10.5px] text-[#6b8299] w-10 text-right">
                                        {pct}%
                                      </span>
                                    </div>
                                  </div>
                                );
                              })
                            ) : (
                              <p className="text-center py-6 text-xs text-slate-400">Sin requerimientos de oficinas.</p>
                            )}
                          </div>
                        </div>

                      </div>

                      {/* SECCIÓN ANALÍTICA: Fila 3 - Distribución por Técnico Asignado & Por Rubro Técnico */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* 5. Carga de Trabajo por Técnico */}
                        <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                            <div className="flex items-center space-x-2">
                              <Users className="w-4 h-4 text-[#0f2d59]" />
                              <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                                Carga de Trabajo y Asignación por Técnico
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-[#526a84]">
                              {sortedTecnicos.length} operarios
                            </span>
                          </div>

                          <div className="space-y-3">
                            {sortedTecnicos.map(([tecnico, data]) => {
                              const pctTec = totalOT > 0 ? Math.round((data.total / totalOT) * 100) : 0;
                              return (
                                <div key={tecnico} className="p-3 rounded-lg border border-[#e8eff5] bg-[#fbfcfe] space-y-2 text-xs">
                                  <div className="flex items-center justify-between">
                                    <span className="font-bold text-[#0f2d59]">{tecnico}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold text-slate-800">{data.total} OT totales</span>
                                      <span className="text-[10px] text-slate-500 font-mono">({pctTec}%)</span>
                                    </div>
                                  </div>

                                  <div className="flex items-center space-x-3 text-[11px]">
                                    <span className="inline-flex items-center space-x-1 text-[#166534] font-semibold">
                                      <span className="w-2 h-2 rounded-full bg-[#16a34a]"></span>
                                      <span>{data.finalizadas} finalizadas</span>
                                    </span>
                                    <span className="inline-flex items-center space-x-1 text-[#854d0e] font-semibold">
                                      <span className="w-2 h-2 rounded-full bg-[#eab308]"></span>
                                      <span>{data.pendientes} pendientes</span>
                                    </span>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* 6. Distribución por Rubro Técnico Especializado */}
                        <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                          <div className="flex items-center justify-between pb-3 border-b border-[#eef4f8]">
                            <div className="flex items-center space-x-2">
                              <Wrench className="w-4 h-4 text-[#0f2d59]" />
                              <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                                Distribución por Rubro y Especialidad
                              </h4>
                            </div>
                            <span className="text-[11px] font-bold text-[#526a84]">
                              {sortedRubros.length} rubros
                            </span>
                          </div>

                          <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                            {sortedRubros.map(([rubro, count]) => {
                              const pct = totalOT > 0 ? Math.round((count / totalOT) * 100) : 0;
                              return (
                                <div key={rubro} className="space-y-1">
                                  <div className="flex items-center justify-between text-xs">
                                    <span className="font-semibold text-[#384c63]">{rubro}</span>
                                    <div className="flex items-center space-x-2">
                                      <span className="font-bold text-[#0f2d59]">{count} OT</span>
                                      <span className="font-mono text-[10.5px] text-[#6b8299] w-10 text-right">({pct}%)</span>
                                    </div>
                                  </div>
                                  <div className="h-2 w-full bg-[#f1f5f9] rounded-full overflow-hidden">
                                    <div 
                                      className="h-full bg-[#0f2d59] rounded-full"
                                      style={{ width: `${Math.max(pct, count > 0 ? 6 : 0)}%` }}
                                    />
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                      </div>

                    </div>
                  );
                })()}

                {/* SUBVISTA 2 DE OT: GESTIÓN Y LISTADO COMPLETO */}
                {ordenesViewMode === 'list' && (
                  <>
                    {/* Métricas con colores pastel y sobrios (Total, Finalizadas, Pendientes, Sin Asignar e Inspección Edilicia) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
                      {(() => {
                        const totalOT = orders.length;
                        const termOT = orders.filter(o => o.estadoEjecucion === 'Finalizada').length;
                        const penOT = orders.filter(o => o.estadoEjecucion === 'Pendiente').length;
                        const sinAsignarOT = orders.filter(o => o.estadoEjecucion === 'Sin Asignar').length;
                        const inspEdiliciaOT = orders.filter(o => o.tipoMantenimiento === 'Inspección Edilicia').length;

                        return [
                          { label: 'Total de Órdenes', val: totalOT, icon: ClipboardList, bg: 'bg-[#eef4f9]', color: 'text-[#0f2d59]' },
                          { label: 'Finalizadas', val: termOT, icon: CheckCircle2, bg: 'bg-[#eaf5ef]', color: 'text-[#207245]' },
                          { label: 'Pendientes', val: penOT, icon: Clock, bg: 'bg-[#fef9ec]', color: 'text-[#9c6515]' },
                          { label: 'Sin Asignar', val: sinAsignarOT, icon: AlertTriangle, bg: 'bg-slate-100', color: 'text-slate-700' },
                          { label: 'Inspección Edilicia', val: inspEdiliciaOT, icon: Building2, bg: 'bg-[#eef2ff]', color: 'text-[#3730a3]' }
                        ];
                      })().map((stat, idx) => (
                        <div 
                          key={idx}
                          className="p-3.5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between"
                        >
                          <div>
                            <p className="text-[10.5px] font-semibold text-[#526a84] uppercase tracking-wide">{stat.label}</p>
                            <p className="text-xl font-bold text-[#0f2d59] mt-0.5">{stat.val}</p>
                          </div>
                          <div className={`w-9 h-9 rounded-lg ${stat.bg} ${stat.color} flex items-center justify-center flex-shrink-0`}>
                            <stat.icon className="w-4 h-4" />
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Filtros y Búsqueda */}
                    <div className="p-3.5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col xl:flex-row gap-2.5 items-stretch xl:items-center justify-between">
                      <div className="relative flex-1 min-w-[200px]">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7e95ad]" />
                        <input
                          type="text"
                          placeholder="Buscar por Nº OT, descripción, solicitante, rubro o técnico..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none text-[#1c2d42] placeholder-[#8ea0b3]"
                        />
                      </div>

                      <div className="flex flex-wrap items-center gap-2 flex-shrink-0">
                        <select
                          value={filterType}
                          onChange={(e) => setFilterType(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                        >
                          <option value="all">Tipo: Todos</option>
                          <option value="Correctiva">Correctiva</option>
                          <option value="Preventiva">Preventiva</option>
                          <option value="Predictiva">Predictiva</option>
                          <option value="Inspección Edilicia">Inspección Edilicia</option>
                        </select>

                        <select
                          value={filterDependencia}
                          onChange={(e) => setFilterDependencia(e.target.value)}
                          className="max-w-[170px] truncate px-2.5 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                        >
                          <option value="all">Dependencia: Todas</option>
                          {dropdownOptions.dependencias.map((dep, idx) => (
                            <option key={idx} value={dep}>{dep}</option>
                          ))}
                        </select>

                        <select
                          value={filterRubro}
                          onChange={(e) => setFilterRubro(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                        >
                          <option value="all">Rubro: Todos</option>
                          {dropdownOptions.rubros.map((rub, idx) => (
                            <option key={idx} value={rub}>{rub}</option>
                          ))}
                        </select>

                        <select
                          value={filterPriority}
                          onChange={(e) => setFilterPriority(e.target.value)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                        >
                          <option value="all">Prioridad: Todas</option>
                          <option value="Baja">Baja</option>
                          <option value="Media">Media</option>
                          <option value="Alta">Alta</option>
                          <option value="Urgente">Urgente</option>
                        </select>

                        <button
                          type="button"
                          onClick={() => handlePrintDocument('resumen_con_filtros', { filteredOrders })}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f2d59] hover:bg-[#163e75] text-white shadow-2xs transition-colors whitespace-nowrap"
                          title="Imprimir informe: Hoja 1 Resumen de todas las OT y Hoja 2 con las OT filtradas"
                        >
                          <Printer className="w-3.5 h-3.5" />
                          <span>Imprimir Informe</span>
                        </button>
                      </div>
                    </div>

                    {/* Tabla de Órdenes con Barra de Desplazamiento Horizontal Fluida y Espacio Completo */}
                    <div className="rounded-xl border border-[#d9e3ec] bg-white shadow-sm overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full min-w-[1150px] text-left text-xs border-collapse">
                          <thead>
                            <tr className="bg-[#f0f5fa] border-b border-[#dce5ee] text-[#0f2d59] font-bold">
                              <th className="w-24 px-3.5 py-3 whitespace-nowrap">Nº OT</th>
                              <th className="w-32 px-3.5 py-3 whitespace-nowrap">Tipo</th>
                              <th className="min-w-[210px] px-3.5 py-3">Dependencia</th>
                              <th className="min-w-[170px] px-3.5 py-3">Piso / Oficina</th>
                              <th className="min-w-[150px] px-3.5 py-3">Solicitante</th>
                              <th className="w-24 px-3.5 py-3 text-center whitespace-nowrap">Prioridad</th>
                              <th className="min-w-[140px] px-3.5 py-3">Técnico</th>
                              <th className="w-28 px-3.5 py-3 text-center whitespace-nowrap">Estado</th>
                              <th className="w-28 px-3.5 py-3 text-right whitespace-nowrap">Acciones</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-[#e8eff5] text-[#2c3e50]">
                            {filteredOrders.length > 0 ? (
                              filteredOrders.map((order) => (
                                <tr key={order.id} className="hover:bg-[#f8fafc] transition-colors">
                                  <td className="px-3.5 py-3 font-mono font-bold text-[#0f2d59] whitespace-nowrap">
                                    {order.id}
                                  </td>
                                  <td className="px-3.5 py-3 whitespace-nowrap">
                                    <span className="inline-block px-2.5 py-1 rounded text-[11px] font-semibold bg-[#eef4f9] text-[#163e75] border border-[#d2e2f0] whitespace-nowrap">
                                      {order.tipoMantenimiento}
                                    </span>
                                  </td>
                                  <td className="px-3.5 py-3 font-semibold text-[#0f2d59]">
                                    <div className="leading-snug">{order.dependencia || '—'}</div>
                                  </td>
                                  <td className="px-3.5 py-3">
                                    <div className="font-medium text-[#41566e] leading-snug">{order.sector || '—'}</div>
                                    <div className="text-[10.5px] text-[#6b8299] leading-snug mt-0.5">{order.oficina || '—'}</div>
                                  </td>
                                  <td className="px-3.5 py-3 text-[#384c63]">
                                    <div className="leading-snug">{order.solicitante || '—'}</div>
                                  </td>
                                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                                    <span className={`inline-block px-2.5 py-1 rounded text-[10.5px] font-bold whitespace-nowrap ${
                                      order.prioridad === 'Urgente' ? 'bg-[#fee2e2] text-[#991b1b] border border-[#fecaca]' :
                                      order.prioridad === 'Alta' ? 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]' :
                                      order.prioridad === 'Media' ? 'bg-[#e0f2fe] text-[#075985] border border-[#bae6fd]' :
                                      'bg-[#f1f5f9] text-[#475569] border border-[#e2e8f0]'
                                    }`}>
                                      {order.prioridad}
                                    </span>
                                  </td>
                                  <td className="px-3.5 py-3 font-medium text-[#20457a]">
                                    <div className="leading-snug">{order.tecnicoFinal || order.tecnico}</div>
                                  </td>
                                  <td className="px-3.5 py-3 text-center whitespace-nowrap">
                                    <span className={`inline-flex items-center justify-center px-3 py-1 rounded-md text-[10.5px] font-bold whitespace-nowrap border leading-none ${
                                      order.estadoEjecucion === 'Finalizada' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' :
                                      order.estadoEjecucion === 'En Curso' ? 'bg-[#e0f2fe] text-[#075985] border-[#bae6fd]' :
                                      order.estadoEjecucion === 'Pendiente' ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]' :
                                      'bg-[#f1f5f9] text-[#475569] border-[#e2e8f0]'
                                    }`}>
                                      {order.estadoEjecucion}
                                    </span>
                                  </td>
                                  <td className="px-3.5 py-3 text-right whitespace-nowrap">
                                    <div className="inline-flex items-center justify-end gap-1.5">
                                      <button
                                        onClick={() => {
                                          setFormData({ ...order });
                                          setFormErrors({});
                                          setIsNewOrderModal(false);
                                          setIsOrderEditLocked(true);
                                          setIsModalOpen(true);
                                        }}
                                        className="p-1.5 rounded-md text-[#0f2d59] hover:bg-[#e2edf6] transition-colors"
                                        title="Abrir / Editar OT"
                                      >
                                        <FileText className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setSelectedOrder(order);
                                          setIsPreviewOpen(true);
                                        }}
                                        className="p-1.5 rounded-md text-[#3d7bb5] hover:bg-[#eef4f9] hover:text-[#0f2d59] transition-colors"
                                        title="Previsualizar A4"
                                      >
                                        <Eye className="w-4 h-4" />
                                      </button>
                                      <button
                                        onClick={() => {
                                          setSelectedOrder(order);
                                          handlePrintDocument('order', order);
                                        }}
                                        className="p-1.5 rounded-md text-[#0f2d59] hover:bg-[#e2edf6] transition-colors"
                                        title="Imprimir / Exportar PDF"
                                      >
                                        <Printer className="w-4 h-4" />
                                      </button>
                                    </div>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr>
                                <td colSpan="9" className="px-4 py-8 text-center text-[#6b8299]">
                                  No se encontraron órdenes de trabajo que coincidan con los criterios.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </>
                )}
              </>
            )}

            {/* VISTA: SISTEMAS DE BOMBAS */}
            {activeTab === 'bombas' && (
              <div className="space-y-6">
                
                {/* Métricas Generales del Sistema Hidráulico */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">Equipos Monitoreados</p>
                      <p className="text-2xl font-bold text-[#0f2d59] mt-0.5">{bombasData.length}</p>
                      <span className="text-[10px] text-[#0369a1] font-semibold">5 Cuadros · 2 por posición</span>
                    </div>
                    <div className="w-11 h-11 rounded-lg bg-[#e0f2fe] text-[#0369a1] flex items-center justify-center">
                      <Droplets className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">Operativas</p>
                      <p className="text-2xl font-bold text-[#166534] mt-0.5">
                        {bombasData.filter(b => b.estado === 'Operativa').length}
                      </p>
                      <span className="text-[10px] text-[#166534] font-semibold">Listas para servicio</span>
                    </div>
                    <div className="w-11 h-11 rounded-lg bg-[#dcfce7] text-[#166534] flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">A Reparar</p>
                      <p className="text-2xl font-bold text-[#854d0e] mt-0.5">
                        {bombasData.filter(b => b.estado === 'A Reparar').length}
                      </p>
                      <span className="text-[10px] text-[#854d0e] font-semibold">Requieren service</span>
                    </div>
                    <div className="w-11 h-11 rounded-lg bg-[#fef9c3] text-[#854d0e] flex items-center justify-center">
                      <AlertTriangle className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                    <div>
                      <p className="text-[11px] font-semibold text-[#526a84] uppercase tracking-wide">En Reparación</p>
                      <p className="text-2xl font-bold text-[#991b1b] mt-0.5">
                        {bombasData.filter(b => b.estado === 'En Reparación').length}
                      </p>
                      <span className="text-[10px] text-slate-500 font-semibold">En taller / desmontadas</span>
                    </div>
                    <div className="w-11 h-11 rounded-lg bg-[#fee2e2] text-[#991b1b] flex items-center justify-center">
                      <Wrench className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                {/* Subvista 1: Monitoreo de Cuadros de Bombas */}
                {bombasViewMode === 'tablero' && (
                  <div className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between bg-white p-4 rounded-xl border border-[#d9e3ec] shadow-sm gap-3">
                      <div className="flex items-center space-x-3">
                        <Gauge className="w-5 h-5 text-[#0f2d59]" />
                        <div>
                          <h3 className="font-bold text-xs text-[#0f2d59]">Monitoreo de Cuadros de Bombas del Edificio Judicial</h3>
                          <p className="text-[11px] text-[#6b8299]">
                            Visualización de todos los cuadros edilicios. Cada cuadro cuenta con dos posiciones configurables. Puede crear nuevos cuadros, editar sus descripciones y personalizar los nombres de las posiciones.
                          </p>
                        </div>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <button
                          type="button"
                          onClick={() => handlePrintDocument('cuadros_bombas')}
                          className="inline-flex items-center space-x-1.5 px-3 py-1.5 bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] rounded-lg text-xs font-bold transition-colors"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#3d7bb5]" />
                          <span>Imprimir Estado de Cuadros</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenNewCuadro}
                          className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#0f2d59] hover:bg-[#163e75] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>+ Crear Cuadro de Bombas</span>
                        </button>
                        <button
                          onClick={() => {
                            setBombasViewMode('equipos');
                          }}
                          className="px-3.5 py-1.5 bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] rounded-lg text-xs font-bold transition-colors"
                        >
                          Gestionar en Equipo de Bombas
                        </button>
                      </div>
                    </div>

                    {/* TODOS LOS CUADROS DE BOMBAS (Siempre visibles con Posición 01 y Posición 02 configurables) */}
                    {cuadrosData.map(grupo => {
                      // Buscar bombas asignadas a cada una de las dos posiciones fijas
                      const bombasEnCuadro = bombasData.filter(b => b.cuadro === grupo.nombre);
                      
                      const bombaPos1 = bombasEnCuadro.find(b => b.posicionSlot === 1) || null;
                      const bombaPos2 = bombasEnCuadro.find(b => b.posicionSlot === 2) || null;

                      const label1 = grupo.pos1Label || 'POSICIÓN 01';
                      const label2 = grupo.pos2Label || 'POSICIÓN 02';

                      // Determinar cuál posición está activa actualmente
                      let activeSlot = 1;
                      if (bombaPos2 && bombaPos2.alternancia === 'BOMBA EN USO') {
                        activeSlot = 2;
                      }

                      const slots = [
                        { slotNum: 1, label: label1, bomba: bombaPos1 },
                        { slotNum: 2, label: label2, bomba: bombaPos2 }
                      ];

                      const ultimoMantenimiento = grupo.mantenimientos && grupo.mantenimientos.length > 0 ? grupo.mantenimientos[0] : null;

                      return (
                        <div key={grupo.id} className="bg-white rounded-xl border border-[#d9e3ec] shadow-sm p-5 space-y-4">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#eef4f8] gap-3">
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#0f2d59]"></span>
                                <h4 className="font-bold text-xs uppercase tracking-wider text-[#0f2d59]">{grupo.nombre}</h4>
                                <span className="text-[10px] font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded border border-[#cfe0ee]">
                                  {label1} & {label2}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setEditingCuadro({ ...grupo });
                                    setIsNewCuadroModal(false);
                                    setCuadroModalTab('datos');
                                  }}
                                  className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10.5px] font-bold bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] transition-colors"
                                  title="Modificar nombre, descripción, posiciones o mantenimientos"
                                >
                                  <Edit3 className="w-3 h-3 text-[#3d7bb5]" />
                                  <span>Modificar Cuadro</span>
                                </button>
                              </div>
                              <p className="text-[10.5px] text-[#6b8299] mt-0.5">{grupo.desc}</p>
                              {ultimoMantenimiento && (
                                <p className="text-[10px] text-emerald-700 font-semibold mt-1 flex items-center space-x-1">
                                  <Wrench className="w-3 h-3" />
                                  <span>Último Mantenimiento: {ultimoMantenimiento.fecha} — {ultimoMantenimiento.tarea}</span>
                                </p>
                              )}
                            </div>

                            {/* Control Slider de Alternancia de Extremo a Extremo con Diálogo de Confirmación */}
                            <div className="flex flex-col items-end">
                              <CuadroAlternanciaSlider
                                cuadroNombre={grupo.nombre}
                                activeSlot={activeSlot}
                                onSolicitarCambio={handleSolicitarAlternancia}
                              />
                            </div>
                          </div>

                          {/* Grilla con diseño simple y claro de las dos posiciones de bomba */}
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {slots.map(({ slotNum, label, bomba }) => {
                              if (!bomba) {
                                // Tarjeta para cuando NO HAY BOMBA ASIGNADA en este slot
                                return (
                                  <div 
                                    key={slotNum}
                                    className="rounded-xl border border-dashed border-slate-300 bg-slate-50/70 p-5 flex flex-col justify-between items-center text-center space-y-3 min-h-[190px]"
                                  >
                                    <div className="w-full flex items-center justify-between pb-2 border-b border-slate-200">
                                      <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-slate-200 text-slate-700">
                                        {label}
                                      </span>
                                      <span className="text-[10.5px] font-bold px-2 py-0.5 rounded-full bg-slate-200 text-slate-600">
                                        VACANTE
                                      </span>
                                    </div>

                                    <div className="my-auto space-y-1">
                                      <h5 className="font-bold text-sm text-slate-500">SIN BOMBA ASIGNADA</h5>
                                      <p className="text-xs text-slate-400">Posición disponible para instalación física de motobomba.</p>
                                    </div>

                                    <button
                                      type="button"
                                      onClick={() => handleAsignarBombaAPosicion(grupo.nombre, slotNum)}
                                      className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-[#0f2d59] hover:bg-[#163e75] text-white shadow-xs transition-colors"
                                    >
                                      <Plus className="w-3.5 h-3.5" />
                                      <span>Asignar Bomba a {label}</span>
                                    </button>
                                  </div>
                                );
                              }

                              const isEnUso = bomba.alternancia === 'BOMBA EN USO';

                              return (
                                <div 
                                  key={bomba.id}
                                  className={`rounded-xl border p-4 flex flex-col justify-between transition-all min-w-0 overflow-hidden ${
                                    isEnUso 
                                      ? 'bg-[#f0fdf4] border-[#86efac] shadow-sm ring-1 ring-[#86efac]/50' 
                                      : 'bg-[#fafbfc] border-slate-200 opacity-90'
                                  }`}
                                >
                                  {/* Encabezado: Posición, Tag y Estado de Bomba */}
                                  <div className="flex flex-wrap items-center justify-between pb-2.5 border-b border-slate-200/80 gap-2">
                                    <div className="flex flex-wrap items-center gap-1.5">
                                      <span className="font-mono font-black text-xs px-2.5 py-1 rounded bg-[#0f2d59] text-white tracking-wider whitespace-nowrap">
                                        {label}
                                      </span>
                                      <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-white text-[#0f2d59] border border-[#cfe0ee] whitespace-nowrap">
                                        {bomba.tagFisico || bomba.id}
                                      </span>
                                    </div>

                                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-black border flex items-center space-x-1.5 whitespace-nowrap ${
                                      isEnUso 
                                        ? 'bg-[#dcfce7] text-[#166534] border-[#4ade80] shadow-xs' 
                                        : 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]'
                                    }`}>
                                      <span className={`w-2 h-2 rounded-full ${isEnUso ? 'bg-[#16a34a] animate-pulse' : 'bg-[#ca8a04]'}`}></span>
                                      <span>{isEnUso ? 'BOMBA EN USO' : 'BOMBA EN RESERVA'}</span>
                                    </span>
                                  </div>

                                  {/* Cuerpo Central: Silueta esquemática + Nombre + Contador Contenido */}
                                  <div className="py-3.5 grid grid-cols-[80px_minmax(0,1fr)] items-center gap-2 min-w-0">
                                    {/* Silueta de la Bomba */}
                                    <div className="flex-shrink-0 flex items-center justify-center">
                                      <BombaSiluetaSimpleSVG isEnUso={isEnUso} />
                                    </div>

                                    {/* Nombre descriptivo y estado operativo */}
                                    <div className="min-w-0 pr-1">
                                      <h5 className="font-bold text-xs text-[#0f2d59] leading-snug break-words">
                                        {bomba.nombre}
                                      </h5>
                                      <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">
                                        {isEnUso ? 'Impulsor en rotación activa' : 'Equipo en stand-by programado'}
                                      </span>
                                    </div>

                                    {/* CONTADOR DE TIEMPO ACTIVO (Perfectamente contenido) */}
                                    <div className="col-span-2 flex items-center justify-between gap-2 bg-white/70 p-2 rounded-lg border border-slate-200">
                                      <span className="text-[9px] font-bold uppercase tracking-wider text-slate-500 whitespace-nowrap">
                                        Tiempo Activo de Uso
                                      </span>
                                      {isEnUso ? (
                                        <div className="bg-white px-2.5 py-1 rounded-lg border border-[#86efac] shadow-xs flex items-baseline space-x-1">
                                          <span className="font-mono font-black text-lg text-[#166534] leading-none">
                                            {bomba.diasUso || 0}
                                          </span>
                                          <span className="text-[10px] font-bold text-[#166534]">días</span>
                                        </div>
                                      ) : (
                                        <div className="bg-slate-100 px-2 py-1 rounded border border-slate-200 text-center">
                                          <span className="text-[10.5px] font-semibold text-slate-500 whitespace-nowrap">
                                            En espera (0 días)
                                          </span>
                                        </div>
                                      )}
                                    </div>
                                  </div>

                                  {/* Pie de la tarjeta: Botones Retirar Bomba y Reemplazar Bomba */}
                                  <div className="pt-2 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2">
                                    <span className="text-[10px] text-slate-400 font-medium truncate">
                                      {isEnUso ? 'Contabilizando ciclo actual' : 'Equipo en reserva'}
                                    </span>

                                    <div className="flex items-center space-x-1.5 flex-shrink-0">
                                      {/* Botón Reemplazar Bomba */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          const disponibles = bombasData.filter(b => 
                                            b.id !== bomba.id && (b.cuadro === 'EN DEPÓSITO' || b.cuadro === 'TALLER')
                                          );
                                          setReemplazarBombaModal({
                                            bombaSaliente: bomba,
                                            estadoSaliente: 'A Reparar',
                                            destinoSaliente: 'TALLER',
                                            bombaReemplazoId: disponibles.length > 0 ? disponibles[0].id : '',
                                            cuadroNombre: grupo.nombre,
                                            slotNum: slotNum,
                                            labelPos: label
                                          });
                                        }}
                                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] transition-colors shadow-2xs whitespace-nowrap"
                                        title="Reemplazar esta bomba por otra disponible"
                                      >
                                        <RotateCw className="w-3.5 h-3.5 text-[#3d7bb5]" />
                                        <span>Reemplazar</span>
                                      </button>

                                      {/* Botón Retirar Bomba */}
                                      <button
                                        type="button"
                                        onClick={() => {
                                          setRetirarBombaModal({
                                            bomba,
                                            destinoCuadro: 'EN DEPÓSITO',
                                            destinoSlot: null
                                          });
                                        }}
                                        className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 transition-colors shadow-2xs whitespace-nowrap"
                                        title="Desinstalar y reubicar este equipo"
                                      >
                                        <Trash2 className="w-3.5 h-3.5 text-rose-600" />
                                        <span>Retirar Bomba</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Subvista 2: Equipo de Bombas (EDITABLE, DATOS TÉCNICOS, RASTREO FÍSICO, HISTORIAL Y BORRADO) */}
                {bombasViewMode === 'equipos' && (
                  <div className="bg-white rounded-xl border border-[#d9e3ec] shadow-sm p-6 space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#eef4f8]">
                      <div>
                        <h3 className="font-bold text-sm text-[#0f2d59]">Parque y Equipos de Bombas del Edificio Judicial</h3>
                        <p className="text-xs text-[#526a84]">
                          Inventario técnico completo, designación patrimonial/chapa física de intendencia, posición de montaje e historial de reparaciones.
                        </p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          type="button"
                          onClick={() => handlePrintDocument('equipos_bombas_costos')}
                          className="px-3.5 py-2 bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5"
                        >
                          <Printer className="w-3.5 h-3.5 text-[#3d7bb5]" />
                          <span>Imprimir Informe con Costos</span>
                        </button>
                        <button
                          onClick={() => {
                            const newIdNum = (bombasData.length + 1).toString().padStart(2, '0');
                            const nuevaBomba = {
                              id: `BOM-${newIdNum}`,
                              tagFisico: `CFT-BOM-${newIdNum}`,
                              nombre: `Bomba N° ${newIdNum} (Nuevo Activo)`,
                              cuadro: 'EN DEPÓSITO',
                              posicionSlot: null,
                              sistema: 'Drenaje Freático',
                              ubicacion: 'Depósito Central',
                              posicionInstalacion: 'EN DEPÓSITO',
                              marca: 'Grundfos',
                              modelo: 'Modelo a Definir',
                              potencia: '2.0 HP / 1.5 kW',
                              caudal: '16 m³/h',
                              alturaManometrica: '14 mca',
                              rpm: '2800 RPM',
                              estado: 'Operativa',
                              modo: 'Automático',
                              presion: '1.2 bar',
                              consumoAmperios: '4.5 A',
                              voltaje: '220 V (Monofásico)',
                              horasUso: 0,
                              alternancia: 'BOMBA EN RESERVA',
                              ultimaInspeccion: new Date().toLocaleDateString('es-AR'),
                              tecnicoResponsable: 'Di Gregori, Ramón',
                              observaciones: 'Nueva motobomba incorporada al inventario de intendencia.',
                              reparaciones: []
                            };
                            setBombasData(prev => [...prev, nuevaBomba]);
                            handleOpenEditBomba(nuevaBomba);
                          }}
                          className="px-4 py-2 bg-[#0f2d59] hover:bg-[#153e77] text-white rounded-lg text-xs font-bold transition-colors shadow-sm flex items-center space-x-2"
                        >
                          <Plus className="w-4 h-4" />
                          <span>+ Incorporar Nueva Bomba</span>
                        </button>
                      </div>
                    </div>

                    {/* Grilla Completa de Bombas Editables con opción de Borrar */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                      {bombasData.map(bomba => (
                        <div 
                          key={bomba.id} 
                          className="p-5 rounded-xl border border-[#d9e3ec] bg-white hover:border-[#0f2d59] shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4"
                        >
                          {/* Encabezado con TAG de Rastreo y Estado Oficial */}
                          <div>
                            <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-[#eef4f8]">
                              <div>
                                <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#0f2d59] text-white">
                                  {bomba.id}
                                </span>
                                <div className="flex items-center space-x-1 mt-1 font-mono text-[10.5px] text-[#0369a1] font-bold">
                                  <Tag className="w-3 h-3" />
                                  <span>{bomba.tagFisico || 'Sin Designación'}</span>
                                </div>
                              </div>

                              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${
                                bomba.estado === 'Operativa' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' :
                                bomba.estado === 'A Reparar' ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]' :
                                'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                              }`}>
                                {bomba.estado}
                              </span>
                            </div>

                            <h4 className="font-bold text-sm text-[#0f2d59] mt-2.5 leading-snug">{bomba.nombre}</h4>
                            
                            {/* Posición de Instalación Sincronizada */}
                            <div className="p-2 mt-2 rounded-lg bg-[#f0f6fa] border border-[#cfe0ee] text-xs">
                              <div className="flex items-start space-x-1.5">
                                <MapPin className="w-3.5 h-3.5 text-red-600 flex-shrink-0 mt-0.5" />
                                <div>
                                  <span className="font-bold text-[#0f2d59] block text-[10.5px]">Posición Física de Instalación:</span>
                                  <span className="text-[#334155] font-semibold text-[11px] leading-tight block">
                                    {bomba.posicionInstalacion || bomba.ubicacion || 'Sin Ubicación'}
                                  </span>
                                </div>
                              </div>
                            </div>

                            {/* Datos Técnicos Clave */}
                            <div className="grid grid-cols-2 gap-2 mt-3 text-[11px]">
                              <div className="p-2 rounded bg-[#fbfcfe] border border-[#e8eff5]">
                                <span className="text-[9.5px] text-slate-500 uppercase block font-semibold">Marca / Modelo:</span>
                                <span className="font-bold text-slate-800 truncate block">{bomba.marca} {bomba.modelo}</span>
                              </div>
                              <div className="p-2 rounded bg-[#fbfcfe] border border-[#e8eff5]">
                                <span className="text-[9.5px] text-slate-500 uppercase block font-semibold">Potencia:</span>
                                <span className="font-bold text-slate-800 block">{bomba.potencia || '—'}</span>
                              </div>
                              <div className="p-2 rounded bg-[#fbfcfe] border border-[#e8eff5]">
                                <span className="text-[9.5px] text-slate-500 uppercase block font-semibold">Caudal / Altura:</span>
                                <span className="font-bold text-slate-800 truncate block">{bomba.caudal} / {bomba.alturaManometrica}</span>
                              </div>
                              <div className="p-2 rounded bg-[#fbfcfe] border border-[#e8eff5]">
                                <span className="text-[9.5px] text-slate-500 uppercase block font-semibold">Tensión:</span>
                                <span className="font-bold text-slate-800 truncate block">{bomba.voltaje}</span>
                              </div>
                            </div>

                            {/* Contador de Historial */}
                            <div className="mt-3 flex items-center justify-between text-xs text-[#526a84]">
                              <span className="inline-flex items-center space-x-1.5 font-semibold">
                                <History className="w-3.5 h-3.5 text-[#3d7bb5]" />
                                <span>Historial: <strong>{bomba.reparaciones?.length || 0} intervenciones</strong></span>
                              </span>
                              <span className="font-mono text-[10.5px] font-bold text-[#0f2d59]">{bomba.horasUso} hs de uso</span>
                            </div>
                          </div>

                          {/* Botón de Apertura de Ficha, Historial y Eliminar */}
                          <div className="pt-3 border-t border-[#edf2f7] flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={() => handleOpenEditBomba(bomba)}
                              className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 bg-[#0f2d59] hover:bg-[#163e75] text-white rounded-lg text-xs font-bold transition-colors shadow-xs"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>Editar Datos Técnicos e Historial</span>
                            </button>

                            <button
                              type="button"
                              onClick={() => handleDeleteBomba(bomba.id)}
                              className="p-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300 transition-colors"
                              title={`Borrar ${bomba.nombre}`}
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

            {/* VISTA NUEVA: FINANZAS E INVENTARIO */}
            {activeTab === 'finanzas' && (
              <div className="space-y-6">
                
                {/* SUBVISTA 1: INGRESOS Y EGRESOS */}
                {finanzasViewMode === 'ingresos-egresos' && (() => {
                  let totalIngresos = 0;
                  let totalEgresos = 0;
                  finanzasData.forEach(m => {
                    const val = parseMoneda(m.monto);
                    if (m.tipo === 'Ingreso') totalIngresos += val;
                    else totalEgresos += val;
                  });
                  const saldoDisponible = totalIngresos - totalEgresos;

                  const filteredFinanzas = finanzasData.filter(m => {
                    const matchTipo = filterFinanzasTipo === 'all' || m.tipo === filterFinanzasTipo;
                    const matchRubro = filterFinanzasRubro === 'all' || (m.rubro && m.rubro.includes(filterFinanzasRubro));
                    const matchProveedor = filterFinanzasProveedor === 'all' || 
                      (m.proveedorNombre && m.proveedorNombre.trim().toLowerCase() === filterFinanzasProveedor.trim().toLowerCase()) ||
                      (m.proveedorId && m.proveedorId === filterFinanzasProveedor);
                    const q = searchFinanzas.toLowerCase();
                    const matchSearch = m.concepto.toLowerCase().includes(q) ||
                      m.comprobante.toLowerCase().includes(q) ||
                      m.responsable.toLowerCase().includes(q) ||
                      (m.proveedorNombre || '').toLowerCase().includes(q) ||
                      (m.proveedorCuit || '').toLowerCase().includes(q);
                    return matchTipo && matchRubro && matchProveedor && matchSearch;
                  });

                  return (
                    <div className="space-y-6">
                      {/* Tarjetas Métricas de Finanzas */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border border-[#86efac] bg-[#f0fdf4] shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-[#166534] uppercase tracking-wide">Total Ingresos / Partidas</p>
                            <p className="text-2xl font-black text-[#166534] mt-0.5">{formatMonedaPesos(totalIngresos)}</p>
                            <span className="text-[10px] text-[#15803d] font-semibold">Fondos y asignaciones recibidas</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#dcfce7] text-[#166534] flex items-center justify-center">
                            <ArrowDownRight className="w-6 h-6 stroke-[2.5]" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/70 shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-rose-800 uppercase tracking-wide">Total Egresos / Gastos</p>
                            <p className="text-2xl font-black text-rose-700 mt-0.5">{formatMonedaPesos(totalEgresos)}</p>
                            <span className="text-[10px] text-rose-600 font-semibold">Compras, repuestos y servicios</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-rose-100 text-rose-700 flex items-center justify-center">
                            <ArrowUpRight className="w-6 h-6 stroke-[2.5]" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-[#cfe0ee] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-[#0f2d59] uppercase tracking-wide">Saldo Disponible</p>
                            <p className={`text-2xl font-black mt-0.5 ${saldoDisponible >= 0 ? 'text-[#0f2d59]' : 'text-rose-600'}`}>
                              {formatMonedaPesos(saldoDisponible)}
                            </p>
                            <span className="text-[10px] text-slate-500 font-semibold">Balance actual de intendencia</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#eef4f9] text-[#0f2d59] flex items-center justify-center">
                            <DollarSign className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      {/* BOTONES PRINCIPALES GRANDES Y DESTACADOS POR ENCIMA DE LA BÚSQUEDA */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                          type="button"
                          onClick={handleOpenIngresoModal}
                          className="flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-700 to-emerald-800 hover:from-emerald-800 hover:to-emerald-900 text-white shadow-md hover:shadow-lg transition-all active:scale-[0.99] group border border-emerald-600 text-left"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                              <ArrowDownRight className="w-7 h-7 stroke-[2.5] text-white" />
                            </div>
                            <div>
                              <span className="text-base font-extrabold tracking-tight block leading-tight">
                                Ingreso de Partidas Presupuestarias
                              </span>
                              <span className="text-xs text-emerald-100/90 font-medium block mt-0.5">
                                Habilitar fondos rotatorios, asignaciones de intendencia y partidas
                              </span>
                            </div>
                          </div>
                          <span className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-white/20 text-xs font-bold text-white border border-white/20">
                            + Asentar Ingreso
                          </span>
                        </button>

                        <button
                          type="button"
                          onClick={handleOpenEgresoModal}
                          className="flex items-center justify-between px-6 py-4 rounded-xl bg-gradient-to-r from-rose-700 to-rose-800 hover:from-rose-800 hover:to-rose-900 text-white shadow-md hover:shadow-lg transition-all active:scale-[0.99] group border border-rose-600 text-left"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                              <ArrowUpRight className="w-7 h-7 stroke-[2.5] text-white" />
                            </div>
                            <div>
                              <span className="text-base font-extrabold tracking-tight block leading-tight">
                                Egresos
                              </span>
                              <span className="text-xs text-rose-100/90 font-medium block mt-0.5">
                                Registrar compras de pañol, repuestos y facturas por reparaciones
                              </span>
                            </div>
                          </div>
                          <span className="hidden sm:inline-flex px-3 py-1.5 rounded-lg bg-white/20 text-xs font-bold text-white border border-white/20">
                            + Asentar Egreso
                          </span>
                        </button>
                      </div>

                      {/* Barra de Filtros y Búsqueda (Ahora posicionada debajo de los botones de acción) */}
                      <div className="p-3.5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                        <div className="relative flex-1 min-w-[240px]">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#7e95ad]" />
                          <input
                            type="text"
                            placeholder="Buscar por concepto, comprobante, número de expediente o responsable..."
                            value={searchFinanzas}
                            onChange={(e) => setSearchFinanzas(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none text-[#1c2d42] bg-[#fbfcfe]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={filterFinanzasTipo}
                            onChange={(e) => setFilterFinanzasTipo(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                          >
                            <option value="all">Tipo: Todos</option>
                            <option value="Ingreso">Solo Ingresos</option>
                            <option value="Egreso">Solo Egresos</option>
                          </select>

                          {/* FILTRO POR PROVEEDOR EN LA TABLA DE EGRESOS */}
                          <select
                            value={filterFinanzasProveedor}
                            onChange={(e) => setFilterFinanzasProveedor(e.target.value)}
                            className="max-w-[210px] truncate px-3 py-2 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                          >
                            <option value="all">Proveedor: Todos</option>
                            {proveedoresData.map((p) => (
                              <option key={p.id} value={p.nombre}>
                                {p.nombre}
                              </option>
                            ))}
                          </select>

                          <select
                            value={filterFinanzasRubro}
                            onChange={(e) => setFilterFinanzasRubro(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                          >
                            <option value="all">Rubro: Todos</option>
                            <option value="Partida Presupuestaria">Partida Presupuestaria</option>
                            <option value="Bombas y Motores">Bombas y Motores</option>
                            <option value="Electricidad">Electricidad</option>
                            <option value="Sanitarios">Sanitarios</option>
                            <option value="Reparaciones Mayores">Reparaciones Mayores</option>
                            <option value="Cerrajería">Cerrajería</option>
                            <option value="Albañilería">Albañilería</option>
                            <option value="Pintura">Pintura</option>
                            <option value="Caja Chica">Caja Chica</option>
                          </select>

                          {(searchFinanzas || filterFinanzasTipo !== 'all' || filterFinanzasRubro !== 'all' || filterFinanzasProveedor !== 'all') && (
                            <button
                              type="button"
                              onClick={() => {
                                setSearchFinanzas('');
                                setFilterFinanzasTipo('all');
                                setFilterFinanzasRubro('all');
                                setFilterFinanzasProveedor('all');
                              }}
                              className="px-2.5 py-2 text-xs font-medium text-slate-500 hover:text-slate-800 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                            >
                              Limpiar filtros
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Tabla de Movimientos Financieros */}
                      <div className="rounded-xl border border-[#d9e3ec] bg-white shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#f0f5fa] border-b border-[#dce5ee] text-[#0f2d59] font-bold">
                                <th className="w-20 px-3.5 py-3 whitespace-nowrap">Fecha</th>
                                <th className="w-24 px-3.5 py-3 whitespace-nowrap">Tipo</th>
                                <th className="min-w-[220px] px-3.5 py-3">Concepto / Detalle</th>
                                <th className="w-48 px-3.5 py-3">Proveedor / CUIL</th>
                                <th className="w-32 px-3.5 py-3">Rubro</th>
                                <th className="w-36 px-3.5 py-3">Comprobante</th>
                                <th className="w-28 px-3.5 py-3 text-right whitespace-nowrap">Monto</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8eff5] text-[#2c3e50]">
                              {filteredFinanzas.length > 0 ? (
                                filteredFinanzas.map((mov) => {
                                  const isIngreso = mov.tipo === 'Ingreso';
                                  return (
                                    <tr key={mov.id} className="hover:bg-[#f8fafc] transition-colors">
                                      <td className="px-3.5 py-3 font-semibold text-[#0f2d59] whitespace-nowrap">
                                        {mov.fecha}
                                      </td>
                                      <td className="px-3.5 py-3 whitespace-nowrap">
                                        <span className={`inline-flex items-center space-x-1 px-2.5 py-0.5 rounded text-[10.5px] font-bold ${
                                          isIngreso 
                                            ? 'bg-[#dcfce7] text-[#166534] border border-[#86efac]' 
                                            : 'bg-rose-50 text-rose-700 border border-rose-200'
                                        }`}>
                                          <span>{isIngreso ? '↓ Ingreso' : '↑ Egreso'}</span>
                                        </span>
                                      </td>
                                      <td className="px-3.5 py-3 font-semibold text-slate-800">
                                        <div>{mov.concepto}</div>
                                        {mov.observaciones && (
                                          <div className="text-[10.5px] text-slate-500 font-normal mt-0.5">{mov.observaciones}</div>
                                        )}
                                      </td>
                                      <td className="px-3.5 py-3">
                                        {mov.proveedorNombre ? (
                                          <div className="space-y-0.5">
                                            <span className="font-bold text-[#0f2d59] block leading-tight">
                                              {mov.proveedorNombre}
                                            </span>
                                            {mov.proveedorCuit && (
                                              <span className="font-mono text-[10px] text-slate-500 font-semibold block">
                                                CUIL/CUIT: {mov.proveedorCuit}
                                              </span>
                                            )}
                                            {mov.proveedorTelefono && (
                                              <span className="text-[10px] text-slate-500 block">
                                                Tel: {mov.proveedorTelefono}
                                              </span>
                                            )}
                                          </div>
                                        ) : (
                                          <span className="text-slate-400 font-mono text-[11px]">—</span>
                                        )}
                                      </td>
                                      <td className="px-3.5 py-3 text-[#384c63] font-medium">
                                        {mov.rubro}
                                      </td>
                                      <td className="px-3.5 py-3 font-mono text-[11px] text-[#0369a1]">
                                        {mov.comprobante || '—'}
                                      </td>
                                      <td className={`px-3.5 py-3 text-right font-mono font-bold whitespace-nowrap ${
                                        isIngreso ? 'text-[#166534]' : 'text-rose-700'
                                      }`}>
                                        {mov.monto}
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan="7" className="px-4 py-8 text-center text-[#6b8299]">
                                    No se encontraron movimientos registrados con los filtros aplicados.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* SUBVISTA 2: INVENTARIO Y PAÑOL DE MATERIALES (RESTAURADO COMPLETO) */}
                {finanzasViewMode === 'inventario' && (() => {
                  const totalArticulos = inventarioData.length;
                  const criticos = inventarioData.filter(a => a.stockActual <= a.stockMinimo).length;
                  const valorTotalStock = inventarioData.reduce((acc, art) => {
                    const costoNum = parseMoneda(art.costoUnitario);
                    return acc + (costoNum * (art.stockActual || 0));
                  }, 0);

                  const filteredInventario = inventarioData.filter(art => {
                    const matchCat = filterInventarioCategoria === 'all' || art.categoria === filterInventarioCategoria;
                    const q = searchInventario.toLowerCase().trim();
                    const matchQuery = !q ||
                      art.codigo.toLowerCase().includes(q) ||
                      art.descripcion.toLowerCase().includes(q) ||
                      art.ubicacion.toLowerCase().includes(q) ||
                      art.categoria.toLowerCase().includes(q);
                    return matchCat && matchQuery;
                  });

                  return (
                    <div className="space-y-6 animate-in fade-in duration-150">
                      
                      {/* Tarjetas Métricas de Pañol */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl border border-[#cfe0ee] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-[#0f2d59] uppercase tracking-wide">Total de Artículos en Pañol</p>
                            <p className="text-2xl font-black text-[#0f2d59] mt-0.5">{totalArticulos}</p>
                            <span className="text-[10px] text-slate-500 font-semibold">Repuestos y materiales inventariados</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#eef4f9] text-[#0f2d59] flex items-center justify-center">
                            <Boxes className="w-6 h-6" />
                          </div>
                        </div>

                        <div className={`p-4 rounded-xl border shadow-sm flex items-center justify-between ${
                          criticos > 0 ? 'border-amber-300 bg-amber-50/70' : 'border-[#86efac] bg-[#f0fdf4]'
                        }`}>
                          <div>
                            <p className="text-[11px] font-bold text-amber-900 uppercase tracking-wide">Stock Bajo / Crítico</p>
                            <p className={`text-2xl font-black mt-0.5 ${criticos > 0 ? 'text-amber-800' : 'text-[#166534]'}`}>
                              {criticos}
                            </p>
                            <span className="text-[10px] text-amber-700 font-semibold">
                              {criticos > 0 ? 'Artículos en o bajo nivel mínimo' : 'Existencias en nivel seguro'}
                            </span>
                          </div>
                          <div className={`w-11 h-11 rounded-lg flex items-center justify-center ${
                            criticos > 0 ? 'bg-amber-100 text-amber-800 animate-pulse' : 'bg-[#dcfce7] text-[#166534]'
                          }`}>
                            <AlertTriangle className="w-6 h-6" />
                          </div>
                        </div>

                        <div className="p-4 rounded-xl border border-[#86efac] bg-[#f0fdf4] shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[11px] font-bold text-[#166534] uppercase tracking-wide">Valorización Estimada de Pañol</p>
                            <p className="text-2xl font-black text-[#166534] mt-0.5">{formatMonedaPesos(valorTotalStock)}</p>
                            <span className="text-[10px] text-[#15803d] font-semibold">Valuación monetaria total en existencia</span>
                          </div>
                          <div className="w-11 h-11 rounded-lg bg-[#dcfce7] text-[#166534] flex items-center justify-center">
                            <DollarSign className="w-6 h-6" />
                          </div>
                        </div>
                      </div>

                      {/* Barra de Filtros, Búsqueda y Botón de Incorporación / Reposición */}
                      <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                        <div className="relative flex-1 min-w-[240px]">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Buscar en pañol por código, nombre de repuesto, categoría o estante..."
                            value={searchInventario}
                            onChange={(e) => setSearchInventario(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#0f2d59] outline-none text-slate-800 bg-[#fbfcfe]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            value={filterInventarioCategoria}
                            onChange={(e) => setFilterInventarioCategoria(e.target.value)}
                            className="max-w-[220px] truncate px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:border-[#0f2d59] outline-none"
                          >
                            <option value="all">Categoría: Todas ({totalArticulos})</option>
                            {inventarioCategorias.map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              setInventarioModalMode('reposicion');
                              setReposicionData({
                                articuloId: inventarioData[0]?.id || '',
                                cantidadSumar: 0,
                                nuevoCostoUnitario: inventarioData[0]?.costoUnitario.replace(/[\$\s]/g, '') || '',
                                comprobanteEgresoId: '',
                                comprobanteRef: '',
                                filtroRubro: 'all',
                                busquedaTexto: ''
                              });
                              setIsInventarioModalOpen(true);
                            }}
                            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                          >
                            <Plus className="w-4 h-4" />
                            <span>+ Incorporar Artículo / Reposición</span>
                          </button>
                        </div>
                      </div>

                      {/* Tabla del Catálogo de Inventario y Pañol */}
                      <div className="rounded-xl border border-[#d9e3ec] bg-white shadow-sm overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[1050px] text-left text-xs border-collapse">
                            <thead>
                              <tr className="bg-[#f0f5fa] border-b border-[#dce5ee] text-[#0f2d59] font-bold">
                                <th className="w-32 px-4 py-3 whitespace-nowrap">Código / Tag</th>
                                <th className="min-w-[260px] px-4 py-3">Descripción del Material / Repuesto</th>
                                <th className="w-36 px-4 py-3">Categoría</th>
                                <th className="min-w-[220px] px-4 py-3">Ubicación en Pañol</th>
                                <th className="w-24 px-4 py-3 text-center whitespace-nowrap">Mínimo</th>
                                <th className="w-40 px-4 py-3 text-center whitespace-nowrap">Stock Actual</th>
                                <th className="w-32 px-4 py-3 text-right whitespace-nowrap">Último Costo</th>
                                <th className="w-28 px-4 py-3 text-right whitespace-nowrap">Acción</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#e8eff5] text-slate-800">
                              {filteredInventario.length > 0 ? (
                                filteredInventario.map((art) => {
                                  const isLowStock = art.stockActual <= art.stockMinimo;
                                  return (
                                    <tr key={art.id} className="hover:bg-[#f8fafc] transition-colors">
                                      <td className="px-4 py-3 font-mono font-bold text-[#0f2d59] whitespace-nowrap">
                                        {art.codigo}
                                      </td>
                                      <td className="px-4 py-3 font-semibold text-slate-900">
                                        <div>{art.descripcion}</div>
                                        {art.comprobanteRef && (
                                          <span className="text-[10px] font-mono text-[#0369a1] bg-[#e0f2fe] px-1.5 py-0.2 rounded inline-block mt-0.5">
                                            Última ref: {art.comprobanteRef}
                                          </span>
                                        )}
                                      </td>
                                      <td className="px-4 py-3">
                                        <span className="px-2.5 py-0.5 rounded-full text-[10.5px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                                          {art.categoria}
                                        </span>
                                      </td>
                                      <td className="px-4 py-3 text-slate-600 font-medium">
                                        <div className="flex items-center space-x-1.5">
                                          <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                          <span className="truncate">{art.ubicacion}</span>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-center font-mono font-semibold text-slate-600">
                                        {art.stockMinimo} {art.unidad}
                                      </td>
                                      <td className="px-4 py-3 text-center">
                                        <div className="inline-flex items-center space-x-2">
                                          {/* Controles rápidos de ajuste rápido de stock */}
                                          <button
                                            type="button"
                                            onClick={() => handleAdjustStock(art.id, -1)}
                                            className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer select-none"
                                            title="Descontar 1 unidad"
                                          >
                                            -
                                          </button>
                                          <span className={`px-2.5 py-0.5 rounded-full font-mono font-black text-xs border ${
                                            isLowStock
                                              ? 'bg-amber-100 text-amber-900 border-amber-300'
                                              : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                                          }`}>
                                            {art.stockActual} {art.unidad}
                                          </span>
                                          <button
                                            type="button"
                                            onClick={() => handleAdjustStock(art.id, 1)}
                                            className="w-6 h-6 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold flex items-center justify-center transition-colors cursor-pointer select-none"
                                            title="Sumar 1 unidad"
                                          >
                                            +
                                          </button>
                                        </div>
                                      </td>
                                      <td className="px-4 py-3 text-right font-mono font-bold text-[#166534] whitespace-nowrap">
                                        {art.costoUnitario}
                                      </td>
                                      <td className="px-4 py-3 text-right whitespace-nowrap">
                                        <button
                                          type="button"
                                          onClick={() => {
                                            setInventarioModalMode('reposicion');
                                            setReposicionData({
                                              articuloId: art.id,
                                              cantidadSumar: 0,
                                              nuevoCostoUnitario: art.costoUnitario.replace(/[\$\s]/g, ''),
                                              comprobanteEgresoId: '',
                                              comprobanteRef: '',
                                              filtroRubro: art.categoria,
                                              busquedaTexto: art.codigo
                                            });
                                            setIsInventarioModalOpen(true);
                                          }}
                                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-[11px] font-bold shadow-2xs transition-colors cursor-pointer"
                                          title={`Reponer stock para ${art.codigo}`}
                                        >
                                          <RotateCw className="w-3 h-3" />
                                          <span>Reponer</span>
                                        </button>
                                      </td>
                                    </tr>
                                  );
                                })
                              ) : (
                                <tr>
                                  <td colSpan="8" className="px-4 py-8 text-center text-slate-400">
                                    No se encontraron artículos en pañol que coincidan con la búsqueda.
                                  </td>
                                </tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* SUBVISTA 3: FACTURACIÓN DE SERVICIOS CONTRATADOS */}
                {finanzasViewMode === 'facturacion-servicios' && (() => {
                  const providerFilter = proveedoresData.find(proveedor => proveedor.id === filterFacturaProveedor);
                  const serviceRows = facturasServicios.map(factura => ({
                    id: factura.id,
                    fecha: factura.fecha,
                    proveedorId: factura.proveedorId,
                    proveedorNombre: factura.proveedorNombre,
                    registro: 'Servicio contratado',
                    rubro: factura.etiquetaServicio,
                    documento: factura.numeroFactura,
                    monto: factura.monto,
                    detalle: factura.periodo || factura.observaciones,
                    estado: factura.estado,
                    facturaServicio: true
                  }));
                  const expenseRows = finanzasData
                    .filter(movimiento => movimiento.tipo === 'Egreso' && !movimiento.facturaServicioId && (movimiento.proveedorId || movimiento.proveedorNombre))
                    .map(movimiento => ({
                      id: movimiento.id,
                      fecha: movimiento.fecha,
                      proveedorId: movimiento.proveedorId || '',
                      proveedorNombre: movimiento.proveedorNombre || 'Proveedor no identificado',
                      registro: 'Egreso',
                      rubro: movimiento.rubro || 'Sin rubro',
                      documento: movimiento.comprobante || movimiento.id,
                      monto: movimiento.monto,
                      detalle: movimiento.concepto || movimiento.observaciones || '',
                      estado: 'Imputado',
                      facturaServicio: false
                    }));
                  const filteredBillingRows = [...serviceRows, ...expenseRows].filter(row => {
                    const matchProvider = filterFacturaProveedor === 'all' ||
                      row.proveedorId === filterFacturaProveedor ||
                      row.proveedorNombre.toLowerCase() === (providerFilter?.nombre || '').toLowerCase();
                    const matchService = filterFacturaServicio === 'all' || row.rubro === filterFacturaServicio;
                    const query = searchFacturacion.toLowerCase().trim();
                    const matchSearch = !query || [
                      row.proveedorNombre,
                      row.rubro,
                      row.documento,
                      row.detalle
                    ].join(' ').toLowerCase().includes(query);
                    return matchProvider && matchService && matchSearch;
                  });
                  const totalFacturado = facturasServicios.reduce((total, factura) => total + parseMoneda(factura.monto), 0);
                  const facturasPendientes = facturasServicios.filter(factura => factura.estado === 'Pendiente').length;

                  return (
                    <div className="space-y-5 animate-in fade-in duration-150">
                      <div className="flex flex-col gap-3 border border-[#d9e3ec] bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f2d59] text-white">
                            <FileCheck className="h-5 w-5 text-emerald-300" />
                          </div>
                          <div>
                            <h3 className="text-sm font-extrabold text-[#0f2d59]">Facturación de Servicios Contratados</h3>
                            <p className="mt-0.5 text-xs text-[#526a84]">Registro de facturas vinculado al padrón de proveedores y al módulo de egresos.</p>
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <button
                            type="button"
                            onClick={() => setIsServiceLabelManagerOpen(open => !open)}
                            className="inline-flex items-center gap-1.5 border border-[#cfe0ee] bg-[#eef4f9] px-3 py-2 text-xs font-bold text-[#0f2d59] hover:bg-[#dfeaf4]"
                          >
                            <Tag className="h-4 w-4" />
                            Etiquetas de servicios
                          </button>
                          <button
                            type="button"
                            onClick={() => handleOpenServiceInvoiceForm(filterFacturaProveedor === 'all' ? '' : filterFacturaProveedor)}
                            className="inline-flex items-center gap-1.5 bg-[#0f2d59] px-3.5 py-2 text-xs font-bold text-white hover:bg-[#163e75]"
                          >
                            <Plus className="h-4 w-4" />
                            Registrar factura
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="border border-[#cfe0ee] bg-white p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-[#526a84]">Facturas de servicios</p>
                          <p className="mt-1 text-2xl font-black text-[#0f2d59]">{facturasServicios.length}</p>
                        </div>
                        <div className="border border-rose-200 bg-rose-50/60 p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-rose-800">Total facturado</p>
                          <p className="mt-1 text-2xl font-black text-rose-700">{formatMonedaPesos(totalFacturado)}</p>
                        </div>
                        <div className="border border-amber-200 bg-amber-50/60 p-4">
                          <p className="text-[10px] font-bold uppercase tracking-wide text-amber-900">Pendientes de pago</p>
                          <p className="mt-1 text-2xl font-black text-amber-800">{facturasPendientes}</p>
                        </div>
                      </div>

                      {isServiceLabelManagerOpen && (
                        <section className="space-y-3 border border-[#d9e3ec] bg-white p-4 shadow-sm">
                          <div>
                            <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#0f2d59]">Etiquetas de servicios</h4>
                            <p className="mt-1 text-[11px] text-slate-500">Administrá los rubros disponibles para clasificar facturas.</p>
                          </div>
                          <div className="flex flex-col gap-2 sm:flex-row">
                            <input
                              value={newServiceLabel}
                              onChange={e => setNewServiceLabel(e.target.value)}
                              onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleAddServiceLabel(); } }}
                              placeholder="Nueva etiqueta de servicio"
                              aria-label="Nueva etiqueta de servicio"
                              className="min-w-0 flex-1 border border-slate-300 bg-[#fbfcfe] px-3 py-2 text-xs outline-none focus:border-[#0f2d59]"
                            />
                            <button
                              type="button"
                              onClick={handleAddServiceLabel}
                              className="inline-flex items-center justify-center gap-1.5 bg-[#0f2d59] px-3 py-2 text-xs font-bold text-white hover:bg-[#163e75]"
                            >
                              <Plus className="h-4 w-4" /> Agregar etiqueta
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {etiquetasServicios.map(label => (
                              <span key={label} className="inline-flex items-center gap-2 border border-[#cfe0ee] bg-[#f0f6fa] px-2.5 py-1 text-[11px] font-semibold text-[#0f2d59]">
                                {label}
                                <button type="button" onClick={() => handleRemoveServiceLabel(label)} aria-label={`Eliminar etiqueta ${label}`} className="text-slate-500 hover:text-rose-700">
                                  <X className="h-3.5 w-3.5" />
                                </button>
                              </span>
                            ))}
                          </div>
                        </section>
                      )}

                      {isServiceInvoiceFormOpen && (
                        <form
                          onSubmit={e => { e.preventDefault(); handleSaveServiceInvoice(); }}
                          className="space-y-4 border border-emerald-200 bg-white p-5 shadow-sm"
                        >
                          <div className="flex items-start justify-between gap-3 border-b border-slate-200 pb-3">
                            <div>
                              <h4 className="text-sm font-extrabold text-[#0f2d59]">Registrar factura de servicio</h4>
                              <p className="mt-1 text-[11px] text-slate-500">El importe se asentará también como egreso vinculado al proveedor.</p>
                            </div>
                            <button type="button" onClick={() => setIsServiceInvoiceFormOpen(false)} aria-label="Cerrar formulario" className="p-1 text-slate-500 hover:bg-slate-100">
                              <X className="h-4 w-4" />
                            </button>
                          </div>

                          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            <label className="text-[11px] font-bold text-slate-700">
                              Proveedor *
                              <select
                                required
                                value={facturaServicioForm.proveedorId}
                                onChange={e => setFacturaServicioForm(prev => ({ ...prev, proveedorId: e.target.value }))}
                                className="mt-1 block w-full border border-slate-300 bg-white px-3 py-2 text-xs font-normal"
                              >
                                <option value="">Seleccionar proveedor</option>
                                {proveedoresData.map(proveedor => <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)}
                              </select>
                            </label>
                            <label className="text-[11px] font-bold text-slate-700">
                              Etiqueta de servicio *
                              <select
                                required
                                value={facturaServicioForm.etiquetaServicio}
                                onChange={e => setFacturaServicioForm(prev => ({ ...prev, etiquetaServicio: e.target.value }))}
                                className="mt-1 block w-full border border-slate-300 bg-white px-3 py-2 text-xs font-normal"
                              >
                                <option value="">Seleccionar rubro</option>
                                {etiquetasServicios.map(label => <option key={label} value={label}>{label}</option>)}
                              </select>
                            </label>
                            <label className="text-[11px] font-bold text-slate-700">
                              Número de factura *
                              <input required value={facturaServicioForm.numeroFactura} onChange={e => setFacturaServicioForm(prev => ({ ...prev, numeroFactura: e.target.value }))} placeholder="Factura A 0001-00000000" className="mt-1 block w-full border border-slate-300 bg-[#fbfcfe] px-3 py-2 text-xs font-normal" />
                            </label>
                            <label className="text-[11px] font-bold text-slate-700">
                              Fecha de emisión *
                              <input required type="date" value={facturaServicioForm.fecha} onChange={e => setFacturaServicioForm(prev => ({ ...prev, fecha: e.target.value }))} className="mt-1 block w-full border border-slate-300 bg-white px-3 py-2 text-xs font-normal" />
                            </label>
                            <label className="text-[11px] font-bold text-slate-700">
                              Período del servicio
                              <input value={facturaServicioForm.periodo} onChange={e => setFacturaServicioForm(prev => ({ ...prev, periodo: e.target.value }))} placeholder="Ej.: Noviembre 2026" className="mt-1 block w-full border border-slate-300 bg-[#fbfcfe] px-3 py-2 text-xs font-normal" />
                            </label>
                            <label className="text-[11px] font-bold text-slate-700">
                              Importe (ARS) *
                              <input required inputMode="decimal" value={facturaServicioForm.monto} onChange={e => setFacturaServicioForm(prev => ({ ...prev, monto: formatMonedaInput(e.target.value) }))} placeholder="0,00" className="mt-1 block w-full border border-slate-300 bg-[#fbfcfe] px-3 py-2 text-xs font-normal" />
                            </label>
                            <label className="text-[11px] font-bold text-slate-700 sm:col-span-2 lg:col-span-3">
                              Observaciones
                              <textarea value={facturaServicioForm.observaciones} onChange={e => setFacturaServicioForm(prev => ({ ...prev, observaciones: e.target.value }))} rows={2} placeholder="Detalle del servicio, contrato o certificación" className="mt-1 block w-full resize-y border border-slate-300 bg-[#fbfcfe] px-3 py-2 text-xs font-normal" />
                            </label>
                          </div>

                          <div className="flex justify-end gap-2 border-t border-slate-200 pt-3">
                            <button type="button" onClick={() => setIsServiceInvoiceFormOpen(false)} className="px-3 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100">Cancelar</button>
                            <button type="submit" className="inline-flex items-center gap-1.5 bg-[#0f2d59] px-4 py-2 text-xs font-bold text-white hover:bg-[#163e75]">
                              <Save className="h-4 w-4" /> Guardar factura y egreso
                            </button>
                          </div>
                        </form>
                      )}

                      <div className="flex flex-col gap-3 border border-[#d9e3ec] bg-white p-4 shadow-sm lg:flex-row lg:items-end lg:justify-between">
                        <div>
                          <h4 className="text-xs font-extrabold uppercase tracking-wide text-[#0f2d59]">
                            {providerFilter ? `Historial de ${providerFilter.nombre}` : 'Historial de facturación y egresos por proveedor'}
                          </h4>
                          <p className="mt-1 text-[11px] text-slate-500">Las facturas de servicios ya están imputadas en Finanzas como egresos y se muestran una sola vez.</p>
                        </div>
                        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                          <select value={filterFacturaProveedor} onChange={e => setFilterFacturaProveedor(e.target.value)} aria-label="Filtrar historial por proveedor" className="border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700">
                            <option value="all">Todos los proveedores</option>
                            {proveedoresData.map(proveedor => <option key={proveedor.id} value={proveedor.id}>{proveedor.nombre}</option>)}
                          </select>
                          <select value={filterFacturaServicio} onChange={e => setFilterFacturaServicio(e.target.value)} aria-label="Filtrar historial por rubro de servicio" className="border border-slate-300 bg-white px-3 py-2 text-xs text-slate-700">
                            <option value="all">Todos los rubros</option>
                            {etiquetasServicios.map(label => <option key={label} value={label}>{label}</option>)}
                          </select>
                          <input value={searchFacturacion} onChange={e => setSearchFacturacion(e.target.value)} aria-label="Buscar en historial de facturación" placeholder="Buscar factura o concepto" className="border border-slate-300 bg-[#fbfcfe] px-3 py-2 text-xs" />
                        </div>
                      </div>

                      <div className="overflow-hidden border border-[#d9e3ec] bg-white shadow-sm">
                        <div className="overflow-x-auto">
                          <table className="w-full min-w-[850px] border-collapse text-left text-xs">
                            <thead className="border-b border-[#1e447b] bg-[#0f2d59] text-white">
                              <tr>
                                <th className="px-3 py-2">Fecha</th>
                                <th className="px-3 py-2">Proveedor</th>
                                <th className="px-3 py-2">Registro</th>
                                <th className="px-3 py-2">Rubro / Servicio</th>
                                <th className="px-3 py-2">Factura / Comprobante</th>
                                <th className="px-3 py-2">Detalle / Período</th>
                                <th className="px-3 py-2 text-right">Monto</th>
                                <th className="px-3 py-2">Estado</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                              {filteredBillingRows.length > 0 ? filteredBillingRows.map(row => (
                                <tr key={`${row.facturaServicio ? 'service' : 'expense'}-${row.id}`} className="hover:bg-[#f8fafc]">
                                  <td className="whitespace-nowrap px-3 py-2 font-mono text-slate-600">{row.fecha}</td>
                                  <td className="px-3 py-2 font-semibold text-slate-800">{row.proveedorNombre}</td>
                                  <td className="px-3 py-2">
                                    <span className={`border px-2 py-0.5 text-[10px] font-bold ${row.facturaServicio ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
                                      {row.registro}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2 text-slate-700">{row.rubro}</td>
                                  <td className="px-3 py-2 font-mono text-[#0f2d59]">{row.documento || '—'}</td>
                                  <td className="max-w-[220px] px-3 py-2 text-slate-600">{row.detalle || '—'}</td>
                                  <td className="whitespace-nowrap px-3 py-2 text-right font-mono font-bold text-rose-700">{row.monto}</td>
                                  <td className="px-3 py-2">
                                    {row.facturaServicio ? (
                                      <select aria-label={`Estado ${row.documento}`} value={row.estado} onChange={e => setFacturasServicios(prev => prev.map(factura => factura.id === row.id ? { ...factura, estado: e.target.value } : factura))} className="border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold text-slate-700">
                                        <option value="Pendiente">Pendiente</option>
                                        <option value="Pagada">Pagada</option>
                                      </select>
                                    ) : (
                                      <span className="text-[10px] font-semibold text-slate-500">Egreso imputado</span>
                                    )}
                                  </td>
                                </tr>
                              )) : (
                                <tr><td colSpan="8" className="px-4 py-10 text-center text-slate-500">No hay facturas o egresos que coincidan con los filtros.</td></tr>
                              )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  );
                })()}

                {/* SUBVISTA 4: PADRÓN Y GESTIÓN DE PROVEEDORES */}
                {finanzasViewMode === 'proveedores' && (() => {
                  const filteredProveedores = proveedoresData.filter(prov => {
                    const matchCat = filterProveedorCategoria === 'all' || prov.categoria === filterProveedorCategoria;
                    const q = searchProveedor.toLowerCase().trim();
                    const matchQuery = !q ||
                      prov.nombre.toLowerCase().includes(q) ||
                      prov.cuit.toLowerCase().includes(q) ||
                      prov.contacto.toLowerCase().includes(q) ||
                      prov.direccion.toLowerCase().includes(q) ||
                      (prov.expteContrato || '').toLowerCase().includes(q);
                    return matchCat && matchQuery;
                  });

                  return (
                    <div className="space-y-6 animate-in fade-in duration-150">
                      
                      {/* Tarjetas Métricas de Proveedores */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
                        <div className="p-3.5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[10.5px] font-bold text-[#526a84] uppercase tracking-wide">Total Proveedores</p>
                            <p className="text-xl font-black text-[#0f2d59] mt-0.5">{proveedoresData.length}</p>
                            <span className="text-[9.5px] text-slate-500">Padrón oficial activo</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-[#eef4f9] text-[#0f2d59] flex items-center justify-center">
                            <Truck className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-sky-200 bg-sky-50/60 shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[10.5px] font-bold text-sky-900 uppercase tracking-wide">Climatización HVAC</p>
                            <p className="text-xl font-black text-sky-800 mt-0.5">
                              {proveedoresData.filter(p => p.categoria === 'Empresas conservadoras de Aire Acondicionado').length}
                            </p>
                            <span className="text-[9.5px] text-sky-700">VRF y Chillers</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-sky-100 text-sky-700 flex items-center justify-center">
                            <Flame className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-purple-200 bg-purple-50/60 shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[10.5px] font-bold text-purple-900 uppercase tracking-wide">Ascensores</p>
                            <p className="text-xl font-black text-purple-800 mt-0.5">
                              {proveedoresData.filter(p => p.categoria === 'Conservadora de ascensor').length}
                            </p>
                            <span className="text-[9.5px] text-purple-700">Transporte vertical</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
                            <Building2 className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/60 shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[10.5px] font-bold text-amber-900 uppercase tracking-wide">Control Plagas</p>
                            <p className="text-xl font-black text-amber-800 mt-0.5">
                              {proveedoresData.filter(p => p.categoria === 'Servicio de desratizacion y desinfeccion').length}
                            </p>
                            <span className="text-[9.5px] text-amber-700">Desinfección</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center">
                            <ShieldCheck className="w-5 h-5" />
                          </div>
                        </div>

                        <div className="p-3.5 rounded-xl border border-emerald-200 bg-emerald-50/60 shadow-sm flex items-center justify-between">
                          <div>
                            <p className="text-[10.5px] font-bold text-emerald-900 uppercase tracking-wide">Limpieza e Insumos</p>
                            <p className="text-xl font-black text-emerald-800 mt-0.5">
                              {proveedoresData.filter(p => p.categoria === 'Empresas de limpieza' || p.categoria === 'Proveedores de bienes e insumos').length}
                            </p>
                            <span className="text-[9.5px] text-emerald-700">Maestranza y pañol</span>
                          </div>
                          <div className="w-9 h-9 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
                            <Boxes className="w-5 h-5" />
                          </div>
                        </div>
                      </div>

                      {/* Barra de Filtros, Búsqueda y Botón para Incorporar Proveedor */}
                      <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                        <div className="relative flex-1 min-w-[240px]">
                          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input
                            type="text"
                            placeholder="Buscar por razón social, CUIT, contacto, dirección o expediente..."
                            value={searchProveedor}
                            onChange={(e) => setSearchProveedor(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#0f2d59] outline-none text-slate-800 bg-[#fbfcfe]"
                          />
                        </div>

                        <div className="flex flex-wrap items-center gap-2">
                          <select
                            aria-label="Filtrar proveedores por rubro"
                            value={filterProveedorCategoria}
                            onChange={(e) => setFilterProveedorCategoria(e.target.value)}
                            className="max-w-[260px] truncate px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:border-[#0f2d59] outline-none"
                          >
                            <option value="all">Todos los rubros ({proveedoresData.length})</option>
                            {proveedoresCategorias.map((cat, idx) => (
                              <option key={idx} value={cat}>{cat}</option>
                            ))}
                          </select>

                          <button
                            type="button"
                            onClick={() => {
                              handlePrintDocument('proveedores', {
                                filteredProveedores,
                                categoriaFiltro: filterProveedorCategoria,
                                busquedaFiltro: searchProveedor
                              });
                            }}
                            className="inline-flex items-center space-x-1.5 px-3.5 py-2 rounded-xl bg-white hover:bg-[#eef4f9] text-[#0f2d59] border border-[#cfe0ee] text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                            title="Imprimir el informe de proveedores filtrado por rubro en formato oficial A4 apaisado"
                          >
                            <Printer className="w-4 h-4 text-[#3d7bb5]" />
                            <span>Imprimir Informe ({filteredProveedores.length})</span>
                          </button>

                          <button
                            type="button"
                            onClick={handleOpenNewProveedor}
                            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-all shadow-xs cursor-pointer whitespace-nowrap"
                          >
                            <Plus className="w-4 h-4" />
                            <span>+ Incorporar Proveedor</span>
                          </button>
                        </div>
                      </div>

                      {/* Grilla / Listado de Proveedores con Ficha Completa */}
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredProveedores.length > 0 ? (
                          filteredProveedores.map((prov) => {
                            const serviceHistory = facturasServicios
                              .filter(factura => factura.proveedorId === prov.id)
                              .map(factura => ({
                                id: factura.id,
                                fecha: factura.fecha,
                                documento: factura.numeroFactura,
                                rubro: factura.etiquetaServicio,
                                detalle: factura.periodo || factura.observaciones || 'Servicio contratado',
                                monto: factura.monto,
                                tipo: 'Servicio contratado',
                                estado: factura.estado
                              }));
                            const expenseHistory = finanzasData
                              .filter(movimiento => movimiento.tipo === 'Egreso' && !movimiento.facturaServicioId && (
                                movimiento.proveedorId === prov.id ||
                                (movimiento.proveedorNombre || '').trim().toLowerCase() === prov.nombre.trim().toLowerCase()
                              ))
                              .map(movimiento => ({
                                id: movimiento.id,
                                fecha: movimiento.fecha,
                                documento: movimiento.comprobante || movimiento.id,
                                rubro: movimiento.rubro || 'Egreso',
                                detalle: movimiento.concepto || movimiento.observaciones || 'Egreso registrado',
                                monto: movimiento.monto,
                                tipo: 'Egreso',
                                estado: 'Imputado'
                              }));
                            const providerHistory = [...serviceHistory, ...expenseHistory].sort((first, second) => {
                              const toTimestamp = value => {
                                const parts = String(value || '').split('/');
                                if (parts.length === 3) return new Date(Number(parts[2]), Number(parts[1]) - 1, Number(parts[0])).getTime();
                                const timestamp = new Date(value || 0).getTime();
                                return Number.isNaN(timestamp) ? 0 : timestamp;
                              };
                              return toTimestamp(second.fecha) - toTimestamp(first.fecha);
                            });
                            const badgeColor =
                              prov.categoria === 'Empresas conservadoras de Aire Acondicionado' ? 'bg-sky-100 text-sky-800 border-sky-200' :
                              prov.categoria === 'Conservadora de ascensor' ? 'bg-purple-100 text-purple-800 border-purple-200' :
                              prov.categoria === 'Servicio de desratizacion y desinfeccion' ? 'bg-amber-100 text-amber-800 border-amber-200' :
                              prov.categoria === 'Empresas de limpieza' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                              'bg-blue-100 text-blue-800 border-blue-200';

                            return (
                              <div
                                key={prov.id}
                                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-[#0f2d59] hover:shadow-md transition-all flex flex-col justify-between space-y-3"
                              >
                                <div>
                                  <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
                                    <span className="font-mono font-bold text-[10.5px] px-2 py-0.5 rounded bg-[#eef4f9] text-[#0f2d59] border border-[#cfe0ee]">
                                      {prov.id}
                                    </span>
                                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border truncate max-w-[210px] ${badgeColor}`}>
                                      {prov.categoria}
                                    </span>
                                  </div>

                                  <h4 className="font-bold text-sm text-[#0f2d59] mt-2 leading-snug">
                                    {prov.nombre}
                                  </h4>

                                  <div className="mt-2.5 space-y-1.5 text-xs text-slate-700">
                                    <div className="flex items-center space-x-1.5 font-mono text-[11px] text-slate-600">
                                      <span className="font-bold text-slate-500">CUIT/CUIL:</span>
                                      <strong className="text-slate-800">{prov.cuit || 'Sin CUIT'}</strong>
                                    </div>

                                    {prov.contacto && (
                                      <div className="flex items-center space-x-1.5 text-[11.5px]">
                                        <Users className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                        <span>Contacto: <strong>{prov.contacto}</strong></span>
                                      </div>
                                    )}

                                    {prov.telefono && (
                                      <div className="flex items-center space-x-1.5 text-[11.5px]">
                                        <Phone className="w-3.5 h-3.5 text-emerald-600 flex-shrink-0" />
                                        <span className="font-semibold text-slate-800">{prov.telefono}</span>
                                      </div>
                                    )}

                                    {prov.email && (
                                      <div className="flex items-center space-x-1.5 text-[11.5px] truncate">
                                        <span className="text-slate-400">@</span>
                                        <span className="text-[#0369a1] font-medium truncate">{prov.email}</span>
                                      </div>
                                    )}

                                    {prov.direccion && (
                                      <div className="flex items-center space-x-1.5 text-[11px] text-slate-500">
                                        <MapPin className="w-3.5 h-3.5 text-rose-500 flex-shrink-0" />
                                        <span className="truncate">{prov.direccion}</span>
                                      </div>
                                    )}

                                    <div className="mt-3 overflow-hidden border border-[#d9e3ec] bg-white">
                                      <div className="flex items-center justify-between gap-2 border-b border-[#d9e3ec] bg-[#f0f6fa] px-2.5 py-2">
                                        <span className="text-[10px] font-extrabold uppercase tracking-wide text-[#0f2d59]">
                                          Historial de facturación y egresos ({providerHistory.length})
                                        </span>
                                      </div>
                                      <div className="max-h-40 divide-y divide-slate-100 overflow-y-auto">
                                        {providerHistory.length > 0 ? providerHistory.map(item => (
                                          <div key={`${item.tipo}-${item.id}`} className="grid grid-cols-[minmax(0,1fr)_auto] items-start gap-2 px-2.5 py-2 text-[10px]">
                                            <div className="min-w-0">
                                              <div className="flex flex-wrap items-center gap-1.5">
                                                <span className={`border px-1.5 py-0.5 text-[8px] font-extrabold uppercase ${item.tipo === 'Servicio contratado' ? 'border-emerald-200 bg-emerald-50 text-emerald-800' : 'border-rose-200 bg-rose-50 text-rose-800'}`}>
                                                  {item.tipo}
                                                </span>
                                                <span className="font-mono text-slate-500">{item.fecha}</span>
                                                <span className="truncate font-mono font-bold text-[#0f2d59]">{item.documento}</span>
                                              </div>
                                              <p className="mt-1 truncate font-semibold text-slate-700">{item.rubro} · {item.detalle}</p>
                                            </div>
                                            <strong className="whitespace-nowrap text-right font-mono text-rose-700">{item.monto}</strong>
                                          </div>
                                        )) : (
                                          <p className="px-2.5 py-3 text-[10px] text-slate-500">Sin facturas ni egresos registrados para este proveedor.</p>
                                        )}
                                      </div>
                                    </div>

                                    {prov.observaciones && (
                                      <p className="text-[11px] text-slate-500 italic mt-1 leading-snug line-clamp-2">
                                        "{prov.observaciones}"
                                      </p>
                                    )}
                                  </div>
                                </div>

                                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                                  <span className="inline-flex items-center space-x-1 px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                                    <span>{prov.estado}</span>
                                  </span>

                                  <div className="flex items-center space-x-1.5">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setActiveTab('finanzas');
                                        setFinanzasViewMode('facturacion-servicios');
                                        setFilterFacturaProveedor(prov.id);
                                        setFinanzasGroupOpen(true);
                                      }}
                                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-colors cursor-pointer"
                                      title={`Ver historial de facturación y egresos de ${prov.nombre}`}
                                    >
                                      <History className="w-3.5 h-3.5" />
                                      <span>Historial</span>
                                    </button>
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditProveedor(prov)}
                                      className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] text-xs font-bold transition-colors cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-[#3d7bb5]" />
                                      <span>Editar</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleDeleteProveedor(prov.id)}
                                      className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                      title={`Eliminar proveedor ${prov.nombre}`}
                                    >
                                      <Trash2 className="w-4 h-4" />
                                    </button>
                                  </div>
                                </div>
                              </div>
                            );
                          })
                        ) : (
                          <div className="col-span-full p-8 text-center bg-white border border-dashed border-slate-200 rounded-xl text-slate-400 text-xs">
                            No se encontraron empresas proveedoras registradas con los criterios de búsqueda.
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })()}

              </div>
            )}

            {/* VISTA 2: PLANIFICACIÓN DE INSPECCIONES EDILICIAS (GANTT 12M x 4S) */}
            {activeTab === 'planificacion' && (
              <div className="space-y-4">
                
                {/* Botón de Impresión Diagrama A3 superior restaurado */}
                <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-xl border border-[#d9e3ec] shadow-sm">
                  <div className="flex items-center space-x-3">
                    <CalendarDays className="w-5 h-5 text-[#0f2d59]" />
                    <div>
                      <h3 className="font-bold text-xs text-[#0f2d59]">Diagrama Anual de Inspección Reglamentaria — CFT ({fichasEdiliciasData.length} Planillas del Catálogo / 48 Semanas)</h3>
                      <p className="text-[11px] text-[#6b8299]">Envolventes y Sistemas Constructivos · Instalaciones Críticas · Servicios Contratados. Clic en cualquier celda para agendar/desprogramar.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={handleOpenAnnualPlanner}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-[#e8f3fb] hover:bg-[#d8eaf7] text-[#0f2d59] border border-[#bfd5e7] rounded-lg text-xs font-bold transition-colors"
                    >
                      <CalendarDays className="w-4 h-4" />
                      <span>Editar plan anual</span>
                    </button>
                    <button
                      onClick={() => setIsA3PreviewOpen(true)}
                      className="inline-flex items-center space-x-1.5 px-3.5 py-2 bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] rounded-lg text-xs font-bold transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                      <span>Previsualizar A3</span>
                    </button>
                    <button
                      onClick={() => {
                        setPrintTarget('a3');
                        handlePrintDocument('a3');
                      }}
                      className="inline-flex items-center space-x-2 px-4 py-2 bg-[#0f2d59] text-white rounded-lg text-xs font-bold hover:bg-[#153e77] shadow-sm transition-colors flex-shrink-0"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Imprimir Diagrama (A3) / PDF</span>
                    </button>
                  </div>
                </div>

                {isAnnualPlannerOpen && (
                  <div
                    className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-4"
                    onClick={() => setIsAnnualPlannerOpen(false)}
                  >
                    <section
                      role="dialog"
                      aria-modal="true"
                      aria-labelledby="annual-plan-title"
                      className="w-full max-w-5xl max-h-[92vh] overflow-y-auto rounded-xl bg-white p-5 shadow-2xl"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <p className="text-[10px] font-bold uppercase tracking-wider text-[#3d7bb5]">Planificación anual desde el catálogo</p>
                          <h3 id="annual-plan-title" className="mt-1 text-lg font-extrabold text-[#0f2d59]">Seleccioná meses y planillas</h3>
                          <p className="mt-1 text-xs text-slate-500">Las fichas disponibles se toman del Catálogo de Fichas (1-22).</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsAnnualPlannerOpen(false)}
                          className="rounded-md p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-800"
                          aria-label="Cerrar"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </div>

                      <div className="mt-5 grid gap-5 md:grid-cols-[220px_minmax(0,1fr)]">
                        <aside>
                          <div className="mb-2 flex items-center justify-between">
                            <h4 className="text-xs font-bold uppercase tracking-wide text-[#0f2d59]">Meses</h4>
                            <span className="text-[10px] text-slate-500">Tildados = incluidos</span>
                          </div>
                          <div className="grid grid-cols-3 gap-1.5 md:grid-cols-2">
                            {meses.map(month => {
                              const count = (annualPlanDraft[month.id] || []).length;
                              const isActive = activePlannerMonth === month.id;
                              return (
                                <button
                                  key={month.id}
                                  type="button"
                                  onClick={() => setActivePlannerMonth(month.id)}
                                  className={`flex min-h-10 items-center justify-between gap-1 border px-2 py-2 text-left text-xs font-semibold transition-colors ${
                                    isActive
                                      ? 'border-[#0f2d59] bg-[#0f2d59] text-white'
                                      : count > 0
                                        ? 'border-emerald-300 bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
                                        : 'border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                                  }`}
                                >
                                  <span>{month.nombre.slice(0, 3)}</span>
                                  <span className="font-mono text-[10px]">{count}</span>
                                </button>
                              );
                            })}
                          </div>
                          <p className="mt-3 text-[11px] leading-5 text-slate-500">El número indica cuántas fichas están seleccionadas para cada mes.</p>
                        </aside>

                        <div className="min-w-0">
                          <div className="mb-3 flex flex-wrap items-end justify-between gap-3 border-b border-slate-200 pb-3">
                            <div>
                              <h4 className="text-sm font-bold text-[#0f2d59]">{meses[activePlannerMonth]?.nombre} 2026</h4>
                              <p className="text-[11px] text-slate-500">Seleccioná las planillas que se inspeccionarán este mes.</p>
                            </div>
                            <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                              Semana del mes
                              <select
                                value={plannerWeekByMonth[activePlannerMonth] || 1}
                                onChange={(e) => setPlannerWeekByMonth(prev => ({ ...prev, [activePlannerMonth]: Number(e.target.value) }))}
                                className="border border-slate-300 bg-white px-2 py-1.5 text-xs text-[#0f2d59]"
                              >
                                {[1, 2, 3, 4].map(week => <option key={week} value={week}>S{week}</option>)}
                              </select>
                            </label>
                          </div>

                          <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                            <span className="text-[11px] font-semibold text-slate-600">
                              {(annualPlanDraft[activePlannerMonth] || []).length} de {fichasEdiliciasData.length} fichas seleccionadas
                            </span>
                            <button
                              type="button"
                              onClick={() => {
                                const selected = annualPlanDraft[activePlannerMonth] || [];
                                const allSelected = selected.length === fichasEdiliciasData.length;
                                setAnnualPlanDraft(prev => ({
                                  ...prev,
                                  [activePlannerMonth]: allSelected ? [] : fichasEdiliciasData.map(ficha => ficha.id)
                                }));
                              }}
                              className="text-[11px] font-bold text-[#0f2d59] underline underline-offset-2"
                            >
                              {(annualPlanDraft[activePlannerMonth] || []).length === fichasEdiliciasData.length ? 'Quitar todas' : 'Seleccionar todas'}
                            </button>
                          </div>

                          <div className="max-h-[48vh] overflow-y-auto border border-slate-200">
                            {fichasEdiliciasData.map(ficha => {
                              const selected = (annualPlanDraft[activePlannerMonth] || []).includes(ficha.id);
                              const frequency = ficha.cronograma?.[0]?.frecuencia || 'Frecuencia sin definir';
                              return (
                                <label
                                  key={ficha.id}
                                  className={`flex cursor-pointer items-start gap-3 border-b border-slate-100 px-3 py-2.5 last:border-b-0 hover:bg-slate-50 ${selected ? 'bg-sky-50/70' : 'bg-white'}`}
                                >
                                  <input
                                    type="checkbox"
                                    checked={selected}
                                    onChange={() => setAnnualPlanDraft(prev => {
                                      const current = prev[activePlannerMonth] || [];
                                      const next = current.includes(ficha.id)
                                        ? current.filter(id => id !== ficha.id)
                                        : [...current, ficha.id];
                                      return { ...prev, [activePlannerMonth]: next };
                                    })}
                                    className="mt-0.5 h-4 w-4 accent-[#0f2d59]"
                                  />
                                  <span className="min-w-0 flex-1">
                                    <span className="flex flex-wrap items-center gap-x-2 gap-y-0.5">
                                      <strong className="font-mono text-[10px] text-[#0f2d59]">{ficha.codigo || ficha.id}</strong>
                                      <span className="text-xs font-semibold text-slate-800">{ficha.titulo}</span>
                                    </span>
                                    <span className="mt-1 block text-[10px] text-slate-500">{ficha.edificio} · {frequency}</span>
                                  </span>
                                </label>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-slate-200 pt-4">
                        <p className="text-xs text-slate-500">
                          Total anual: {Object.values(annualPlanDraft).reduce((sum, ids) => sum + ids.length, 0)} asignaciones
                        </p>
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => setIsAnnualPlannerOpen(false)}
                            className="px-3.5 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100"
                          >
                            Cancelar
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveAnnualPlanner}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#0f2d59] px-4 py-2 text-xs font-bold text-white hover:bg-[#163e75]"
                          >
                            <Save className="h-4 w-4" />
                            Guardar planificación
                          </button>
                        </div>
                      </div>
                    </section>
                  </div>
                )}

                {/* GRÁFICO DINÁMICO DE INSPECCIONES MES A MES CON 3 ESTADOS: VERDE, AMARILLO Y GRIS */}
                <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#eef4f8] gap-2">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white">
                        <BarChart3 className="w-4 h-4" />
                      </div>
                      <div>
                        <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                          Estado de Ejecución de Inspecciones Edilicias — Distribución Anual 2026
                        </h4>
                        <p className="text-[11px] text-[#6b8299]">
                          Distribución mensual en la misma barra: Verde pastel (Finalizadas), Amarillo pastel (Pendientes) y Gris pastel (Sin Iniciar).
                        </p>
                      </div>
                    </div>
                    
                    {/* Referencias institucionales claras con los 3 estados */}
                    <div className="flex flex-wrap items-center gap-3 text-xs">
                      <div className="flex items-center space-x-1.5 font-bold text-[#166534]">
                        <span className="w-3.5 h-3.5 rounded-sm bg-[#86efac] border border-[#4ade80]"></span>
                        <span>Finalizadas ({monthlyStats.reduce((s, m) => s + m.finalizadas, 0)})</span>
                      </div>
                      <div className="flex items-center space-x-1.5 font-bold text-[#854d0e]">
                        <span className="w-3.5 h-3.5 rounded-sm bg-[#fef08a] border border-[#facc15]"></span>
                        <span>Pendientes ({monthlyStats.reduce((s, m) => s + m.pendientes, 0)})</span>
                      </div>
                      <div className="flex items-center space-x-1.5 font-bold text-[#475569]">
                        <span className="w-3.5 h-3.5 rounded-sm bg-[#cbd5e1] border border-[#94a3b8]"></span>
                        <span>Sin Iniciar ({monthlyStats.reduce((s, m) => s + m.sinIniciar, 0)})</span>
                      </div>
                      <span className="text-[#a0b3c6]">|</span>
                      <span className="text-[11px] font-semibold text-[#526a84]">
                        Total: {inspectionSheets.reduce((sum, s) => sum + s.weeks.length, 0)} intervenciones
                      </span>
                    </div>
                  </div>

                  {/* Visualizador de Barras Interactivas Divididas */}
                  <div className="relative pt-2 pb-2">
                    <div className="grid grid-cols-12 gap-1.5 sm:gap-2.5 items-end h-44 px-2 border-b border-[#cbdbe8]">
                      {monthlyStats.map((stat) => {
                        const isSelected = selectedMonthModal?.id === stat.id;
                        const isCurrentMonth = stat.id === currentSystemMonth;
                        const totalUnique = stat.uniqueCount;
                        const totalHeightPct = totalUnique > 0 ? Math.round((totalUnique / maxMonthCount) * 100) : 0;
                        const greenFraction = totalUnique > 0 ? (stat.finalizadas / totalUnique) : 0;
                        const yellowFraction = totalUnique > 0 ? (stat.pendientes / totalUnique) : 0;
                        const grayFraction = totalUnique > 0 ? (stat.sinIniciar / totalUnique) : 0;

                        return (
                          <div 
                            key={stat.id}
                            className={`relative flex flex-col items-center h-full justify-end group cursor-pointer p-1 rounded-t-lg transition-colors ${
                              isCurrentMonth ? 'bg-sky-50/70 border-x border-t border-sky-200' : ''
                            }`}
                            onClick={() => {
                              setSelectedMonthModal(selectedMonthModal?.id === stat.id ? null : stat);
                              setSelectedWeekTab('all');
                              setSelectedSheetInMonth(null);
                            }}
                            title={`Haga clic para ver planillas de ${stat.nombre}`}
                          >
                            {/* Indicador de Mes en Curso en la parte superior */}
                            {isCurrentMonth && (
                              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 z-20 flex items-center space-x-0.5 bg-[#0f2d59] text-white text-[8px] font-black uppercase tracking-tight px-1.5 py-0.5 rounded-full shadow-xs whitespace-nowrap animate-pulse">
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 inline-block"></span>
                                <span>Actual</span>
                              </div>
                            )}

                            {/* Números sobre la barra */}
                            <div className="flex items-center space-x-1 mb-1">
                              {stat.finalizadas > 0 && (
                                <span className="text-[8.5px] font-mono font-bold text-[#166534] bg-[#dcfce7] px-1 rounded">
                                  {stat.finalizadas}
                                </span>
                              )}
                              {stat.pendientes > 0 && (
                                <span className="text-[8.5px] font-mono font-bold text-[#854d0e] bg-[#fef9c3] px-1 rounded">
                                  {stat.pendientes}
                                </span>
                              )}
                              {stat.sinIniciar > 0 && (
                                <span className="text-[8.5px] font-mono font-bold text-[#475569] bg-slate-200 px-1 rounded">
                                  {stat.sinIniciar}
                                </span>
                              )}
                            </div>

                            {/* Barra vertical interactiva apilada en 3 colores: Gris (arriba), Amarillo (medio), Verde (abajo) */}
                            <div 
                              className={`w-full max-w-[38px] rounded-t-md flex flex-col justify-end overflow-hidden border transition-all duration-200 ${
                                isSelected 
                                  ? 'border-[#0f2d59] shadow-md ring-2 ring-[#0f2d59]/30 scale-[1.03]' 
                                  : isCurrentMonth
                                  ? 'border-[#0284c7] shadow-sm ring-1 ring-sky-300'
                                  : 'border-[#cbdbe8] hover:border-[#0f2d59]'
                              }`}
                              style={{ height: `${Math.max(totalHeightPct, 14)}%` }}
                            >
                              {/* Tramo superior: Gris pastel (Sin Iniciar) */}
                              {stat.sinIniciar > 0 && (
                                <div 
                                  className="w-full bg-[#cbd5e1] hover:bg-[#94a3b8] transition-colors relative flex items-center justify-center border-b border-white/60"
                                  style={{ height: `${grayFraction * 100}%` }}
                                  title={`${stat.sinIniciar} sin iniciar`}
                                >
                                  {grayFraction > 0.35 && (
                                    <span className="text-[8px] font-bold text-[#334155] select-none">
                                      {stat.sinIniciar}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Tramo intermedio: Amarillo pastel (Pendientes / Descargadas) */}
                              {stat.pendientes > 0 && (
                                <div 
                                  className="w-full bg-[#fef08a] hover:bg-[#fde047] transition-colors relative flex items-center justify-center border-b border-white/60"
                                  style={{ height: `${yellowFraction * 100}%` }}
                                  title={`${stat.pendientes} pendientes`}
                                >
                                  {yellowFraction > 0.35 && (
                                    <span className="text-[8px] font-bold text-[#854d0e] select-none">
                                      {stat.pendientes}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Tramo inferior: Verde pastel (Finalizadas) */}
                              {stat.finalizadas > 0 && (
                                <div 
                                  className="w-full bg-[#86efac] hover:bg-[#4ade80] transition-colors relative flex items-center justify-center"
                                  style={{ height: `${greenFraction * 100}%` }}
                                  title={`${stat.finalizadas} finalizadas`}
                                >
                                  {greenFraction > 0.35 && (
                                    <span className="text-[8px] font-bold text-[#14532d] select-none">
                                      {stat.finalizadas}
                                    </span>
                                  )}
                                </div>
                              )}

                              {/* Estado vacío sin tareas */}
                              {totalUnique === 0 && (
                                <div className="w-full h-full bg-slate-100 flex items-center justify-center text-[8px] text-slate-400">
                                  0
                                </div>
                              )}
                            </div>

                            {/* Etiqueta del Mes debajo */}
                            <div className="mt-2 w-full flex items-center justify-center">
                              {isCurrentMonth ? (
                                <span className="px-2 py-0.5 rounded-full bg-[#0f2d59] text-white text-[9.5px] font-black uppercase tracking-wider shadow-xs scale-105">
                                  {stat.nombre.slice(0, 3)}
                                </span>
                              ) : (
                                <span className={`text-[10px] font-bold uppercase tracking-wider transition-colors truncate max-w-full text-center ${
                                  isSelected ? 'text-[#0f2d59] font-black underline decoration-2' : 'text-[#6b8299]'
                                }`}>
                                  {stat.nombre.slice(0, 3)}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* PANEL INTEGRADO Y CONTENIDO: DETALLE DEL MES SELECCIONADO (SOLO AL HACER CLIC) */}
                  {selectedMonthModal && (() => {
                    const currentMonthData = selectedMonthModal;
                    const activeMonthId = currentMonthData.id;
                    const activeMonthWeeks = currentMonthData.weeks;
                    
                    // Filtrar planillas del mes
                    const activeMonthSheets = inspectionSheets.filter(s => s.weeks.some(w => activeMonthWeeks.includes(w)));
                    
                    // Filtrar por la semana seleccionada (Semana 1, 2, 3 o 4)
                    const filteredSheetsByWeek = activeMonthSheets.filter(sheet => {
                      if (selectedWeekTab === 'all') return true;
                      const weekNumIndex = parseInt(selectedWeekTab) - 1; // 0, 1, 2, 3
                      const targetWeekNum = activeMonthWeeks[weekNumIndex];
                      return sheet.weeks.includes(targetWeekNum);
                    });

                    let liveFinalizadas = 0;
                    let livePendientes = 0;
                    let liveSinIniciar = 0;

                    activeMonthSheets.forEach(s => {
                      const isDone = (s.completedWeeks || []).some(w => activeMonthWeeks.includes(w));
                      const downloadKey = `${s.id}-${activeMonthId}`;
                      const isDownloaded = !!downloadedSheets[downloadKey];
                      if (isDone) liveFinalizadas++;
                      else if (isDownloaded) livePendientes++;
                      else liveSinIniciar++;
                    });

                    return (
                      <div className="p-4 bg-[#f0f6fa] border border-[#cfe0ee] rounded-xl text-left animate-in fade-in duration-150 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2.5 border-b border-[#dce7f0] gap-2">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-[#0f2d59]"></span>
                            <span className="font-bold text-xs uppercase text-[#0f2d59]">
                              Planillas de {currentMonthData.nombre} 2026
                            </span>
                            
                            <span className="font-bold text-[10.5px] px-2 py-0.5 rounded bg-[#dcfce7] text-[#166534] border border-[#86efac]">
                              ✓ {liveFinalizadas} Finalizadas
                            </span>
                            <span className="font-bold text-[10.5px] px-2 py-0.5 rounded bg-[#fef9c3] text-[#854d0e] border border-[#fde047]">
                              ⏳ {livePendientes} Pendientes
                            </span>
                            <span className="font-bold text-[10.5px] px-2 py-0.5 rounded bg-slate-200 text-[#475569] border border-slate-300">
                              ○ {liveSinIniciar} Sin Iniciar
                            </span>
                          </div>

                          <button
                            onClick={() => {
                              setSelectedMonthModal(null);
                              setSelectedSheetInMonth(null);
                            }}
                            className="text-xs font-semibold text-[#526a84] hover:text-[#0f2d59] px-2.5 py-1 rounded bg-white border border-[#d9e3ec]"
                          >
                            Cerrar detalle ✕
                          </button>
                        </div>

                        {/* Pestañas de división por semanas del mes (Semana 1, 2, 3, 4) */}
                        <div className="flex items-center space-x-2 pt-1 pb-1 overflow-x-auto">
                          <span className="text-[11px] font-bold text-[#0f2d59] mr-1">Filtrar por Semana:</span>
                          <button
                            onClick={() => setSelectedWeekTab('all')}
                            className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors ${
                              selectedWeekTab === 'all'
                                ? 'bg-[#0f2d59] text-white shadow-xs'
                                : 'bg-white border border-[#cbdbe8] text-[#384c63] hover:bg-[#e2edf6]'
                            }`}
                          >
                            Todas ({activeMonthSheets.length})
                          </button>
                          {activeMonthWeeks.map((wNum, idx) => {
                            const weekNumLabel = `Semana ${idx + 1}`;
                            const countInWeek = activeMonthSheets.filter(s => s.weeks.includes(wNum)).length;
                            return (
                              <button
                                key={wNum}
                                onClick={() => setSelectedWeekTab((idx + 1).toString())}
                                className={`px-3 py-1 rounded-lg text-xs font-bold transition-colors flex items-center space-x-1.5 ${
                                  selectedWeekTab === (idx + 1).toString()
                                    ? 'bg-[#0f2d59] text-white shadow-xs'
                                    : 'bg-white border border-[#cbdbe8] text-[#384c63] hover:bg-[#e2edf6]'
                                }`}
                              >
                                <span>{weekNumLabel}</span>
                                <span className={`text-[9.5px] px-1.5 py-0.2 rounded-full ${
                                  selectedWeekTab === (idx + 1).toString() ? 'bg-[#20457a] text-white' : 'bg-[#eef4f9] text-[#0f2d59]'
                                }`}>
                                  {countInWeek}
                                </span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Listado en cuadrícula responsiva con acción de descarga y finalización */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 max-h-72 overflow-y-auto pr-1">
                          {filteredSheetsByWeek.length > 0 ? (
                            filteredSheetsByWeek.map((sheet) => {
                              const isDoneInMonth = (sheet.completedWeeks || []).some(w => activeMonthWeeks.includes(w));
                              const downloadKey = `${sheet.id}-${activeMonthId}`;
                              const isDownloaded = !!downloadedSheets[downloadKey];
                              const isCurrentSelected = selectedSheetInMonth === sheet.id;

                              let cardBgBorderClass = '!bg-slate-50/90 !border-slate-300';
                              let badgeClass = '!bg-slate-200 !text-slate-700 !border-slate-300';
                              let badgeText = '○ Sin Iniciar';

                              if (isDoneInMonth) {
                                cardBgBorderClass = '!bg-[#f0fdf4] !border-[#86efac]';
                                badgeClass = '!bg-[#dcfce7] !text-[#14532d] !border-[#86efac]';
                                badgeText = '✓ Finalizado';
                              } else if (isDownloaded) {
                                cardBgBorderClass = '!bg-[#fefce8] !border-[#fde047]';
                                badgeClass = '!bg-[#fef08a] !text-[#854d0e] !border-[#facc15]';
                                badgeText = '⏳ Pendiente';
                              }

                              return (
                                <div 
                                  key={sheet.id}
                                  onClick={() => setSelectedSheetInMonth(sheet.id)}
                                  className={`flex flex-col justify-between p-3.5 rounded-xl border text-xs shadow-xs transition-colors duration-200 cursor-pointer ${
                                    isCurrentSelected ? 'ring-2 ring-[#0f2d59] shadow-sm' : ''
                                  } ${cardBgBorderClass}`}
                                >
                                  {/* Encabezado de la Ficha: Código y Estado */}
                                  <div className="flex items-center justify-between gap-2 pb-1.5 border-b border-slate-200/60">
                                    <span className="font-mono font-bold text-[#0f2d59] bg-white px-2 py-0.5 rounded text-[10.5px] border border-[#cfe0ee] shadow-xs">
                                      {sheet.code}
                                    </span>

                                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold flex-shrink-0 shadow-xs border transition-colors duration-200 ${badgeClass}`}>
                                      {badgeText}
                                    </span>
                                  </div>

                                  {/* Título completo y Sistema / Frecuencia */}
                                  <div className="py-2 space-y-1">
                                    <h5 className="font-bold text-[#1c2d42] text-[12.5px] leading-snug whitespace-normal break-words">
                                      {sheet.nombre}
                                    </h5>
                                    <div className="flex flex-wrap items-center gap-1.5 text-[10.5px] text-[#526a84]">
                                      <span className="font-medium whitespace-normal break-words">{sheet.grupo}</span>
                                      <span className="text-[#94a3b8]">·</span>
                                      <span className="font-bold text-[#0f2d59] bg-white px-1.5 py-0.2 rounded border border-[#dce5ee]">
                                        {sheet.freq}
                                      </span>
                                    </div>
                                  </div>

                                  {/* Barra de Acciones: Descargar Planilla y Deslizador */}
                                  <div className="mt-2 pt-2.5 border-t border-slate-200/70 flex flex-wrap items-center justify-between gap-2">
                                    <button
                                      type="button"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownloadSheet(sheet.id, activeMonthId, activeMonthWeeks, sheet.nombre, sheet.code);
                                      }}
                                      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-[10.5px] font-bold transition-all shadow-xs ${
                                        isDownloaded
                                          ? 'bg-white text-[#854d0e] border border-[#fde047] hover:bg-yellow-50'
                                          : 'bg-[#0f2d59] text-white hover:bg-[#163e75]'
                                      }`}
                                      title="Descargar Planilla de Inspección Edilicia"
                                    >
                                      <Download className="w-3.5 h-3.5" />
                                      <span>{isDownloaded ? 'Re-descargar Planilla' : 'Descargar Planilla de Inspección'}</span>
                                    </button>

                                    {isDoneInMonth ? (
                                      <SlideToFinishButton
                                        sheetId={sheet.id}
                                        monthWeeks={activeMonthWeeks}
                                        isDone={true}
                                        onFinish={() => {}}
                                        onReopen={() => toggleSheetCompletionInMonth(sheet.id, activeMonthWeeks)}
                                      />
                                    ) : (
                                      isDownloaded ? (
                                        <div onClick={(e) => e.stopPropagation()}>
                                          <SlideToFinishButton
                                            sheetId={sheet.id}
                                            monthWeeks={activeMonthWeeks}
                                            isDone={false}
                                            onFinish={() => handleFinishSheet(sheet.id, activeMonthWeeks)}
                                            onReopen={() => {}}
                                          />
                                        </div>
                                      ) : (
                                        <span className="text-[10px] italic text-[#64748b]">
                                          Descargue la planilla para habilitar cierre
                                        </span>
                                      )
                                    )}
                                  </div>
                                </div>
                              );
                            })
                          ) : (
                            <div className="col-span-full text-center py-4 text-xs text-[#6b8299] italic">
                              No hay planillas agendadas para la semana seleccionada en {currentMonthData.nombre}.
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Controles de Filtrado */}
                <div className="p-4 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <CalendarDays className="w-5 h-5 text-[#0f2d59]" />
                    <div>
                      <h3 className="font-bold text-xs text-[#0f2d59]">Diagrama Anual de Inspección Reglamentaria — CFT ({fichasEdiliciasData.length} Planillas del Catálogo / 48 Semanas)</h3>
                      <p className="text-[11px] text-[#6b8299]">Envolventes y Sistemas Constructivos · Instalaciones Críticas · Servicios Contratados. Clic en cualquier celda para agendar/desprogramar.</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    <select
                      value={selectedGroupFilter}
                      onChange={(e) => setSelectedGroupFilter(e.target.value)}
                      className="max-w-[220px] truncate px-3 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                    >
                      <option value="all">Grupo: Todos ({fichasEdiliciasData.length})</option>
                      <option value="Envolventes y Sistemas Constructivos">Envolventes y Sistemas Constructivos ({fichasEdiliciasData.filter(f => f.grupoId === 'sistema-edilicio').length})</option>
                      <option value="Instalaciones Críticas">Instalaciones Críticas ({fichasEdiliciasData.filter(f => f.grupoId === 'instalaciones-criticas').length})</option>
                      <option value="Servicios">Servicios ({fichasEdiliciasData.filter(f => f.grupoId === 'servicios-contratados').length})</option>
                    </select>

                    <select
                      value={selectedFreqFilter}
                      onChange={(e) => setSelectedFreqFilter(e.target.value)}
                      className="max-w-[140px] px-3 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-semibold text-[#384c63] bg-white focus:border-[#0f2d59] outline-none"
                    >
                      <option value="all">Frecuencia: Todas</option>
                      <option value="Mensual">Mensual</option>
                      <option value="Trimestral">Trimestral</option>
                      <option value="Semestral">Semestral</option>
                    </select>

                    <button
                      onClick={() => {
                        setSelectedGroupFilter('all');
                        setSelectedFreqFilter('all');
                        setInspectionsSearch('');
                      }}
                      className="px-3 py-1.5 rounded-lg border border-[#cfdbe6] text-xs font-medium text-[#526a84] hover:bg-[#f0f5fa]"
                    >
                      Restablecer
                    </button>
                  </div>
                </div>

                {/* Matriz Gantt con Desplazamiento Horizontal Suave */}
                <div className="rounded-xl border border-[#d9e3ec] bg-white shadow-sm overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse text-[10px]">
                      <thead>
                        {/* Fila 1: Encabezado de Meses */}
                        <tr className="bg-[#0f2d59] text-white">
                          <th className="sticky left-0 z-20 bg-[#0f2d59] px-3 py-2 text-left font-bold min-w-[270px] border-r border-[#1e447b]">
                            Planilla Oficial del Programa CFT
                          </th>
                          <th className="px-2 py-2 text-center font-bold min-w-[70px] border-r border-[#1e447b]">
                            Frec.
                          </th>
                          {meses.map((m) => (
                            <th 
                              key={m.id} 
                              colSpan={4} 
                              className="px-2 py-1.5 text-center font-bold uppercase tracking-wider border-r border-[#1e447b] text-[10px]"
                            >
                              {m.nombre}
                            </th>
                          ))}
                        </tr>

                        {/* Fila 2: Semanas 1 a 4 por cada mes */}
                        <tr className="bg-[#f0f5fa] text-[#0f2d59] font-bold border-b border-[#dce5ee]">
                          <th className="sticky left-0 z-20 bg-[#f0f5fa] px-3 py-1.5 text-left text-[9px] uppercase tracking-wider border-r border-[#dce5ee]">
                            Detalle / Sistema Edilicio
                          </th>
                          <th className="px-2 py-1.5 text-center text-[9px] uppercase border-r border-[#dce5ee]">
                            Tipo
                          </th>
                          {meses.map((m) => (
                            <React.Fragment key={m.id}>
                              {m.weeks.map((w, idx) => (
                                <th 
                                  key={w} 
                                  className={`w-7 py-1 text-center font-mono font-semibold text-[9px] ${
                                    idx === 3 ? 'border-r border-[#c8d8e6]' : 'border-r border-[#e5ecf3]'
                                  }`}
                                >
                                  S{idx + 1}
                                </th>
                              ))}
                            </React.Fragment>
                          ))}
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#e6eef5] text-[#1c2d42]">
                        {inspectionSheets
                          .filter(s => (selectedGroupFilter === 'all' || s.grupo === selectedGroupFilter) &&
                                       (selectedFreqFilter === 'all' || s.freq === selectedFreqFilter))
                          .map((sheet) => (
                            <tr key={sheet.id} className="hover:bg-[#fbfcfe] transition-colors">
                              {/* Nombre de la planilla sticky a la izquierda */}
                              <td className="sticky left-0 z-10 bg-white hover:bg-[#fbfcfe] px-3 py-2 font-medium border-r border-[#d9e3ec]">
                                <div className="flex items-center space-x-2">
                                  <span className="font-mono font-bold text-[9.5px] px-1.5 py-0.5 rounded bg-[#eef4f9] text-[#0f2d59] border border-[#cfe0ee]">
                                    {sheet.code}
                                  </span>
                                  <span className="truncate max-w-[240px] text-[#1c2d42] font-semibold text-[11px]" title={`${sheet.nombre} (${sheet.grupo})`}>
                                    {sheet.nombre}
                                  </span>
                                </div>
                              </td>

                              {/* Badge de frecuencia */}
                              <td className="px-2 py-2 text-center border-r border-[#d9e3ec]">
                                <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                                  sheet.freq === 'Mensual' ? 'bg-[#e0f2fe] text-[#0369a1]' :
                                  sheet.freq === 'Trimestral' ? 'bg-[#fef3c7] text-[#92400e]' :
                                  'bg-[#f3e8ff] text-[#7e22ce]'
                                }`}>
                                  {sheet.freq}
                                </span>
                              </td>

                              {/* 48 Celdas de Semanas Interactivas */}
                              {meses.map((m) => (
                                <React.Fragment key={m.id}>
                                  {m.weeks.map((w, wIdx) => {
                                    const isScheduled = sheet.weeks.includes(w);
                                    const isDone = (sheet.completedWeeks || []).includes(w);
                                    return (
                                      <td 
                                        key={w}
                                        onClick={() => toggleInspectionWeek(sheet.id, w)}
                                        className={`w-7 p-0.5 text-center cursor-pointer select-none transition-all ${
                                          wIdx === 3 ? 'border-r border-[#c8d8e6]' : 'border-r border-[#edf2f7]'
                                        } ${
                                          isScheduled 
                                            ? (isDone ? 'bg-[#dcfce7]' : 'bg-[#fee2e2]') 
                                            : 'hover:bg-[#f1f5f9]'
                                        }`}
                                        title={`Semana ${w} - ${sheet.nombre} (${
                                          !isScheduled ? 'Sin programar' : isDone ? 'Realizada (clic derecho para marcar pendiente)' : 'Pendiente'
                                        })`}
                                      >
                                        {isScheduled ? (
                                          <div 
                                            onClick={(e) => toggleWeekCompletion(sheet.id, w, e)}
                                            className={`w-5 h-5 mx-auto rounded flex items-center justify-center font-bold text-[8.5px] shadow-xs transition-transform active:scale-90 ${
                                              isDone
                                                ? 'bg-[#86efac] text-[#14532d] border border-[#4ade80]'
                                                : 'bg-[#fca5a5] text-[#7f1d1d] border border-[#f87171]'
                                            }`}
                                            title={isDone ? 'Realizada (clic para pasar a pendiente)' : 'Pendiente (clic para marcar realizada)'}
                                          >
                                            {isDone ? '✓' : '!'}
                                          </div>
                                        ) : (
                                          <span className="text-[#cbd5e1] text-[9px] hover:text-[#94a3b8]">·</span>
                                        )}
                                      </td>
                                    );
                                  })}
                                </React.Fragment>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Leyenda y Referencias de Uso */}
                <div className="p-3.5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-wrap items-center justify-between gap-3 text-xs">
                  <div className="flex items-center space-x-4">
                    <span className="font-bold text-[#0f2d59]">Referencias:</span>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 rounded bg-[#86efac] border border-[#4ade80] text-[#14532d] flex items-center justify-center text-[9px] font-bold">✓</div>
                      <span className="text-[#166534] font-medium">Finalizada (verde pastel)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 rounded bg-[#fef08a] border border-[#facc15] text-[#854d0e] flex items-center justify-center text-[9px] font-bold">⏳</div>
                      <span className="text-[#854d0e] font-medium">Pendiente (amarillo pastel)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <div className="w-4 h-4 rounded bg-[#cbd5e1] border border-[#94a3b8] text-[#475569] flex items-center justify-center text-[9px] font-bold">○</div>
                      <span className="text-[#475569] font-medium">Sin Iniciar (gris pastel)</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#6b8299] font-medium">
                    Poder Judicial de la Nación · Cámara Federal de Tucumán
                  </div>
                </div>
              </div>
            )}

            {/* VISTA 3: CATÁLOGO DE FICHAS EDILICIAS (1-22) */}
            {activeTab === 'fichas' && (
              <div className="space-y-6">
                
                {/* Cabecera Principal del Módulo de Planillas con Buscador, Filtros Rápidos y Botón Crear */}
                <div className="bg-white p-5 rounded-2xl border border-[#d9e3ec] shadow-sm space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-[#eef4f8]">
                    <div className="flex items-center space-x-3.5">
                      <div className="w-11 h-11 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center shadow-xs">
                        <Layers className="w-6 h-6 text-cyan-400" />
                      </div>
                      <div>
                        <div className="text-[11px] font-bold uppercase tracking-wider text-[#3d7bb5]">
                          Mantenimiento Edilicio CFAT
                        </div>
                        <h3 className="font-extrabold text-base text-[#0f2d59]">
                          Planillas de Inspección Técnica Edilicia
                        </h3>
                        <p className="text-xs text-[#526a84]">
                          Catálogo oficial segregado en 3 grupos técnicos independientes con asistente de edición wizard e impresión A4 en 2 páginas.
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleOpenCreateFicha}
                      className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-[#0f2d59] hover:bg-[#163e75] text-white font-bold text-xs shadow-sm transition-all active:scale-98 self-start md:self-auto cursor-pointer"
                    >
                      <Plus className="w-4 h-4 stroke-[2.5]" />
                      <span>Crear Nueva Planilla</span>
                    </button>
                  </div>

                  {/* Barra de Filtros: Buscador en tiempo real y Tabs Rápidas de Grupos */}
                  <div className="flex flex-col lg:flex-row gap-3 items-stretch lg:items-center justify-between">
                    <div className="relative flex-1 min-w-[240px]">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input
                        type="text"
                        placeholder="Buscar por código (ej. FICHA N° 01), título técnico, edificio o sector..."
                        value={fichasSearchTerm}
                        onChange={(e) => setFichasSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:border-[#0f2d59] outline-none text-slate-800 bg-[#fbfcfe]"
                      />
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200">
                      {[
                        { id: 'all', label: 'Todos', count: fichasEdiliciasData.length },
                        { id: 'sistema-edilicio', label: 'Sistema Edilicio', count: fichasEdiliciasData.filter(f => f.grupoId === 'sistema-edilicio').length },
                        { id: 'instalaciones-criticas', label: 'Instalaciones Críticas', count: fichasEdiliciasData.filter(f => f.grupoId === 'instalaciones-criticas').length },
                        { id: 'servicios-contratados', label: 'Servicios Contratados', count: fichasEdiliciasData.filter(f => f.grupoId === 'servicios-contratados').length }
                      ].map(tab => (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setFichasGrupoTab(tab.id)}
                          className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer ${
                            fichasGrupoTab === tab.id
                              ? 'bg-[#0f2d59] text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                          }`}
                        >
                          <span>{tab.label}</span>
                          <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                            fichasGrupoTab === tab.id ? 'bg-[#20457a] text-white' : 'bg-slate-200 text-slate-700'
                          }`}>
                            {tab.count}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* SEGREGACIÓN VISUAL POR 3 GRUPOS TÉCNICOS INDEPENDIENTES */}
                {[
                  {
                    id: 'sistema-edilicio',
                    titulo: 'GRUPO I: SISTEMA EDILICIO',
                    subtitulo: 'Fachada, Envolventes, Muros, Cielorrasos, Pisos, Cubiertas, Zinguería, Aberturas y Mobiliario',
                    icon: Building2,
                    borderAccent: 'border-blue-300',
                    badgeBg: 'bg-blue-100 text-blue-900 border-blue-200',
                    headerBg: 'bg-gradient-to-r from-blue-50 to-indigo-50/50'
                  },
                  {
                    id: 'instalaciones-criticas',
                    titulo: 'GRUPO II: INSTALACIONES CRÍTICAS',
                    subtitulo: 'Instalación Eléctrica, Iluminación, Sanitarias, Reserva de Agua y Bombas, Red Contra Incendio y Gas',
                    icon: Activity,
                    borderAccent: 'border-amber-300',
                    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
                    headerBg: 'bg-gradient-to-r from-amber-50 to-orange-50/50'
                  },
                  {
                    id: 'servicios-contratados',
                    titulo: 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS',
                    subtitulo: 'Climatización Central/HVAC, Transporte Vertical/Ascensores, Grupos Electrógenos y Control de Plagas',
                    icon: Wrench,
                    borderAccent: 'border-purple-300',
                    badgeBg: 'bg-purple-100 text-purple-900 border-purple-200',
                    headerBg: 'bg-gradient-to-r from-purple-50 to-fuchsia-50/50'
                  }
                ]
                  .filter(grp => fichasGrupoTab === 'all' || fichasGrupoTab === grp.id)
                  .map(grp => {
                    const fichasInGroup = fichasEdiliciasData.filter(f => {
                      const matchGroup = f.grupoId === grp.id;
                      const q = fichasSearchTerm.toLowerCase().trim();
                      const matchQuery = !q ||
                        f.codigo.toLowerCase().includes(q) ||
                        f.titulo.toLowerCase().includes(q) ||
                        f.edificio.toLowerCase().includes(q) ||
                        (f.sector || '').toLowerCase().includes(q) ||
                        (f.inspector || '').toLowerCase().includes(q);
                      return matchGroup && matchQuery;
                    });

                    return (
                      <div key={grp.id} className="bg-white rounded-2xl border border-[#d9e3ec] shadow-sm p-5 space-y-4">
                        
                        {/* Cabecera del Grupo Técnico con icono y contador */}
                        <div className={`p-4 rounded-xl border ${grp.borderAccent} ${grp.headerBg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                          <div className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
                              <grp.icon className="w-5 h-5 text-cyan-300" />
                            </div>
                            <div>
                              <div className="flex items-center space-x-2">
                                <h4 className="font-black text-sm uppercase tracking-wide text-[#0f2d59]">{grp.titulo}</h4>
                                <span className={`px-2 py-0.5 rounded-full font-bold text-[10.5px] border ${grp.badgeBg}`}>
                                  {fichasInGroup.length} fichas
                                </span>
                              </div>
                              <p className="text-xs text-slate-600 mt-0.5">{grp.subtitulo}</p>
                            </div>
                          </div>
                        </div>

                        {/* Grilla de Tarjetas de Planilla */}
                        {fichasInGroup.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {fichasInGroup.map(ficha => {
                              const totalRubros = ficha.rubros?.length || 0;
                              const totalPatologias = ficha.rubros?.reduce((acc, r) => acc + (r.patologias?.length || 0), 0) || 0;
                              const totalTareas = ficha.cronograma?.length || 0;

                              return (
                                <div 
                                  key={ficha.id}
                                  className="p-4 rounded-xl border border-slate-200 bg-[#fbfcfe] hover:border-[#0f2d59] hover:shadow-md transition-all flex flex-col justify-between space-y-3.5 group"
                                >
                                  <div>
                                    {/* Badge del Grupo Técnico y Código Oficial */}
                                    <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-200">
                                      <span className="font-mono font-bold text-xs px-2.5 py-1 rounded bg-[#0f2d59] text-white shadow-2xs">
                                        {ficha.codigo}
                                      </span>
                                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                                        {ficha.motivo || 'Periódica'}
                                      </span>
                                    </div>

                                    {/* Título Técnico y Localización */}
                                    <h5 className="font-bold text-sm text-[#0f2d59] mt-2 leading-snug group-hover:text-[#163e75] transition-colors">
                                      {ficha.titulo}
                                    </h5>
                                    
                                    <div className="mt-2 space-y-1 text-xs text-slate-600">
                                      <div className="flex items-center space-x-1.5 truncate">
                                        <Building2 className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                                        <span className="truncate font-medium">{ficha.edificio}</span>
                                      </div>
                                      <div className="flex items-center space-x-1.5 truncate text-[11px] text-slate-500">
                                        <MapPin className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                        <span className="truncate">{ficha.sector || 'Sector general'} &bull; {ficha.nivel || 'Nivel'}</span>
                                      </div>
                                    </div>

                                    {/* Resumen de Rubros, Deterioros y Frecuencias */}
                                    <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
                                      <div className="p-2 rounded bg-white border border-slate-200 text-center">
                                        <span className="text-slate-400 text-[9.5px] uppercase block font-semibold">Componentes</span>
                                        <strong className="text-slate-800 text-xs font-mono">{totalRubros} rubros</strong>
                                      </div>
                                      <div className="p-2 rounded bg-white border border-slate-200 text-center">
                                        <span className="text-slate-400 text-[9.5px] uppercase block font-semibold">Deterioros</span>
                                        <strong className="text-[#0f2d59] text-xs font-mono">{totalPatologias} patologías</strong>
                                      </div>
                                    </div>
                                  </div>

                                  {/* Botones de Acción: Modificar (Wizard) e Imprimir A4 */}
                                  <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
                                    <button
                                      type="button"
                                      onClick={() => handleOpenEditFicha(ficha)}
                                      className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-white hover:bg-slate-100 text-[#0f2d59] border border-slate-300 font-bold text-xs transition-colors cursor-pointer"
                                    >
                                      <Edit3 className="w-3.5 h-3.5 text-[#3d7bb5]" />
                                      <span>Modificar</span>
                                    </button>

                                    <button
                                      type="button"
                                      onClick={() => handleOpenPrintFicha(ficha)}
                                      className="flex-1 inline-flex items-center justify-center space-x-1.5 px-3 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white font-bold text-xs transition-colors shadow-xs cursor-pointer"
                                    >
                                      <Printer className="w-3.5 h-3.5" />
                                      <span>Imprimir A4</span>
                                    </button>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        ) : (
                          <div className="py-8 text-center text-xs text-slate-400 border border-dashed border-slate-200 rounded-xl">
                            No se encontraron planillas en este grupo que coincidan con la búsqueda.
                          </div>
                        )}
                      </div>
                    );
                  })}
              </div>
            )}

            {/* VISTA: EXPEDIENTES ADMINISTRATIVOS (CON DOS SUBMÓDULOS) */}
            {activeTab === 'expedientes' && (
              <div className="p-6 rounded-xl border border-[#d9e3ec] bg-white shadow-sm space-y-4">
                <div className="flex items-center space-x-3 pb-3 border-b border-[#eef4f8]">
                  <div className="w-10 h-10 rounded-lg bg-[#0f2d59] text-white flex items-center justify-center">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#0f2d59]">
                      {expedientesTab === 'administrativos'
                        ? 'Gestión de Expedientes Administrativos'
                        : 'Gestión de Expedientes en Curso'}
                    </h3>
                    <p className="text-xs text-[#526a84]">
                      {expedientesTab === 'administrativos'
                        ? 'Módulo de registro general, resoluciones, notas y providencias de Intendencia CFT.'
                        : 'Módulo de expedientes activos en tramitación y seguimiento de plazos procesales.'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2 border-b border-[#cfdbe6] pb-2">
                  <button
                    onClick={() => setExpedientesTab('administrativos')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      expedientesTab === 'administrativos'
                        ? 'bg-[#0f2d59] text-white'
                        : 'bg-white border border-[#cfdbe6] text-[#384c63] hover:bg-[#f0f5fa]'
                    }`}
                  >
                    Expedientes Administrativos
                  </button>
                  <button
                    onClick={() => setExpedientesTab('en-curso')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      expedientesTab === 'en-curso'
                        ? 'bg-[#0f2d59] text-white'
                        : 'bg-white border border-[#cfdbe6] text-[#384c63] hover:bg-[#f0f5fa]'
                    }`}
                  >
                    Expedientes en Curso
                  </button>
                </div>

                <div className="py-8 text-center text-xs text-[#6b8299] space-y-2">
                  <p className="font-semibold text-[#0f2d59]">
                    {expedientesTab === 'administrativos'
                      ? 'Área de Expedientes Administrativos cargada y lista para registro de actuaciones.'
                      : 'Área de Expedientes en Curso activa para control de tramitaciones.'}
                  </p>
                  <p>Utilice la barra lateral para alternar entre expedientes y el módulo de Mantenimiento Edilicio.</p>
                </div>
              </div>
            )}

            {/* VISTA 4: MÓDULO DE CONFIGURACIÓN */}
            {activeTab === 'configuracion' && (
              <div className="space-y-6">
                
                {/* Migas de pan / Breadcrumbs de Navegación Jerárquica */}
                <div className="flex items-center space-x-2 text-xs font-semibold bg-white p-3.5 rounded-xl border border-[#d9e3ec] shadow-sm">
                  <button 
                    onClick={() => {
                      setConfigSection('root');
                    }}
                    className={`hover:text-[#0f2d59] flex items-center space-x-1.5 ${
                      configSection === 'root' ? 'text-[#0f2d59] font-bold' : 'text-[#6b8299]'
                    }`}
                  >
                    <Settings className="w-3.5 h-3.5" />
                    <span>Configuración</span>
                  </button>
                  
                  {configSection !== 'root' && (
                    <>
                      <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
                      <button 
                        onClick={() => {
                          setConfigSection('parametros-ot');
                          setConfigSubSection('menu');
                        }}
                        className={`hover:text-[#0f2d59] ${
                          configSubSection === 'menu' ? 'text-[#0f2d59] font-bold' : 'text-[#6b8299]'
                        }`}
                      >
                        Modificar parámetros OT
                      </button>
                    </>
                  )}

                  {configSection === 'parametros-ot' && configSubSection === 'listas-desplegables' && (
                    <>
                      <ChevronRight className="w-3.5 h-3.5 text-[#94a3b8]" />
                      <span className="text-[#0f2d59] font-bold bg-[#eef4f9] px-2 py-0.5 rounded border border-[#cfe0ee]">
                        Modificar listas desplegables
                      </span>
                    </>
                  )}
                </div>

                {/* Botón Atrás para volver al Menú General de Configuración */}
                {configSection !== 'root' && (
                  <div>
                    <button
                      onClick={() => setConfigSection('root')}
                      className="inline-flex items-center space-x-2 px-3 py-1.5 rounded-lg border border-[#cfdbe6] bg-white text-xs font-semibold text-[#0f2d59] hover:bg-[#eef4f9] hover:border-[#0f2d59] transition-all shadow-xs"
                    >
                      <ArrowLeft className="w-4 h-4 text-[#3d7bb5]" />
                      <span>Volver al Menú Principal de Configuración</span>
                    </button>
                  </div>
                )}

                {/* NIVEL 1: Menú Raíz de Configuración */}
                {configSection === 'root' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                    {/* Tarjeta 1: Parámetros OT */}
                    <div 
                      onClick={() => {
                        setConfigSection('parametros-ot');
                        setConfigSubSection('listas-desplegables');
                      }}
                      className="p-5 bg-white rounded-xl border border-[#d9e3ec] hover:border-[#0f2d59] shadow-sm hover:shadow-md cursor-pointer transition-all group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-[#eef4f9] group-hover:bg-[#0f2d59] text-[#0f2d59] group-hover:text-white flex items-center justify-center transition-colors mb-3.5">
                        <SlidersHorizontal className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-[#0f2d59]">Modificar parámetros OT</h4>
                      <p className="text-xs text-[#526a84] mt-1">
                        Configuración de listas desplegables, valores predeterminados y estructura de las Órdenes de Trabajo.
                      </p>
                      <div className="mt-4 flex items-center text-xs font-bold text-[#3d7bb5] group-hover:text-[#0f2d59]">
                        <span>Ingresar a parámetros</span>
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>

                    {/* Tarjeta 2: Gestión de Usuarios del Portal */}
                    <div 
                      onClick={() => {
                        setConfigSection('usuarios');
                      }}
                      className="p-5 bg-white rounded-xl border border-[#d9e3ec] hover:border-[#0f2d59] shadow-sm hover:shadow-md cursor-pointer transition-all group"
                    >
                      <div className="w-11 h-11 rounded-lg bg-emerald-50 group-hover:bg-emerald-700 text-emerald-800 group-hover:text-white flex items-center justify-center transition-colors mb-3.5">
                        <Users className="w-5 h-5" />
                      </div>
                      <h4 className="font-bold text-sm text-[#0f2d59]">Gestión de Usuarios y Perfiles</h4>
                      <p className="text-xs text-[#526a84] mt-1">
                        Administración de cuentas con perfiles de acceso: Administrador, Encargado y Técnicos.
                      </p>
                      <div className="mt-4 flex items-center text-xs font-bold text-emerald-700 group-hover:text-[#0f2d59]">
                        <span>Administrar ({usuariosSistema.length} usuarios)</span>
                        <ChevronRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </div>
                )}

                {/* NIVEL 2: GESTIÓN DE USUARIOS Y PERFILES (ADMINISTRADOR, ENCARGADO, TÉCNICO) */}
                {configSection === 'usuarios' && (
                  <div className="space-y-6">
                    <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white">
                          <Users className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#3d7bb5]">
                            Configuración &bull; Seguridad y Personal
                          </div>
                          <h3 className="font-bold text-sm text-[#0f2d59]">
                            Gestión de Usuarios del Portal Institucional
                          </h3>
                          <p className="text-xs text-[#526a84]">
                            Control de credenciales y roles: Administrador (acceso total), Encargado (control técnico y finanzas) y Técnicos (órdenes en campo).
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => setIsNewUserModalOpen(true)}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <Plus className="w-4 h-4" />
                        <span>+ Incorporar Nuevo Usuario</span>
                      </button>
                    </div>

                    {/* Métricas de Cuentas */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-[10.5px] font-bold uppercase text-purple-900 tracking-wide">Administradores</span>
                          <p className="text-xl font-black text-purple-800 mt-0.5">
                            {usuariosSistema.filter(u => u.rol === 'Administrador').length}
                          </p>
                        </div>
                        <ShieldCheck className="w-6 h-6 text-purple-700" />
                      </div>

                      <div className="p-4 rounded-xl border border-sky-200 bg-sky-50/60 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-[10.5px] font-bold uppercase text-sky-900 tracking-wide">Encargados</span>
                          <p className="text-xl font-black text-sky-800 mt-0.5">
                            {usuariosSistema.filter(u => u.rol === 'Encargado').length}
                          </p>
                        </div>
                        <SlidersHorizontal className="w-6 h-6 text-sky-700" />
                      </div>

                      <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/60 shadow-sm flex items-center justify-between">
                        <div>
                          <span className="text-[10.5px] font-bold uppercase text-emerald-900 tracking-wide">Técnicos Operativos</span>
                          <p className="text-xl font-black text-emerald-800 mt-0.5">
                            {usuariosSistema.filter(u => u.rol === 'Técnico').length}
                          </p>
                        </div>
                        <Wrench className="w-6 h-6 text-emerald-700" />
                      </div>
                    </div>

                    {/* Tabla de Usuarios Registrados */}
                    <div className="rounded-xl border border-[#d9e3ec] bg-white shadow-sm overflow-hidden">
                      <table className="w-full text-left text-xs border-collapse">
                        <thead>
                          <tr className="bg-[#f0f5fa] border-b border-[#dce5ee] text-[#0f2d59] font-bold">
                            <th className="px-4 py-3">ID</th>
                            <th className="px-4 py-3">Nombre Completo</th>
                            <th className="px-4 py-3">Usuario Institucional</th>
                            <th className="px-4 py-3">Correo Oficial</th>
                            <th className="px-4 py-3 text-center">Rol / Perfil</th>
                            <th className="px-4 py-3 text-center">Estado</th>
                            <th className="px-4 py-3 text-center">Alta</th>
                            <th className="px-4 py-3 text-right">Acciones</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#e8eff5] text-slate-800">
                          {usuariosSistema.map(user => (
                            <tr key={user.id} className="hover:bg-[#f8fafc] transition-colors">
                              <td className="px-4 py-3 font-mono font-bold text-[#0f2d59]">{user.id}</td>
                              <td className="px-4 py-3 font-bold text-slate-900">{user.nombre}</td>
                              <td className="px-4 py-3 font-mono text-slate-600">{user.usuario}</td>
                              <td className="px-4 py-3 text-slate-600">{user.email}</td>
                              <td className="px-4 py-3 text-center">
                                <span className={`px-2.5 py-0.5 rounded-full font-bold text-[10.5px] ${
                                  user.rol === 'Administrador' ? 'bg-purple-100 text-purple-800 border border-purple-200' :
                                  user.rol === 'Encargado' ? 'bg-sky-100 text-sky-800 border border-sky-200' :
                                  'bg-emerald-100 text-emerald-800 border border-emerald-200'
                                }`}>
                                  {user.rol}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-center">
                                <button
                                  type="button"
                                  onClick={() => handleToggleUserStatus(user.id)}
                                  className={`px-2.5 py-0.5 rounded-full font-bold text-[10.5px] border transition-colors ${
                                    user.estado === 'Activo'
                                      ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                                      : 'bg-slate-100 text-slate-500 border-slate-300 hover:bg-slate-200'
                                  }`}
                                  title="Haga clic para cambiar estado"
                                >
                                  {user.estado}
                                </button>
                              </td>
                              <td className="px-4 py-3 text-center font-mono text-[11px] text-slate-500">{user.fechaAlta}</td>
                              <td className="px-4 py-3 text-right">
                                <button
                                  type="button"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="p-1 rounded text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                                  title={`Eliminar usuario ${user.nombre}`}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* NIVEL 2 / 3: Modificar Parámetros OT -> Modificar Listas Desplegables */}
                {configSection === 'parametros-ot' && (
                  <div className="space-y-6">
                    {/* Cabecera del Submódulo */}
                    <div className="p-5 rounded-xl border border-[#d9e3ec] bg-white shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                      <div className="flex items-center space-x-3.5">
                        <div className="w-10 h-10 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white">
                          <ListPlus className="w-5 h-5" />
                        </div>
                        <div>
                          <div className="text-[11px] font-bold uppercase tracking-wider text-[#3d7bb5]">
                            Modificar parámetros OT
                          </div>
                          <h3 className="font-bold text-sm text-[#0f2d59]">Modificar listas desplegables</h3>
                          <p className="text-xs text-[#526a84]">
                            Gestione los valores que se muestran en los selectores del formulario de Órdenes de Trabajo.
                          </p>
                        </div>
                      </div>
                      <div className="text-[11px] font-bold text-[#0f2d59] bg-[#f0f6fa] border border-[#d2e2f0] px-3 py-1.5 rounded-lg flex items-center space-x-2">
                        <Info className="w-4 h-4 text-[#3d7bb5]" />
                        <span>Sincronización automática</span>
                      </div>
                    </div>

                    {/* Submenús de Configuración de Listados */}
                    <div className="flex flex-col lg:flex-row gap-6">
                      
                      {/* Selector vertical de submenús */}
                      <div className="w-full lg:w-64 space-y-1.5 flex-shrink-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-[#526a84] px-3 pb-1">
                          Listados Disponibles
                        </p>
                        {[
                          { id: 'dependencias', label: 'Dependencias', count: dropdownOptions.dependencias.length },
                          { id: 'pisos', label: 'Pisos / Niveles', count: dropdownOptions.pisos.length },
                          { id: 'rubros', label: 'Rubros Técnicos', count: dropdownOptions.rubros.length },
                          { id: 'tecnicos', label: 'Técnicos Asignados', count: dropdownOptions.tecnicos.length },
                          { id: 'prioridades', label: 'Prioridades', count: dropdownOptions.prioridades.length },
                          { id: 'edificios', label: 'Edificios', count: dropdownOptions.edificios.length }
                        ].map((tab) => (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setConfigSubTab(tab.id);
                              setNewOptionInput('');
                            }}
                            className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                              configSubTab === tab.id
                                ? 'bg-[#0f2d59] text-white shadow-sm'
                                : 'bg-white border border-[#d9e3ec] text-[#384c63] hover:bg-[#f0f6fa] hover:text-[#0f2d59]'
                            }`}
                          >
                            <span>{tab.label}</span>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                              configSubTab === tab.id ? 'bg-[#20457a] text-white' : 'bg-[#eef4f9] text-[#0f2d59]'
                            }`}>
                              {tab.count}
                            </span>
                          </button>
                        ))}
                      </div>

                      {/* Panel de administración del listado seleccionado */}
                      <div className="flex-1 bg-white rounded-xl border border-[#d9e3ec] shadow-sm p-6 space-y-5">
                        <div className="border-b border-[#e5ecf3] pb-3 flex items-center justify-between">
                          <div>
                            <h4 className="font-bold text-xs uppercase tracking-wide text-[#0f2d59]">
                              Modificar lista: <span className="text-[#3d7bb5]">{configSubTab.toUpperCase()}</span>
                            </h4>
                            <p className="text-[11px] text-[#6b8299] mt-0.5">
                              Los valores aquí configurados son los que el usuario verá en el formulario de la OT.
                            </p>
                          </div>
                          <span className="text-xs font-mono font-bold text-[#526a84]">
                            {dropdownOptions[configSubTab]?.length} opciones
                          </span>
                        </div>

                        {/* Formulario para agregar nueva opción */}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            placeholder={`Escribir nuevo elemento para ${configSubTab}...`}
                            value={newOptionInput}
                            onChange={(e) => setNewOptionInput(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleAddDropdownOption(configSubTab);
                            }}
                            className="flex-1 px-3.5 py-2 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none text-xs bg-[#f8fafc]"
                          />
                          <button
                            onClick={() => handleAddDropdownOption(configSubTab)}
                            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-sm"
                          >
                            <Plus className="w-4 h-4" />
                            <span>Agregar Opción</span>
                          </button>
                        </div>

                        {/* Tabla de opciones actuales */}
                        <div className="border border-[#e2edf6] rounded-lg overflow-hidden">
                          <table className="w-full text-left text-xs">
                            <thead className="bg-[#f0f5fa] text-[#0f2d59] font-bold border-b border-[#dce5ee]">
                              <tr>
                                <th className="px-4 py-2.5 w-12 text-center">#</th>
                                <th className="px-4 py-2.5">Valor del Desplegable</th>
                                <th className="px-4 py-2.5 text-right w-24">Acción</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eef4f8] text-[#1c2d42]">
                              {dropdownOptions[configSubTab]?.map((item, index) => (
                                <tr key={index} className="hover:bg-[#fbfcfe] transition-colors">
                                  <td className="px-4 py-2.5 text-center font-mono text-[#6b8299] text-[11px]">
                                    {(index + 1).toString().padStart(2, '0')}
                                  </td>
                                  <td className="px-4 py-2.5 font-medium">
                                    {item}
                                  </td>
                                  <td className="px-4 py-2.5 text-right">
                                    <button
                                      onClick={() => handleRemoveDropdownOption(configSubTab, item)}
                                      className="p-1 rounded text-[#b91c1c] hover:bg-[#fee2e2] transition-colors"
                                      title="Eliminar opción"
                                    >
                                      <Trash2 className="w-3.5 h-3.5" />
                                    </button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>

                        <div className="p-3 rounded-lg bg-[#f9fbfe] border border-[#e2edf6] text-[11px] text-[#526a84]">
                          <strong>Nota institucional:</strong> Los cambios surten efecto inmediato tanto para las nuevas órdenes como para las previsualizaciones e impresiones.
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </main>
      </div>

      {/* MODAL CREAR / REGISTRAR / EDITAR ORDEN DE TRABAJO */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-white text-[#1c2d42] rounded-2xl shadow-xl border border-[#cfdbe6] overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#dce5ee] bg-[#f8fafc] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white">
                  <ClipboardList className="w-4 h-4" />
                </div>
                <div className="flex items-center space-x-2.5">
                  <h3 className="font-bold text-sm text-[#0f2d59]">
                    {isNewOrderModal ? `Registrar Nueva Orden de Trabajo (${formData.id})` : `Orden de Trabajo ${formData.id}`}
                  </h3>
                  
                  {/* Botón para desbloquear / habilitar edición: SOLAMENTE si la OT ya fue registrada */}
                  {!isNewOrderModal && (
                    <button
                      type="button"
                      onClick={() => setIsOrderEditLocked(!isOrderEditLocked)}
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded text-[11px] font-bold transition-colors ${
                        !isOrderEditLocked 
                          ? 'bg-[#166534] text-white hover:bg-[#14532d]' 
                          : 'bg-[#0f2d59] text-white hover:bg-[#153e77]'
                      }`}
                    >
                      <SlidersHorizontal className="w-3.5 h-3.5" />
                      <span>{!isOrderEditLocked ? 'Edición Habilitada' : 'Habilitar Edición'}</span>
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handlePreviewCurrent}
                    className="inline-flex items-center space-x-1 px-2.5 py-1 rounded bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] text-[11px] font-bold transition-colors"
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>Previsualizar</span>
                  </button>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {/* Control de estado y finalización con slider */}
                <div className="flex items-center space-x-2">
                  <select
                    disabled={!isNewOrderModal && isOrderEditLocked}
                    value={formData.estadoEjecucion}
                    onChange={(e) => {
                      const newStatus = e.target.value;
                      setFormData(prev => ({ ...prev, estadoEjecucion: newStatus }));
                    }}
                    className={`px-2 py-1 rounded text-[11px] font-bold border outline-none ${
                      formData.estadoEjecucion === 'Finalizada' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' :
                      formData.estadoEjecucion === 'Pendiente' ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]' :
                      'bg-slate-100 text-slate-700 border-slate-300'
                    } ${(!isNewOrderModal && isOrderEditLocked) ? 'opacity-80 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <option value="Sin Asignar">Sin Asignar</option>
                    <option value="Pendiente">Pendiente</option>
                    <option value="Finalizada">Finalizada</option>
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-[#eaf1f7] text-[#526a84]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Modal Form Body */}
            <div className="p-5 sm:p-6 overflow-y-auto space-y-4 text-xs flex-1">
              
              {!isNewOrderModal && isOrderEditLocked && (
                <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 flex items-center space-x-2">
                  <Info className="w-4 h-4 text-amber-600 flex-shrink-0" />
                  <span>Esta orden de trabajo se encuentra protegida. Haga clic en <strong>"Habilitar Edición"</strong> para modificar cualquier dato o estado.</span>
                </div>
              )}

              {/* Botón interactivo de finalización rápida si está pendiente */}
              {!isNewOrderModal && formData.estadoEjecucion !== 'Finalizada' && (
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                  <div>
                    <span className="font-bold text-[#0f2d59] text-[11px] block">¿Finalizar esta orden de trabajo?</span>
                    <span className="text-[10px] text-slate-500">Deslice el control al extremo para certificar la conclusión del servicio.</span>
                  </div>
                  <div>
                    <SlideToFinishButton
                      sheetId={formData.id}
                      monthWeeks={[1]}
                      isDone={false}
                      onFinish={() => {
                        setFormData(prev => ({ ...prev, estadoEjecucion: 'Finalizada' }));
                        setOrders(prev => prev.map(o => o.id === formData.id ? { ...o, estadoEjecucion: 'Finalizada' } : o));
                      }}
                      onReopen={() => {}}
                    />
                  </div>
                </div>
              )}

              {/* Aviso dinámico si hay campos faltantes */}
              {Object.keys(formErrors).length > 0 && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-red-700 flex items-center space-x-2 animate-pulse">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 text-red-600" />
                  <span className="font-semibold text-[11px]">
                    Por favor complete todos los campos obligatorios marcados en rojo antes de continuar.
                  </span>
                </div>
              )}

              {/* Sección 1: Datos de Solicitud */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0f2d59] border-b border-[#e2edf6] pb-1">
                  1. Datos de Solicitud
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className={`block font-semibold mb-1 ${formErrors.tipoMantenimiento ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                      Tipo de Mantenimiento *
                    </label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.tipoMantenimiento}
                      onChange={(e) => {
                        setFormData({ ...formData, tipoMantenimiento: e.target.value });
                        if (formErrors.tipoMantenimiento) setFormErrors(prev => ({ ...prev, tipoMantenimiento: false }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formErrors.tipoMantenimiento
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                          : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                      }`}
                    >
                      <option value="-- Seleccionar opción --">-- Seleccionar opción --</option>
                      <option value="Correctiva">Correctiva</option>
                      <option value="Preventiva">Preventiva</option>
                      <option value="Predictiva">Predictiva</option>
                      <option value="Inspección Edilicia">Inspección Edilicia</option>
                    </select>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${formErrors.dependencia ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                      Dependencia *
                    </label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.dependencia}
                      onChange={(e) => {
                        setFormData({ ...formData, dependencia: e.target.value });
                        if (formErrors.dependencia) setFormErrors(prev => ({ ...prev, dependencia: false }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formErrors.dependencia
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                          : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                      }`}
                    >
                      <option value="-- Seleccionar opción --">-- Seleccionar opción --</option>
                      {dropdownOptions.dependencias.map((dep, idx) => (
                        <option key={idx} value={dep}>{dep}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${formErrors.edificio ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                      Edificio *
                    </label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.edificio}
                      onChange={(e) => {
                        setFormData({ ...formData, edificio: e.target.value });
                        if (formErrors.edificio) setFormErrors(prev => ({ ...prev, edificio: false }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formErrors.edificio
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                          : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                      }`}
                    >
                      {dropdownOptions.edificios.map((edif, idx) => (
                        <option key={idx} value={edif}>{edif}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${formErrors.sector ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                      Piso *
                    </label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.sector}
                      onChange={(e) => {
                        setFormData({ ...formData, sector: e.target.value });
                        if (formErrors.sector) setFormErrors(prev => ({ ...prev, sector: false }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formErrors.sector
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                          : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                      }`}
                    >
                      <option value="-- Seleccionar opción --">-- Seleccionar opción --</option>
                      {dropdownOptions.pisos.map((p, idx) => (
                        <option key={idx} value={p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${formErrors.oficina ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                      Oficina *
                    </label>
                    <input
                      type="text"
                      disabled={isOrderEditLocked}
                      placeholder="Ej: Secretaría Penal N° 1 / Mesa de Entradas / Despacho"
                      value={formData.oficina}
                      onChange={(e) => {
                        setFormData({ ...formData, oficina: e.target.value });
                        if (formErrors.oficina) setFormErrors(prev => ({ ...prev, oficina: false }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formErrors.oficina
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                          : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Solicitante</label>
                    <input
                      type="text"
                      disabled={isOrderEditLocked}
                      placeholder="Nombre del solicitante"
                      value={formData.solicitante}
                      onChange={(e) => setFormData({ ...formData, solicitante: e.target.value })}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-[#1c2d42] ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>

                  <div>
                    <label className={`block font-semibold mb-1 ${formErrors.prioridad ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                      Prioridad *
                    </label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.prioridad}
                      onChange={(e) => {
                        setFormData({ ...formData, prioridad: e.target.value });
                        if (formErrors.prioridad) setFormErrors(prev => ({ ...prev, prioridad: false }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      } ${
                        formErrors.prioridad
                          ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                          : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                      }`}
                    >
                      <option value="-- Seleccionar opción --">-- Seleccionar opción --</option>
                      {dropdownOptions.prioridades.map((prio, idx) => (
                        <option key={idx} value={prio}>{prio}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Rubro Técnico</label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.rubro}
                      onChange={(e) => setFormData({ ...formData, rubro: e.target.value })}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-[#1c2d42] ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="-- Seleccionar opción --">-- Seleccionar opción --</option>
                      {dropdownOptions.rubros.map((rub, idx) => (
                        <option key={idx} value={rub}>{rub}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Fecha de Solicitud</label>
                    <input
                      type="text"
                      readOnly
                      value={formData.fechaSolicitud}
                      className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] bg-[#f8fafc] text-[#0f2d59] font-semibold cursor-not-allowed outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className={`block font-semibold mb-1 ${formErrors.descripcion ? 'text-red-600 font-bold' : 'text-[#384c63]'}`}>
                    Descripción del trabajo solicitado *
                  </label>
                  <textarea
                    rows="2"
                    disabled={isOrderEditLocked}
                    placeholder="Detalle el requerimiento específico de la dependencia..."
                    value={formData.descripcion}
                    onChange={(e) => {
                      setFormData({ ...formData, descripcion: e.target.value });
                      if (formErrors.descripcion) setFormErrors(prev => ({ ...prev, descripcion: false }));
                    }}
                    className={`w-full max-w-full px-3 py-1.5 rounded-lg border outline-none bg-white text-[#1c2d42] transition-colors ${
                      isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                    } ${
                      formErrors.descripcion
                        ? 'border-red-500 bg-red-50/50 ring-1 ring-red-400'
                        : 'border-[#cfdbe6] focus:border-[#0f2d59]'
                    }`}
                  ></textarea>
                </div>
              </div>

              {/* Sección 2: Asignación Técnica */}
              <div className="space-y-3">
                <div className="text-[11px] font-bold uppercase tracking-wider text-[#0f2d59] border-b border-[#e2edf6] pb-1">
                  2. Asignación Técnica
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Técnico Asignado</label>
                    <select
                      disabled={isOrderEditLocked}
                      value={formData.tecnico}
                      onChange={(e) => {
                        const val = e.target.value;
                        const hasTechnician = val && val !== '-- Seleccionar opción --';
                        setFormData(prev => ({
                          ...prev,
                          tecnico: val,
                          fechaAsignacion: hasTechnician ? (prev.fechaAsignacion || new Date().toLocaleDateString('es-AR')) : '',
                          // Si no hay técnico asignado y la orden no está finalizada, pasa automáticamente a "Sin Asignar"
                          estadoEjecucion: prev.estadoEjecucion === 'Finalizada' 
                            ? 'Finalizada' 
                            : (hasTechnician ? (prev.estadoEjecucion === 'Sin Asignar' ? 'Pendiente' : prev.estadoEjecucion) : 'Sin Asignar')
                        }));
                      }}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-[#1c2d42] ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      }`}
                    >
                      <option value="-- Seleccionar opción --">-- Seleccionar opción --</option>
                      {dropdownOptions.tecnicos.filter(t => t !== 'Otros').map((tec, idx) => (
                        <option key={idx} value={tec}>{tec}</option>
                      ))}
                      {dropdownOptions.tecnicos.includes('Otros') && (
                        <option value="Otros">Otros</option>
                      )}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Observaciones Técnicas / Coordinación</label>
                    <input
                      type="text"
                      disabled={isOrderEditLocked}
                      placeholder="Coordinar acceso, corte de energía, etc."
                      value={formData.observaciones}
                      onChange={(e) => setFormData({ ...formData, observaciones: e.target.value })}
                      className={`w-full max-w-full truncate px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-[#1c2d42] ${
                        isOrderEditLocked ? 'bg-slate-50 cursor-not-allowed' : ''
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Sección 3: Carga de Materiales con Controles +- */}
              <div className="space-y-3">
                <div className="flex flex-wrap items-center justify-between border-b border-[#e2edf6] pb-1 gap-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-[#0f2d59]">
                    3. Materiales o Repuestos Requeridos
                  </div>
                  {!isOrderEditLocked && (
                    <button
                      type="button"
                      onClick={handleOpenInventoryPicker}
                      className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-[11px] font-bold shadow-xs transition-colors"
                      title="Explorar y agregar artículos disponibles en el pañol de inventario"
                    >
                      <Boxes className="w-3.5 h-3.5 text-cyan-400" />
                      <span>Seleccionar desde Inventario</span>
                    </button>
                  )}
                </div>

                <div className="p-3.5 rounded-lg border border-[#dce5ee] bg-[#f8fafc] space-y-3">
                  {!isOrderEditLocked && (
                    <div className="flex flex-wrap items-center gap-2.5">
                      <div className="flex items-center rounded-lg border border-[#cfdbe6] bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setMatQty(prev => Math.max(1, prev - 1))}
                          className="px-2.5 py-1 font-bold text-[#526a84] hover:bg-[#eaf1f7]"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs font-mono text-[#0f2d59]">{matQty}</span>
                        <button
                          type="button"
                          onClick={() => setMatQty(prev => prev + 1)}
                          className="px-2.5 py-1 font-bold text-[#526a84] hover:bg-[#eaf1f7]"
                        >
                          +
                        </button>
                      </div>

                      <input
                        type="text"
                        placeholder="Descripción manual del material o repuesto..."
                        value={matDesc}
                        onChange={(e) => setMatDesc(e.target.value)}
                        className="flex-1 min-w-[200px] px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-[#1c2d42]"
                      />

                      <input
                        type="text"
                        value={matUnit}
                        onChange={(e) => setMatUnit(e.target.value)}
                        className="w-16 text-center px-2 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-[#1c2d42]"
                      />

                      <label className="flex items-center space-x-1.5 cursor-pointer px-2 select-none">
                        <input 
                          type="checkbox" 
                          checked={matDevolucion} 
                          onChange={(e) => setMatDevolucion(e.target.checked)}
                          className="w-4 h-4 rounded text-[#0f2d59] border-[#cfdbe6] focus:ring-[#0f2d59]"
                        />
                        <span className={`text-[11px] font-bold ${matDevolucion ? 'text-amber-800' : 'text-[#526a84]'}`}>
                          Requiere Devolución
                        </span>
                      </label>

                      <button
                        type="button"
                        onClick={handleAddMaterial}
                        className="px-3.5 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white font-semibold text-xs transition-colors"
                      >
                        + Agregar Manual
                      </button>
                    </div>
                  )}

                  {/* Lista de materiales cargados con toggle de Requiere Devolución */}
                  {formData.materiales.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {formData.materiales.map((m) => (
                        <div 
                          key={m.id}
                          className={`flex items-center justify-between px-3 py-2 rounded-lg text-xs border transition-colors ${
                            m.devolucion 
                              ? 'bg-amber-50/70 border-amber-300' 
                              : 'bg-white border-[#d9e2ec]'
                          }`}
                        >
                          <div className="flex items-center space-x-2.5 truncate max-w-[65%]">
                            <span className="font-mono font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded border border-[#cfe0ee] whitespace-nowrap">
                              {m.cantidad} {m.unidad}
                            </span>
                            <span className="text-[#1c2d42] font-semibold truncate" title={m.descripcion}>
                              {m.descripcion}
                            </span>
                          </div>

                          <div className="flex items-center space-x-3 flex-shrink-0">
                            {/* Control interactivo de Requiere Devolución */}
                            {!isOrderEditLocked ? (
                              <label className="flex items-center space-x-1.5 cursor-pointer select-none px-2 py-1 rounded-md hover:bg-slate-100 transition-colors">
                                <input 
                                  type="checkbox"
                                  checked={!!m.devolucion}
                                  onChange={() => handleToggleMaterialDevolucion(m.id)}
                                  className="w-4 h-4 rounded text-[#0f2d59] border-slate-300 focus:ring-[#0f2d59]"
                                />
                                <span className={`text-[11px] font-bold ${
                                  m.devolucion 
                                    ? 'text-[#92400e]' 
                                    : 'text-slate-500'
                                }`}>
                                  Requiere Devolución
                                </span>
                              </label>
                            ) : (
                              m.devolucion ? (
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-[#fef3c7] text-[#92400e] border border-[#fde68a]">
                                  Requiere Devolución
                                </span>
                              ) : null
                            )}

                            {!isOrderEditLocked && (
                              <button
                                type="button"
                                onClick={() => handleRemoveMaterial(m.id)}
                                className="text-slate-400 hover:text-rose-600 hover:bg-rose-50 p-1 rounded transition-colors"
                                title="Quitar insumo"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

            </div>

            {/* Modal Footer: Botones institucionales */}
            <div className="px-6 py-3.5 border-t border-[#dce5ee] bg-[#f0f5fa] flex flex-wrap items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-3 py-1.5 rounded-lg border border-[#cfdbe6] bg-white text-xs font-semibold text-[#526a84] hover:bg-[#f8fafc]"
              >
                Cerrar
              </button>

              <div className="flex items-center space-x-2">
                {(isNewOrderModal || !isOrderEditLocked) && (
                  <button
                    type="button"
                    onClick={handleRegisterOrder}
                    className="px-3.5 py-1.5 rounded-lg border border-[#0f2d59] text-[#0f2d59] hover:bg-[#e2edf6] text-xs font-semibold transition-colors"
                  >
                    {isNewOrderModal ? 'Registrar OT' : 'Guardar Cambios'}
                  </button>
                )}

                <button
                  type="button"
                  onClick={handleRegisterAndPrint}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>{isNewOrderModal ? 'Registrar e Imprimir / PDF' : 'Imprimir / Exportar a PDF'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL SECUNDARIO: BUSCADOR Y SELECTOR DE MATERIALES DESDE INVENTARIO / PAÑOL */}
      {isInventoryPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/75 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            
            {/* Cabecera del Selector */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center">
                  <Boxes className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Seleccionar Materiales desde Inventario</h4>
                  <p className="text-xs text-slate-500">
                    Búsqueda en tiempo real en pañol de intendencia para incorporar a la Orden de Trabajo ({formData.id})
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleConfirmExitInventoryPicker}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SECCIÓN SUPERIOR 1: RESUMEN DE INSUMOS SELECCIONADOS (PARTE SUPERIOR) */}
            <div className="p-3.5 rounded-xl border border-[#cfe0ee] bg-[#f0f6fa] space-y-2 flex-shrink-0 shadow-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[11px] uppercase tracking-wider text-[#0f2d59] flex items-center space-x-1.5">
                  <CheckSquare className="w-4 h-4 text-[#166534]" />
                  <span>Resumen de Insumos Seleccionados ({stagedInventoryItems.length})</span>
                </span>
                {stagedInventoryItems.length > 0 && (
                  <button
                    type="button"
                    onClick={() => setStagedInventoryItems([])}
                    className="text-[10px] font-bold text-rose-600 hover:text-rose-800 underline"
                  >
                    Vaciar selección
                  </button>
                )}
              </div>

              {stagedInventoryItems.length > 0 ? (
                <div className="max-h-36 overflow-y-auto space-y-1.5 pr-1">
                  {stagedInventoryItems.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center justify-between px-3 py-1.5 rounded-lg border border-[#b8d1e6] bg-white text-xs shadow-2xs"
                    >
                      <div className="flex items-center space-x-2.5 truncate max-w-[50%]">
                        <span className="font-mono font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded text-[10.5px] border border-[#cfe0ee]">
                          {item.codigo}
                        </span>
                        <span className="font-semibold text-slate-800 truncate" title={item.nombreSolo}>
                          {item.nombreSolo}
                        </span>
                      </div>

                      <div className="flex items-center space-x-2.5 flex-shrink-0">
                        {/* Checkbox interactivo en el resumen de inventario */}
                        <label className="flex items-center space-x-1.5 cursor-pointer select-none px-2 py-1 rounded bg-slate-50 border border-slate-200 hover:bg-slate-100">
                          <input
                            type="checkbox"
                            checked={!!item.devolucion}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              setStagedInventoryItems(prev => prev.map(si => 
                                si.id === item.id ? { ...si, devolucion: checked } : si
                              ));
                            }}
                            className="w-3.5 h-3.5 rounded text-[#0f2d59] border-slate-300 focus:ring-[#0f2d59]"
                          />
                          <span className={`text-[10px] font-bold ${item.devolucion ? 'text-amber-800' : 'text-slate-600'}`}>
                            Requiere Devolución
                          </span>
                        </label>

                        {/* Selector rápido de cantidad en el resumen superior */}
                        <div className="flex items-center rounded border border-slate-300 bg-slate-50 overflow-hidden">
                          <button
                            type="button"
                            disabled={item.cantidad <= 1}
                            onClick={() => handleUpdateStagedQty(item.id, item.cantidad - 1, item.maxStock)}
                            className="px-2 py-0.5 font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-40"
                          >
                            -
                          </button>
                          <span className="w-9 text-center font-bold text-xs font-mono text-[#0f2d59]">
                            {item.cantidad}
                          </span>
                          <button
                            type="button"
                            disabled={item.cantidad >= item.maxStock}
                            onClick={() => handleUpdateStagedQty(item.id, item.cantidad + 1, item.maxStock)}
                            className="px-2 py-0.5 font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-40"
                          >
                            +
                          </button>
                        </div>
                        <span className="font-medium text-slate-500 text-[11px] w-7">
                          {item.unidad}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveStagedItem(item.id)}
                          className="p-1 rounded text-rose-500 hover:bg-rose-50 transition-colors"
                          title="Quitar este material"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-2.5 text-center text-[11px] text-slate-500 italic bg-white/70 rounded-lg border border-dashed border-slate-200">
                  Ningún insumo seleccionado aún. Busque y haga clic en <strong>"+ Agregar a la OT"</strong> en la lista de abajo para sumarlo a este resumen.
                </div>
              )}
            </div>

            {/* Filtros y Buscador en Tiempo Real (Catálogo Inferior) */}
            <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between flex-shrink-0 pt-1">
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Buscar en pañol por código, descripción, material o ubicación..."
                  value={inventoryPickerSearch}
                  onChange={(e) => setInventoryPickerSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none text-slate-800 bg-[#fbfcfe]"
                  autoFocus
                />
              </div>

              <select
                value={inventoryPickerCategory}
                onChange={(e) => setInventoryPickerCategory(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-700 bg-white focus:border-[#0f2d59] outline-none"
              >
                <option value="all">Todas las Categorías</option>
                <option value="Electricidad">Electricidad</option>
                <option value="Bombas y Motores">Bombas y Motores</option>
                <option value="Sanitarios">Sanitarios</option>
                <option value="Cerrajería">Cerrajería</option>
                <option value="Albañilería">Albañilería</option>
              </select>
            </div>

            {/* Listado de Artículos con Ajuste de Cantidad y Botón de Incorporación Directa */}
            <div className="flex-1 overflow-y-auto border border-slate-200 rounded-xl divide-y divide-slate-100">
              {(() => {
                const filtered = inventarioData.filter(art => {
                  const matchCat = inventoryPickerCategory === 'all' || art.categoria === inventoryPickerCategory;
                  const query = inventoryPickerSearch.toLowerCase().trim();
                  const matchQuery = !query || 
                    art.codigo.toLowerCase().includes(query) ||
                    art.descripcion.toLowerCase().includes(query) ||
                    art.ubicacion.toLowerCase().includes(query) ||
                    art.categoria.toLowerCase().includes(query);
                  return matchCat && matchQuery;
                });

                if (filtered.length === 0) {
                  return (
                    <div className="p-8 text-center text-xs text-slate-400">
                      No se encontraron materiales que coincidan con la búsqueda.
                    </div>
                  );
                }

                return filtered.map((art) => {
                  // Calcular cuántas unidades de este artículo ya fueron cargadas al resumen superior de la OT
                  const stagedItem = stagedInventoryItems.find(i => i.inventarioId === art.id);
                  const stagedQty = stagedItem ? stagedItem.cantidad : 0;
                  
                  // Disponibilidad efectiva restante en tiempo real
                  const remainingStock = Math.max(0, (art.stockActual || 0) - stagedQty);
                  const isOutOfStock = remainingStock <= 0;
                  const currentQty = isOutOfStock ? 0 : Math.min(pickerQuantities[art.id] || 1, remainingStock);
                  const isLow = !isOutOfStock && remainingStock <= art.stockMinimo;
                  const isAtMax = !isOutOfStock && currentQty >= remainingStock;
                  const isAlreadyStaged = stagedQty > 0;

                  return (
                    <div 
                      key={art.id}
                      className={`p-3.5 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs ${
                        isOutOfStock ? 'bg-slate-50/80 opacity-70' : isAlreadyStaged ? 'bg-emerald-50/40' : 'hover:bg-[#f8fafc]'
                      }`}
                    >
                      <div className="space-y-1 min-w-0 flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-mono font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded text-[11px] border border-[#cfe0ee]">
                            {art.codigo}
                          </span>
                          <span className="text-[10.5px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-semibold">
                            {art.categoria}
                          </span>
                          <span className={`px-2 py-0.5 rounded font-mono font-bold text-[10.5px] ${
                            isOutOfStock
                              ? 'bg-red-100 text-red-800 border border-red-300 font-bold'
                              : isLow 
                              ? 'bg-amber-50 text-amber-800 border border-amber-300' 
                              : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                          }`}>
                            {isOutOfStock ? 'Sin Stock Disponible (0)' : `Disp: ${remainingStock} ${art.unidad}`}
                          </span>
                          {isAlreadyStaged && (
                            <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-1.5 py-0.5 rounded">
                              ✓ {stagedQty} {art.unidad} en resumen superior
                            </span>
                          )}
                          {isAtMax && (
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-50 border border-amber-200 px-1.5 py-0.5 rounded">
                              Máximo alcanzado ({remainingStock} {art.unidad})
                            </span>
                          )}
                        </div>
                        <h5 className="font-bold text-slate-800 text-xs leading-snug">
                          {art.descripcion}
                        </h5>
                        <p className="text-[10.5px] text-slate-500">
                          Ubicación: <strong>{art.ubicacion}</strong> &bull; Total en Pañol: <strong>{art.stockActual} {art.unidad}</strong> &bull; Costo unitario: <strong>{art.costoUnitario}</strong>
                        </p>
                      </div>

                      {/* Controles de Cantidad y Botón de Inserción */}
                      <div className="flex items-center space-x-2 flex-shrink-0 self-end sm:self-center">
                        <div className={`flex items-center rounded-lg border overflow-hidden ${
                          isOutOfStock ? 'border-slate-200 bg-slate-100 opacity-60' : 'border-slate-300 bg-white'
                        }`}>
                          <button
                            type="button"
                            disabled={isOutOfStock || currentQty <= 1}
                            onClick={() => {
                              setPickerQuantities(prev => ({
                                ...prev,
                                [art.id]: Math.max(1, (prev[art.id] || 1) - 1)
                              }));
                            }}
                            className={`px-2 py-1 font-bold ${
                              isOutOfStock || currentQty <= 1 
                                ? 'text-slate-300 cursor-not-allowed' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            -
                          </button>
                          <input
                            type="number"
                            min={isOutOfStock ? 0 : 1}
                            max={remainingStock}
                            disabled={isOutOfStock}
                            value={currentQty}
                            onChange={(e) => {
                              const val = parseInt(e.target.value, 10);
                              if (isNaN(val)) {
                                setPickerQuantities(prev => ({ ...prev, [art.id]: 1 }));
                                return;
                              }
                              const clamped = Math.min(remainingStock, Math.max(1, val));
                              setPickerQuantities(prev => ({ ...prev, [art.id]: clamped }));
                            }}
                            className="w-12 text-center font-bold text-xs font-mono text-[#0f2d59] outline-none bg-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                          />
                          <button
                            type="button"
                            disabled={isOutOfStock || isAtMax}
                            onClick={() => {
                              setPickerQuantities(prev => {
                                const curr = prev[art.id] || 1;
                                const nextVal = Math.min(remainingStock, curr + 1);
                                return {
                                  ...prev,
                                  [art.id]: nextVal
                                };
                              });
                            }}
                            className={`px-2 py-1 font-bold ${
                              isOutOfStock || isAtMax 
                                ? 'text-slate-300 cursor-not-allowed' 
                                : 'text-slate-600 hover:bg-slate-100'
                            }`}
                            title={isAtMax ? `No puede exceder el stock disponible restante (${remainingStock} ${art.unidad})` : ''}
                          >
                            +
                          </button>
                        </div>
                        <span className="text-[11px] text-slate-500 font-medium w-8">
                          {art.unidad}
                        </span>

                        <button
                          type="button"
                          disabled={isOutOfStock}
                          onClick={() => {
                            handleSelectFromInventory(art, currentQty);
                          }}
                          className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                            isOutOfStock
                              ? 'bg-slate-300 text-slate-500 cursor-not-allowed shadow-none'
                              : 'bg-[#0f2d59] hover:bg-[#163e75] active:bg-[#0a1e3b] text-white shadow-xs'
                          }`}
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>{isOutOfStock ? 'Sin Stock' : 'Agregar a la OT'}</span>
                        </button>
                      </div>
                    </div>
                  );
                });
              })()}
            </div>

            {/* Resumen de materiales ya incorporados y Cierre */}
            <div className="pt-2 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs flex-shrink-0">
              <span className="text-slate-600">
                Insumos en la canasta: <strong>{stagedInventoryItems.length} materiales listos</strong>
              </span>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsInventoryPickerOpen(false)}
                  className="px-3 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  disabled={stagedInventoryItems.length === 0}
                  onClick={handleConfirmExitInventoryPicker}
                  className={`px-4 py-2 rounded-lg font-bold text-xs transition-colors shadow-sm ${
                    stagedInventoryItems.length === 0
                      ? 'bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed shadow-none'
                      : 'bg-[#0f2d59] hover:bg-[#163e75] active:bg-[#0a1e3b] text-white cursor-pointer'
                  }`}
                  title={stagedInventoryItems.length === 0 ? 'Debe seleccionar al menos un insumo para incorporarlo' : 'Incorporar insumos seleccionados a la OT'}
                >
                  Incorporar seleccionados a OT
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* DIÁLOGO MODAL DE CONFIRMACIÓN AL SALIR: "USTED VA A INCORPORAR A ESTA ORDEN DE TRABAJO ESTOS INSUMOS, ¿CONTINUAR?" */}
      {showConfirmInventoryDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center space-x-3 text-[#0f2d59]">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-700" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0f2d59]">Confirmación de Asignación de Insumos</h4>
                <p className="text-xs text-slate-500">Orden de Trabajo: <strong>{formData.id}</strong></p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-2.5">
              <p className="font-bold text-[#0f2d59] text-xs leading-snug">
                Usted va a incorporar a esta orden de trabajo estos insumos, ¿continuar?
              </p>

              <div className="max-h-48 overflow-y-auto space-y-1.5 p-2 bg-white rounded-lg border border-amber-200">
                {stagedInventoryItems.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs py-1 border-b border-slate-100 last:border-b-0">
                    <span className="font-medium text-slate-800 truncate pr-2">
                      &bull; {item.descripcion}
                    </span>
                    <span className="font-mono font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 whitespace-nowrap">
                      {item.cantidad} {item.unidad}
                    </span>
                  </div>
                ))}
              </div>

              <p className="text-[10.5px] text-slate-500 italic">
                Al presionar "Continuar", los materiales quedarán asentados en la nómina de insumos requeridos de la orden.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setShowConfirmInventoryDialog(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Volver y Modificar
              </button>
              <button
                type="button"
                onClick={handleProceedAddingToOT}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
              >
                Continuar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA INCORPORAR / EDITAR PROVEEDOR */}
      {isProveedorModalOpen && editingProveedor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center flex-shrink-0">
                  <Truck className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">
                    {isNewProveedor ? 'Incorporar Proveedor al Padrón' : `Editar Proveedor [${editingProveedor.id}]`}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Registro de empresa conservadora, contratista o proveedor de bienes e insumos
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsProveedorModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3.5 pr-1 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-[#0f2d59] mb-1">Identificador *</label>
                  <input
                    type="text"
                    value={editingProveedor.id}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, id: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold text-[#0f2d59] outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-bold text-[#0f2d59] mb-1">Razón Social / Nombre Oficial *</label>
                  <input
                    type="text"
                    placeholder="Ej: ClimaTuc Ingeniería Térmica S.R.L."
                    value={editingProveedor.nombre}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, nombre: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 outline-none"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#0f2d59] mb-1">Categoría Oficial de Proveedor *</label>
                <select
                  value={editingProveedor.categoria}
                  onChange={(e) => setEditingProveedor({ ...editingProveedor, categoria: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-[#0f2d59] outline-none"
                >
                  {proveedoresCategorias.map((cat, idx) => (
                    <option key={idx} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#384c63] mb-1">CUIT / CUIL</label>
                  <input
                    type="text"
                    placeholder="30-71458921-9"
                    value={editingProveedor.cuit}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, cuit: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#384c63] mb-1">Persona de Contacto / Encargado</label>
                  <input
                    type="text"
                    placeholder="Ing. Marcelo Gómez"
                    value={editingProveedor.contacto}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, contacto: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-[#384c63] mb-1">Número de Contacto / Guardia</label>
                  <input
                    type="text"
                    placeholder="(0381) 430-5544 / 154-129845"
                    value={editingProveedor.telefono}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, telefono: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#384c63] mb-1">Correo Electrónico</label>
                  <input
                    type="email"
                    placeholder="mantenimiento@empresa.com.ar"
                    value={editingProveedor.email}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, email: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-[#384c63] mb-1">Dirección Comercial</label>
                  <input
                    type="text"
                    placeholder="Av. Sarmiento 830, San Miguel de Tucumán"
                    value={editingProveedor.direccion}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, direccion: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-[#384c63] mb-1">Estado</label>
                  <select
                    value={editingProveedor.estado}
                    onChange={(e) => setEditingProveedor({ ...editingProveedor, estado: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 outline-none"
                  >
                    <option value="Activo">Activo</option>
                    <option value="Suspendido">Suspendido</option>
                    <option value="En Trámite">En Trámite</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-[#384c63] mb-1">Contrato / Expediente de Imputación</label>
                <input
                  type="text"
                  placeholder="Ej: Licitación Pública N° 04/2025 - Expte. ADM-0890/2025"
                  value={editingProveedor.expteContrato}
                  onChange={(e) => setEditingProveedor({ ...editingProveedor, expteContrato: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-[#384c63] mb-1">Observaciones Operativas</label>
                <textarea
                  rows="2"
                  placeholder="Detalles sobre cronogramas, servicios amparados o repuestos suministrados..."
                  value={editingProveedor.observaciones}
                  onChange={(e) => setEditingProveedor({ ...editingProveedor, observaciones: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
              {!isNewProveedor ? (
                <button
                  type="button"
                  onClick={() => handleDeleteProveedor(editingProveedor.id)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Proveedor</span>
                </button>
              ) : <div></div>}

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsProveedorModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveProveedor}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isNewProveedor ? 'Guardar Nuevo Proveedor' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA DAR DE ALTA NUEVO USUARIO EN CONFIGURACIÓN */}
      {isNewUserModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-md my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center">
                  <Users className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Incorporar Nuevo Usuario</h4>
                  <p className="text-xs text-slate-500">Defina el nombre, usuario institucional y perfil de acceso</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewUserModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold mb-1 text-[#384c63]">Nombre y Apellido Completo *</label>
                <input
                  type="text"
                  placeholder="Ej: Ing. Martín Juárez"
                  value={newUserFormData.nombre}
                  onChange={(e) => setNewUserFormData({ ...newUserFormData, nombre: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-medium focus:border-[#0f2d59] outline-none"
                  autoFocus
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Usuario Institucional *</label>
                  <input
                    type="text"
                    placeholder="martin.juarez"
                    value={newUserFormData.usuario}
                    onChange={(e) => setNewUserFormData({ ...newUserFormData, usuario: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono focus:border-[#0f2d59] outline-none"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Contraseña Inicial</label>
                  <input
                    type="password"
                    placeholder="1234"
                    value={newUserFormData.clave}
                    onChange={(e) => setNewUserFormData({ ...newUserFormData, clave: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono focus:border-[#0f2d59] outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#384c63]">Correo Electrónico Oficial</label>
                <input
                  type="email"
                  placeholder="martin.juarez@pjn.gov.ar"
                  value={newUserFormData.email}
                  onChange={(e) => setNewUserFormData({ ...newUserFormData, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white focus:border-[#0f2d59] outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1 text-[#384c63]">Rol / Perfil de Acceso *</label>
                <div className="grid grid-cols-3 gap-2 pt-1">
                  {['Administrador', 'Encargado', 'Técnico'].map((rol) => (
                    <button
                      key={rol}
                      type="button"
                      onClick={() => setNewUserFormData({ ...newUserFormData, rol })}
                      className={`p-2 rounded-xl border text-center font-bold text-xs transition-all ${
                        newUserFormData.rol === rol
                          ? 'bg-[#0f2d59] text-white border-[#0f2d59] shadow-xs'
                          : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {rol}
                    </button>
                  ))}
                </div>
                <span className="text-[10px] text-slate-500 mt-1 block">
                  {newUserFormData.rol === 'Administrador' && 'Acceso total y configuración de parámetros institucionales.'}
                  {newUserFormData.rol === 'Encargado' && 'Control y supervisión de mantenimiento, bombas, finanzas e inventario.'}
                  {newUserFormData.rol === 'Técnico' && 'Ejecución operativa en campo y sincronización con el listado de técnicos de OT.'}
                </span>
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsNewUserModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleCreateUser}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
              >
                Crear Usuario
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA REGISTRAR NUEVO MOVIMIENTO DE FINANZAS */}
      {isFinanzasModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white ${
                  finanzasModalMode === 'Ingreso' ? 'bg-emerald-700' : 'bg-rose-700'
                }`}>
                  {finanzasModalMode === 'Ingreso' ? (
                    <ArrowDownRight className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
                  )}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">
                    {finanzasModalMode === 'Ingreso' ? 'Ingreso de Partidas Presupuestarias' : 'Registrar Egreso / Gasto'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {finanzasModalMode === 'Ingreso'
                      ? 'Asentar asignación, fondos rotatorios o reintegros de intendencia'
                      : 'Asentar adquisición de repuestos, servicios técnicos o compras'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsFinanzasModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3.5 text-xs flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Fecha de Registro</label>
                  <input
                    type="text"
                    value={newMovimiento.fecha}
                    onChange={(e) => setNewMovimiento({ ...newMovimiento, fecha: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                {finanzasModalMode === 'Ingreso' ? (
                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Tipo de Partida</label>
                    <select
                      value={newMovimiento.rubro}
                      onChange={(e) => setNewMovimiento({ ...newMovimiento, rubro: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-[#0f2d59]"
                    >
                      <option value="Partida Presupuestaria">Partida Presupuestaria</option>
                      <option value="Fondo Rotatorio">Fondo Rotatorio</option>
                      <option value="Caja Chica">Caja Chica</option>
                      <option value="Otros Ingresos">Otros Ingresos</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className={`block font-bold mb-1 ${egresoRubroError ? 'text-rose-600' : 'text-[#0f2d59]'}`}>
                      Rubro de Imputación * <span className="font-normal text-slate-500 text-[10px]">(Obligatorio - puede ser más de uno)</span>
                    </label>
                    <div className="text-[10.5px] font-semibold text-slate-600 mb-1">
                      {newMovimiento.rubrosSeleccionados && newMovimiento.rubrosSeleccionados.length > 0 ? (
                        <span className="text-[#166534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 inline-block font-mono">
                          {newMovimiento.rubrosSeleccionados.length} seleccionado(s)
                        </span>
                      ) : (
                        <span className={`px-2 py-0.5 rounded border inline-block ${
                          egresoRubroError 
                            ? 'bg-rose-50 text-rose-700 border-rose-300 font-bold' 
                            : 'bg-slate-100 text-slate-500 border-slate-200'
                        }`}>
                          -- Seleccionar rubro(s) --
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* SELECTOR MÚLTIPLE DE RUBROS PARA EGRESOS */}
              {finanzasModalMode === 'Egreso' && (
                <div className={`p-3 rounded-xl border transition-all ${
                  egresoRubroError 
                    ? 'border-rose-400 bg-rose-50/60 ring-2 ring-rose-200' 
                    : 'border-slate-200 bg-[#f8fafc]'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[11px] text-[#0f2d59] uppercase tracking-wide">
                      Seleccionar Rubro(s) de Imputación:
                    </span>
                    {newMovimiento.rubrosSeleccionados && newMovimiento.rubrosSeleccionados.length > 0 && (
                      <button
                        type="button"
                        onClick={() => setNewMovimiento(prev => ({ ...prev, rubrosSeleccionados: [], rubro: '' }))}
                        className="text-[10px] text-slate-400 hover:text-rose-600 underline cursor-pointer"
                      >
                        Limpiar selección
                      </button>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-1.5">
                    {[
                      'Electricidad',
                      'Bombas y Motores',
                      'Sanitarios',
                      'Reparaciones Mayores',
                      'Cerrajería',
                      'Albañilería',
                      'Pintura',
                      'Caja Chica'
                    ].map((rub) => {
                      const isSelected = (newMovimiento.rubrosSeleccionados || []).includes(rub);
                      return (
                        <button
                          key={rub}
                          type="button"
                          onClick={() => handleToggleEgresoRubro(rub)}
                          className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer select-none ${
                            isSelected
                              ? 'bg-[#0f2d59] text-white shadow-xs scale-102 border border-[#0f2d59]'
                              : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-100 hover:border-slate-400'
                          }`}
                        >
                          <span>{isSelected ? '✓ ' : '+ '}</span>
                          <span>{rub}</span>
                        </button>
                      );
                    })}
                  </div>

                  {egresoRubroError && (
                    <p className="text-[10.5px] font-bold text-rose-700 mt-2 flex items-center space-x-1 animate-pulse">
                      <span>⚠️ Debe seleccionar al menos un rubro para confirmar el egreso.</span>
                    </p>
                  )}
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1 text-[#384c63]">
                  {finanzasModalMode === 'Ingreso' ? 'Concepto de la Partida / Asignación *' : 'Concepto del Gasto / Compra *'}
                </label>
                <input
                  type="text"
                  placeholder={finanzasModalMode === 'Ingreso' ? 'Ej: Partida extraordinaria trimestral para mantenimiento edilicio' : 'Ej: Compra de 2 sellos mecánicos y capacitores para bombas'}
                  value={newMovimiento.concepto}
                  onChange={(e) => setNewMovimiento({ ...newMovimiento, concepto: e.target.value })}
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">
                    {finanzasModalMode === 'Ingreso' ? 'Nº Expediente / Resolución' : 'Nº Factura / Comprobante'}
                  </label>
                  <input
                    type="text"
                    placeholder={finanzasModalMode === 'Ingreso' ? 'Ej: Expte. ADM-1420/2026' : 'Factura Nº ...'}
                    value={newMovimiento.comprobante}
                    onChange={(e) => setNewMovimiento({ ...newMovimiento, comprobante: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Monto en Pesos ($) *</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="380.000"
                    value={newMovimiento.monto}
                    onChange={(e) => {
                      const formatted = formatMonedaInput(e.target.value);
                      setNewMovimiento({ ...newMovimiento, monto: formatted });
                    }}
                    className={`w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold text-sm ${
                      finanzasModalMode === 'Ingreso' ? 'text-[#166534]' : 'text-rose-700'
                    }`}
                  />
                </div>
              </div>

              {/* SECCIÓN DATOS DEL PROVEEDOR (SOLO PARA EGRESOS / GASTOS) */}
              {finanzasModalMode === 'Egreso' && (
                <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/70 space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-200 pb-1.5">
                    <div className="flex items-center space-x-2 text-[#0f2d59] font-bold text-xs uppercase tracking-wide">
                      <Building2 className="w-4 h-4 text-[#3d7bb5]" />
                      <span>Datos del Proveedor / Prestador</span>
                    </div>
                    <span className="text-[10px] text-slate-500 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200">
                      Padrón Oficial CFT
                    </span>
                  </div>

                  {/* SELECTOR DESDE EL LISTADO DE PROVEEDORES */}
                  <div>
                    <label className="block font-bold text-[#0f2d59] mb-1">
                      Seleccionar del Listado de Proveedores *
                    </label>
                    <select
                      value={newMovimiento.proveedorId || ''}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) {
                          setNewMovimiento(prev => ({
                            ...prev,
                            proveedorId: '',
                            proveedorNombre: '',
                            proveedorCuit: '',
                            proveedorTelefono: '',
                            proveedorEmail: '',
                            proveedorDireccion: ''
                          }));
                          return;
                        }
                        const provFound = proveedoresData.find(p => p.id === selectedId);
                        if (provFound) {
                          // Sugerir rubro si aún no seleccionó ninguno
                          let autoRubros = [...(newMovimiento.rubrosSeleccionados || [])];
                          let suggested = null;
                          if (provFound.categoria === 'Empresas conservadoras de Aire Acondicionado') suggested = 'Reparaciones Mayores';
                          else if (provFound.categoria === 'Conservadora de ascensor') suggested = 'Reparaciones Mayores';
                          else if (provFound.categoria === 'Servicio de desratizacion y desinfeccion') suggested = 'Reparaciones Mayores';
                          else if (provFound.categoria === 'Proveedores de bienes e insumos') {
                            if (provFound.nombre.toLowerCase().includes('hidráulica') || provFound.nombre.toLowerCase().includes('bomba')) {
                              suggested = 'Bombas y Motores';
                            } else if (provFound.nombre.toLowerCase().includes('electro')) {
                              suggested = 'Electricidad';
                            }
                          }

                          if (suggested && autoRubros.length === 0) {
                            autoRubros = [suggested];
                          }

                          setEgresoRubroError(false);
                          setNewMovimiento(prev => ({
                            ...prev,
                            proveedorId: provFound.id,
                            proveedorNombre: provFound.nombre,
                            proveedorCuit: provFound.cuit || '',
                            proveedorTelefono: provFound.telefono || '',
                            proveedorEmail: provFound.email || '',
                            proveedorDireccion: provFound.direccion || '',
                            rubrosSeleccionados: autoRubros,
                            rubro: autoRubros.join(', ')
                          }));
                        }
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-[#0f2d59] bg-white font-bold text-[#0f2d59] outline-none shadow-2xs"
                    >
                      <option value="">-- Seleccionar proveedor del padrón registrado --</option>
                      {proveedoresCategorias.map(cat => {
                        const provsInCat = proveedoresData.filter(p => p.categoria === cat);
                        if (provsInCat.length === 0) return null;
                        return (
                          <optgroup key={cat} label={cat}>
                            {provsInCat.map(p => (
                              <option key={p.id} value={p.id}>
                                [{p.id}] {p.nombre} {p.cuit ? `(CUIT: ${p.cuit})` : ''}
                              </option>
                            ))}
                          </optgroup>
                        );
                      })}
                    </select>
                    <span className="text-[10px] text-slate-500 mt-1 block">
                      Al elegir un proveedor se cargarán automáticamente su CUIT/CUIL, teléfono, email y dirección comercial.
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                    <div className="sm:col-span-2">
                      <label className="block font-semibold mb-1 text-[#384c63]">Razón Social / Nombre del Proveedor</label>
                      <input
                        type="text"
                        placeholder="Ej: Hidráulica Tucumán S.R.L. / Ferretería Central"
                        value={newMovimiento.proveedorNombre || ''}
                        onChange={(e) => setNewMovimiento({ ...newMovimiento, proveedorNombre: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium text-slate-800 focus:border-[#0f2d59] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-[#384c63]">CUIL / CUIT</label>
                      <input
                        type="text"
                        placeholder="Ej: 30-68912443-8"
                        value={newMovimiento.proveedorCuit || ''}
                        onChange={(e) => setNewMovimiento({ ...newMovimiento, proveedorCuit: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono text-slate-800 focus:border-[#0f2d59] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-[#384c63]">Número de Contacto</label>
                      <input
                        type="text"
                        placeholder="Ej: (0381) 424-8890"
                        value={newMovimiento.proveedorTelefono || ''}
                        onChange={(e) => setNewMovimiento({ ...newMovimiento, proveedorTelefono: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#0f2d59] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-[#384c63]">Correo Electrónico</label>
                      <input
                        type="email"
                        placeholder="ventas@proveedor.com.ar"
                        value={newMovimiento.proveedorEmail || ''}
                        onChange={(e) => setNewMovimiento({ ...newMovimiento, proveedorEmail: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#0f2d59] outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-[#384c63]">Dirección</label>
                      <input
                        type="text"
                        placeholder="Ej: Av. Mate de Luna 2450"
                        value={newMovimiento.proveedorDireccion || ''}
                        onChange={(e) => setNewMovimiento({ ...newMovimiento, proveedorDireccion: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#0f2d59] outline-none"
                      />
                    </div>
                  </div>
                </div>
              )}

              {finanzasModalMode === 'Ingreso' && (
                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Responsable / Autoridad</label>
                  <input
                    type="text"
                    value={newMovimiento.responsable}
                    onChange={(e) => setNewMovimiento({ ...newMovimiento, responsable: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>
              )}

              <div>
                <label className="block font-semibold mb-1 text-[#384c63]">Observaciones Adicionales</label>
                <textarea
                  rows="2"
                  value={newMovimiento.observaciones}
                  onChange={(e) => setNewMovimiento({ ...newMovimiento, observaciones: e.target.value })}
                  placeholder="Detalles sobre destino, fondos o partidas asociadas..."
                  className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-xs"
                />
              </div>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsFinanzasModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors cursor-pointer"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveMovimiento}
                className={`px-4 py-2 rounded-lg text-white text-xs font-bold shadow-sm transition-colors cursor-pointer ${
                  finanzasModalMode === 'Ingreso' ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-rose-700 hover:bg-rose-800'
                }`}
              >
                {finanzasModalMode === 'Ingreso' ? 'Confirmar Ingreso de Partida' : 'Confirmar Egreso'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA AGREGAR NUEVO ARTÍCULO O REPONER STOCK EN INVENTARIO */}
      {isInventarioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-lg my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center">
                  <Boxes className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Incorporar Artículos al Pañol</h4>
                  <p className="text-xs text-slate-500">Seleccione si realizará reposición de existencias o catalogación de un nuevo insumo</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsInventarioModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SELECTOR INICIAL: ¿REPOSICIÓN DE STOCK O NUEVO ARTÍCULO? */}
            <div className="grid grid-cols-2 gap-2 p-1.5 bg-slate-100 rounded-xl border border-slate-200">
              <button
                type="button"
                onClick={() => {
                  setInventarioModalMode('reposicion');
                  const currentArt = inventarioData.find(a => a.id === reposicionData.articuloId) || inventarioData[0];
                  if (currentArt) {
                    setReposicionData(prev => ({
                      ...prev,
                      articuloId: currentArt.id,
                      nuevoCostoUnitario: prev.nuevoCostoUnitario || currentArt.costoUnitario.replace(/[\$\s]/g, '')
                    }));
                  }
                }}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  inventarioModalMode === 'reposicion'
                    ? 'bg-[#0f2d59] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <RotateCw className="w-3.5 h-3.5 text-cyan-300" />
                <span>Reposición de Stock</span>
              </button>

              <button
                type="button"
                onClick={() => setInventarioModalMode('nuevo')}
                className={`flex items-center justify-center space-x-2 py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                  inventarioModalMode === 'nuevo'
                    ? 'bg-[#0f2d59] text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-200/60'
                }`}
              >
                <Plus className="w-3.5 h-3.5 text-emerald-300" />
                <span>Nuevo Artículo</span>
              </button>
            </div>

            {/* MODO 1: REPOSICIÓN DE STOCK (ARTÍCULO EXISTENTE) */}
            {inventarioModalMode === 'reposicion' ? (() => {
              // Filtrado en vivo de los artículos por Rubro / Categoría y por búsqueda de texto
              const filteredArticulosReposicion = inventarioData.filter(art => {
                const matchRubro = !reposicionData.filtroRubro || reposicionData.filtroRubro === 'all' || art.categoria === reposicionData.filtroRubro;
                const query = (reposicionData.busquedaTexto || '').toLowerCase().trim();
                const matchQuery = !query ||
                  art.codigo.toLowerCase().includes(query) ||
                  art.descripcion.toLowerCase().includes(query) ||
                  art.ubicacion.toLowerCase().includes(query) ||
                  art.categoria.toLowerCase().includes(query);
                return matchRubro && matchQuery;
              });

              // Si el artículo actualmente elegido ya no entra en el filtro, sugerir el primero disponible
              const activeArtId = reposicionData.articuloId && filteredArticulosReposicion.some(a => a.id === reposicionData.articuloId)
                ? reposicionData.articuloId
                : (filteredArticulosReposicion[0]?.id || reposicionData.articuloId);

              const selectedArt = inventarioData.find(a => a.id === activeArtId) || filteredArticulosReposicion[0] || inventarioData[0];
              const qtySumar = Math.max(0, parseInt(reposicionData.cantidadSumar, 10) || 0);
              const resultingStock = selectedArt ? selectedArt.stockActual + qtySumar : qtySumar;

              return (
                <div className="space-y-3.5 text-xs">
                  {/* SELECTOR DE VINCULACIÓN A FACTURA DE EGRESO (OPCIONAL) */}
                  <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                    <label className="block font-bold text-[#0f2d59] text-[11px] flex items-center justify-between">
                      <span className="flex items-center space-x-1.5">
                        <FileText className="w-3.5 h-3.5 text-rose-600" />
                        <span>Vincular a Factura / Comprobante de Egreso (Opcional)</span>
                      </span>
                      <span className="text-[10px] text-amber-700 font-semibold bg-white px-2 py-0.5 rounded border border-amber-200">
                        Ingresos y Egresos
                      </span>
                    </label>
                    <select
                      value={reposicionData.comprobanteEgresoId || ''}
                      onChange={(e) => {
                        const selectedId = e.target.value;
                        if (!selectedId) {
                          setReposicionData(prev => ({
                            ...prev,
                            comprobanteEgresoId: '',
                            comprobanteRef: ''
                          }));
                          return;
                        }
                        const egresoFound = finanzasData.find(m => m.id === selectedId);
                        if (egresoFound) {
                          const costFormatted = egresoFound.monto.replace(/[\$\s]/g, '');
                          setReposicionData(prev => ({
                            ...prev,
                            comprobanteEgresoId: egresoFound.id,
                            comprobanteRef: egresoFound.comprobante || egresoFound.id,
                            nuevoCostoUnitario: costFormatted
                          }));
                        }
                      }}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-medium text-slate-800"
                    >
                      <option value="">-- Sin vincular / Carga manual independiente --</option>
                      {finanzasData.filter(m => m.tipo === 'Egreso').map(m => (
                        <option key={m.id} value={m.id}>
                          [{m.comprobante || m.id}] {m.concepto} — {m.monto} ({m.fecha})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* NUEVA BARRA DE FILTRADO RÁPIDO: ESPACIO PARA ESCRIBIR Y SELECTOR POR RUBRO */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                    <span className="text-[10.5px] font-bold uppercase tracking-wider text-[#0f2d59] flex items-center justify-between">
                      <span>Búsqueda Rápida de Insumos</span>
                      <span className="text-slate-500 font-mono text-[10px]">
                        {filteredArticulosReposicion.length} insumos disponibles
                      </span>
                    </span>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          type="text"
                          placeholder="Buscar por nombre, código o ubicación..."
                          value={reposicionData.busquedaTexto || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setReposicionData(prev => ({ ...prev, busquedaTexto: val }));
                          }}
                          className="w-full pl-8 pr-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-medium focus:border-[#0f2d59] outline-none"
                        />
                      </div>

                      <div>
                        <select
                          value={reposicionData.filtroRubro || 'all'}
                          onChange={(e) => {
                            const rubro = e.target.value;
                            setReposicionData(prev => ({ ...prev, filtroRubro: rubro }));
                          }}
                          className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs font-semibold text-slate-700 focus:border-[#0f2d59] outline-none"
                        >
                          <option value="all">Rubro: Todos los rubros</option>
                          <option value="Electricidad">Electricidad</option>
                          <option value="Bombas y Motores">Bombas y Motores</option>
                          <option value="Sanitarios">Sanitarios</option>
                          <option value="Cerrajería">Cerrajería</option>
                          <option value="Albañilería">Albañilería</option>
                          <option value="Pintura">Pintura</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* CUADRO / TABLA VISUAL CON TODOS LOS INSUMOS CATALOGADOS (REEMPLAZO DE LA LISTA DESPLEGABLE) */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="block font-bold text-[#0f2d59] text-[11px]">
                        Cuadro de Insumos Catalogados (Haga clic para seleccionar) *
                      </label>
                      <span className="text-[10px] text-slate-500 font-medium">
                        Seleccionado: <strong className="text-[#0f2d59] font-mono">{selectedArt ? `[${selectedArt.codigo}]` : 'Ninguno'}</strong>
                      </span>
                    </div>

                    <div className="border border-slate-300 rounded-xl overflow-hidden max-h-48 overflow-y-auto bg-white shadow-inner">
                      {filteredArticulosReposicion.length > 0 ? (
                        <div className="divide-y divide-slate-100">
                          {filteredArticulosReposicion.map(art => {
                            const isSelected = selectedArt?.id === art.id;
                            const isLowStock = art.stockActual <= art.stockMinimo;

                            return (
                              <div
                                key={art.id}
                                onClick={() => {
                                  setReposicionData(prev => ({
                                    ...prev,
                                    articuloId: art.id,
                                    nuevoCostoUnitario: art.costoUnitario.replace(/[\$\s]/g, '')
                                  }));
                                }}
                                className={`p-2.5 flex items-center justify-between cursor-pointer transition-all ${
                                  isSelected
                                    ? 'bg-[#0f2d59] text-white shadow-xs'
                                    : 'hover:bg-slate-50 text-slate-800'
                                }`}
                              >
                                <div className="min-w-0 pr-2">
                                  <div className="flex items-center space-x-2">
                                    <span className={`font-mono font-bold text-[10.5px] px-1.5 py-0.5 rounded border ${
                                      isSelected
                                        ? 'bg-white/20 border-white/30 text-white'
                                        : 'bg-[#eef4f9] border-[#cfe0ee] text-[#0f2d59]'
                                    }`}>
                                      {art.codigo}
                                    </span>
                                    <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                                      isSelected
                                        ? 'bg-white/10 text-cyan-200'
                                        : 'bg-slate-100 text-slate-600'
                                    }`}>
                                      {art.categoria}
                                    </span>
                                  </div>
                                  <p className={`font-bold text-xs mt-1 leading-snug truncate ${
                                    isSelected ? 'text-white' : 'text-slate-900'
                                  }`}>
                                    {art.descripcion}
                                  </p>
                                  <span className={`text-[10px] block truncate ${
                                    isSelected ? 'text-slate-300' : 'text-slate-500'
                                  }`}>
                                    {art.ubicacion}
                                  </span>
                                </div>

                                <div className="text-right flex-shrink-0 space-y-0.5">
                                  <span className={`inline-block font-mono font-bold text-[11px] px-2 py-0.5 rounded ${
                                    isSelected
                                      ? 'bg-white/20 text-white'
                                      : isLowStock
                                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                                      : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                                  }`}>
                                    Stock: {art.stockActual} {art.unidad}
                                  </span>
                                  <span className={`block font-mono text-[10.5px] font-semibold ${
                                    isSelected ? 'text-emerald-300' : 'text-slate-700'
                                  }`}>
                                    {art.costoUnitario}
                                  </span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <div className="p-6 text-center text-xs text-rose-600 font-medium">
                          No se encontraron insumos que coincidan con la búsqueda o el rubro seleccionado.
                        </div>
                      )}
                    </div>
                  </div>

                  {/* FICHA TÉCNICA RÁPIDA DEL ARTÍCULO SELECCIONADO */}
                  {selectedArt && (
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-slate-600">Categoría: <strong className="text-slate-800">{selectedArt.categoria}</strong></span>
                        <span className="font-semibold text-slate-600">Ubicación: <strong className="text-slate-800">{selectedArt.ubicacion}</strong></span>
                      </div>
                      <div className="flex items-center justify-between pt-1 border-t border-slate-200 text-[11.5px]">
                        <span>Stock Actual: <strong className="text-[#0f2d59] font-mono">{selectedArt.stockActual} {selectedArt.unidad}</strong></span>
                        <span>Precio Unitario Anterior: <strong className="text-slate-700 font-mono">{selectedArt.costoUnitario}</strong></span>
                      </div>
                    </div>
                  )}

                  {/* CANTIDAD A SUMAR Y ACTUALIZACIÓN DE PRECIO POR ÚLTIMA COMPRA */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold mb-1 text-[#0f2d59]">
                        Cantidad a Reponer / Sumar *
                      </label>
                      <div className="flex items-center rounded-lg border border-slate-300 bg-white overflow-hidden">
                        <button
                          type="button"
                          onClick={() => setReposicionData(prev => ({ ...prev, cantidadSumar: Math.max(0, (parseInt(prev.cantidadSumar, 10) || 0) - 1) }))}
                          className="px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-100 select-none"
                        >
                          -
                        </button>
                        <input
                          type="number"
                          min="0"
                          value={reposicionData.cantidadSumar}
                          onChange={(e) => {
                            const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                            setReposicionData({ ...reposicionData, cantidadSumar: isNaN(val) ? 0 : Math.max(0, val) });
                          }}
                          className="w-full text-center font-mono font-bold text-xs text-[#0f2d59] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        />
                        <button
                          type="button"
                          onClick={() => setReposicionData(prev => ({ ...prev, cantidadSumar: (parseInt(prev.cantidadSumar, 10) || 0) + 1 }))}
                          className="px-3 py-1.5 font-bold text-slate-600 hover:bg-slate-100 select-none"
                        >
                          +
                        </button>
                      </div>
                      <span className="text-[10px] text-slate-500 mt-0.5 block">Unidades que ingresan físicamente al pañol</span>
                    </div>

                    <div>
                      <label className="block font-bold mb-1 text-[#0f2d59]">
                        Nuevo Costo Unitario ($) *
                      </label>
                      <input
                        type="text"
                        inputMode="decimal"
                        placeholder="Ej: 5.400"
                        value={reposicionData.nuevoCostoUnitario}
                        onChange={(e) => {
                          const formatted = formatMonedaInput(e.target.value);
                          setReposicionData({ ...reposicionData, nuevoCostoUnitario: formatted });
                        }}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold text-[#166534] focus:border-[#0f2d59] outline-none"
                      />
                      <span className="text-[10px] text-slate-500 mt-0.5 block">Precio unitario actualizado del último ingreso</span>
                    </div>
                  </div>

                  {/* RESUMEN COMPARATIVO EN TIEMPO REAL */}
                  {selectedArt && (
                    <div className="p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl space-y-1 text-xs">
                      <div className="font-bold text-emerald-900 flex items-center space-x-1.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                        <span>Balance Resultante tras Reposición:</span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] pt-1">
                        <span>Stock: <span className="line-through text-slate-500 font-mono">{selectedArt.stockActual}</span> → <strong className="text-emerald-800 font-mono text-xs">{resultingStock} {selectedArt.unidad}</strong></span>
                        <span>Precio: <span className="line-through text-slate-500 font-mono">{selectedArt.costoUnitario}</span> → <strong className="text-emerald-800 font-mono text-xs">${reposicionData.nuevoCostoUnitario || selectedArt.costoUnitario.replace('$', '')}</strong></span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })() : (
              /* MODO 2: NUEVO ARTÍCULO (CATALOGACIÓN DESDE CERO) */
              <div className="space-y-3.5 text-xs">
                {/* SELECTOR DE VINCULACIÓN A FACTURA / EGRESO REGISTRADO */}
                <div className="p-3 bg-amber-50/70 border border-amber-200 rounded-xl space-y-1.5">
                  <label className="block font-bold text-[#0f2d59] text-[11px] flex items-center justify-between">
                    <span className="flex items-center space-x-1.5">
                      <FileText className="w-3.5 h-3.5 text-rose-600" />
                      <span>Vincular a Factura / Comprobante de Egreso (Opcional)</span>
                    </span>
                    <span className="text-[10px] text-amber-700 font-semibold bg-white px-2 py-0.5 rounded border border-amber-200">
                      Ingresos y Egresos
                    </span>
                  </label>
                  <select
                    value={newArticulo.comprobanteEgresoId || ''}
                    onChange={(e) => {
                      const selectedId = e.target.value;
                      if (!selectedId) {
                        setNewArticulo(prev => ({
                          ...prev,
                          comprobanteEgresoId: '',
                          comprobanteRef: ''
                        }));
                        return;
                      }
                      const egresoFound = finanzasData.find(m => m.id === selectedId);
                      if (egresoFound) {
                        const costFormatted = egresoFound.monto.replace(/[\$\s]/g, '');
                        // Mapear rubro financiero a categoría de pañol
                        let mappedCategory = 'Electricidad';
                        if (egresoFound.rubro === 'Bombas y Motores' || egresoFound.rubro === 'Reparaciones Mayores') mappedCategory = 'Bombas y Motores';
                        else if (egresoFound.rubro === 'Sanitarios') mappedCategory = 'Sanitarios';
                        else if (egresoFound.rubro === 'Albañilería') mappedCategory = 'Albañilería';
                        else if (egresoFound.rubro === 'Cerrajería') mappedCategory = 'Cerrajería';

                        setNewArticulo(prev => ({
                          ...prev,
                          comprobanteEgresoId: egresoFound.id,
                          comprobanteRef: egresoFound.comprobante || egresoFound.id,
                          descripcion: prev.descripcion || egresoFound.concepto,
                          categoria: mappedCategory,
                          costoUnitario: prev.costoUnitario || costFormatted
                        }));
                      }
                    }}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-amber-300 bg-white font-medium text-slate-800"
                  >
                    <option value="">-- Sin vincular / Carga manual independiente --</option>
                    {finanzasData.filter(m => m.tipo === 'Egreso').map(m => (
                      <option key={m.id} value={m.id}>
                        [{m.comprobante || m.id}] {m.concepto} — {m.monto} ({m.fecha})
                      </option>
                    ))}
                  </select>
                  <p className="text-[10px] text-slate-500">
                    Al elegir una factura se autocompletará el comprobante, sugerirá la descripción y registrará la trazabilidad con Finanzas.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Código / Tag (Opcional)</label>
                    <input
                      type="text"
                      placeholder="Ej: MAT-ELEC-05"
                      value={newArticulo.codigo}
                      onChange={(e) => setNewArticulo({ ...newArticulo, codigo: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block font-semibold text-[#384c63]">Categoría *</label>
                      <div className="flex items-center space-x-1.5">
                        <button
                          type="button"
                          onClick={() => {
                            setIsAddingNewCategoria(!isAddingNewCategoria);
                            setIsManagingCategorias(false);
                          }}
                          className="text-[10px] font-bold text-[#0f2d59] hover:underline"
                        >
                          {isAddingNewCategoria ? 'Cancelar' : '+ Nueva'}
                        </button>
                        <span className="text-slate-300">|</span>
                        <button
                          type="button"
                          onClick={() => {
                            setIsManagingCategorias(!isManagingCategorias);
                            setIsAddingNewCategoria(false);
                          }}
                          className="text-[10px] font-bold text-rose-600 hover:underline"
                        >
                          {isManagingCategorias ? 'Listo' : 'Eliminar'}
                        </button>
                      </div>
                    </div>

                    {isAddingNewCategoria ? (
                      <div className="flex items-center space-x-1">
                        <input
                          type="text"
                          placeholder="Nombre de nueva categoría..."
                          value={newCategoriaNombre}
                          onChange={(e) => setNewCategoriaNombre(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleCrearCategoria();
                            }
                          }}
                          autoFocus
                          className="flex-1 px-2.5 py-1.5 rounded-lg border border-[#0f2d59] bg-white text-xs font-semibold text-[#0f2d59] outline-none"
                        />
                        <button
                          type="button"
                          onClick={handleCrearCategoria}
                          className="px-2.5 py-1.5 bg-[#0f2d59] text-white rounded-lg font-bold text-xs hover:bg-[#163e75]"
                        >
                          Guardar
                        </button>
                      </div>
                    ) : (
                      <select
                        value={newArticulo.categoria}
                        onChange={(e) => setNewArticulo({ ...newArticulo, categoria: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-[#0f2d59]"
                      >
                        {inventarioCategorias.map((cat, idx) => (
                          <option key={idx} value={cat}>{cat}</option>
                        ))}
                      </select>
                    )}

                    {/* Modo gestión y eliminación de categorías */}
                    {isManagingCategorias && (
                      <div className="mt-2 p-2 bg-rose-50/70 border border-rose-200 rounded-lg space-y-1 text-xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-800 block">
                          Eliminar Categorías Existentes:
                        </span>
                        <div className="max-h-24 overflow-y-auto space-y-1 pr-1">
                          {inventarioCategorias.map((cat) => (
                            <div key={cat} className="flex items-center justify-between bg-white px-2 py-1 rounded border border-rose-100">
                              <span className="font-semibold text-slate-800 text-[11px]">{cat}</span>
                              <button
                                type="button"
                                onClick={() => handleEliminarCategoria(cat)}
                                className="text-rose-600 hover:text-rose-800 p-0.5 rounded hover:bg-rose-50"
                                title={`Eliminar categoría ${cat}`}
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Descripción del Material / Repuesto *</label>
                  <input
                    type="text"
                    placeholder="Ej: Cable unipolar 2.5mm² Normalizado Prysmian (Rollo 100m)"
                    value={newArticulo.descripcion}
                    onChange={(e) => setNewArticulo({ ...newArticulo, descripcion: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Ubicación Física en Edificio / Pañol</label>
                  <input
                    type="text"
                    placeholder="Ej: Pañol Central - Estante A3"
                    value={newArticulo.ubicacion}
                    onChange={(e) => setNewArticulo({ ...newArticulo, ubicacion: e.target.value })}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Stock Inicial</label>
                    <input
                      type="number"
                      min="0"
                      value={newArticulo.stockActual}
                      onChange={(e) => setNewArticulo({ ...newArticulo, stockActual: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Stock Mínimo</label>
                    <input
                      type="number"
                      min="0"
                      value={newArticulo.stockMinimo}
                      onChange={(e) => setNewArticulo({ ...newArticulo, stockMinimo: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Unidad</label>
                    <select
                      value={newArticulo.unidad}
                      onChange={(e) => setNewArticulo({ ...newArticulo, unidad: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white"
                    >
                      <option value="Un.">Unidades</option>
                      <option value="Juego">Juego / Kit</option>
                      <option value="Metros">Metros</option>
                      <option value="Cartucho">Cartucho</option>
                      <option value="Litros">Litros</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold mb-1 text-[#384c63]">Costo Unitario Estimado ($)</label>
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="4.200"
                    value={newArticulo.costoUnitario}
                    onChange={(e) => {
                      const formatted = formatMonedaInput(e.target.value);
                      setNewArticulo({ ...newArticulo, costoUnitario: formatted });
                    }}
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold text-[#166534]"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-end space-x-2 pt-2 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setIsInventarioModalOpen(false)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveArticulo}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
              >
                {inventarioModalMode === 'reposicion' ? 'Confirmar Reposición de Stock' : 'Catalogar Nuevo Artículo'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL EDITABLE: FICHA TÉCNICA DE BOMBA, RASTREO FÍSICO E HISTORIAL DE REPARACIONES */}
      {isBombaModalOpen && editingBomba && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-white text-[#1c2d42] rounded-2xl shadow-xl border border-[#cfdbe6] overflow-hidden flex flex-col max-h-[92vh]">
            
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#dce5ee] bg-[#f8fafc] flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-[#0f2d59] flex items-center justify-center text-white">
                  <Droplets className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-[#eef4f9] text-[#0f2d59] border border-[#cfe0ee]">
                      {editingBomba.id}
                    </span>
                    <h3 className="font-bold text-sm text-[#0f2d59]">{editingBomba.nombre}</h3>
                  </div>
                  <p className="text-[10.5px] text-[#526a84]">
                    Ficha Técnica Electromecánica · Tag Físico: <strong>{editingBomba.tagFisico}</strong>
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSaveBomba}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold transition-colors shadow-xs"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Cambios</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsBombaModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-[#eaf1f7] text-[#526a84]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Pestañas del Modal: Datos Técnicos vs Historial de Reparaciones */}
            <div className="px-6 pt-3 border-b border-[#e5ecf3] bg-white flex items-center space-x-4 text-xs font-semibold">
              <button
                type="button"
                onClick={() => setBombaModalTab('tecnica')}
                className={`pb-2.5 flex items-center space-x-2 border-b-2 transition-all ${
                  bombaModalTab === 'tecnica'
                    ? 'border-[#0f2d59] text-[#0f2d59] font-bold'
                    : 'border-transparent text-[#6b8299] hover:text-[#0f2d59]'
                }`}
              >
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Datos Técnicos y Posición de Montaje</span>
              </button>

              <button
                type="button"
                onClick={() => setBombaModalTab('reparaciones')}
                className={`pb-2.5 flex items-center space-x-2 border-b-2 transition-all ${
                  bombaModalTab === 'reparaciones'
                    ? 'border-[#0f2d59] text-[#0f2d59] font-bold'
                    : 'border-transparent text-[#6b8299] hover:text-[#0f2d59]'
                }`}
              >
                <History className="w-3.5 h-3.5" />
                <span>Historial de Reparaciones ({editingBomba.reparaciones?.length || 0})</span>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs flex-1">
              
              {/* TAB 1: DATOS TÉCNICOS Y POSICIÓN DE MONTAJE */}
              {bombaModalTab === 'tecnica' && (
                <div className="space-y-4">
                  
                  {/* Designación y Estado Oficial de Bomba */}
                  <div className="p-4 rounded-xl border border-[#cfe0ee] bg-[#f0f6fa] space-y-3">
                    <div className="font-bold text-[11px] uppercase tracking-wider text-[#0f2d59] flex items-center space-x-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#3d7bb5]" />
                      <span>1. Designación y Estado de la Bomba</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Designación / Tag Físico (Placa) *</label>
                        <input
                          type="text"
                          value={editingBomba.tagFisico || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, tagFisico: e.target.value })}
                          placeholder="Ej: CFT-BOM-ELEV-01"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none font-mono font-bold text-[#0f2d59] bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Nombre Descriptivo</label>
                        <input
                          type="text"
                          value={editingBomba.nombre}
                          onChange={(e) => setEditingBomba({ ...editingBomba, nombre: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Estado de la Bomba *</label>
                        <select
                          value={editingBomba.estado || 'Operativa'}
                          onChange={(e) => setEditingBomba({ ...editingBomba, estado: e.target.value })}
                          className={`w-full px-3 py-1.5 rounded-lg border outline-none font-bold text-xs ${
                            editingBomba.estado === 'Operativa' ? 'bg-[#dcfce7] text-[#166534] border-[#86efac]' :
                            editingBomba.estado === 'A Reparar' ? 'bg-[#fef9c3] text-[#854d0e] border-[#fde047]' :
                            'bg-[#fee2e2] text-[#991b1b] border-[#fca5a5]'
                          }`}
                        >
                          <option value="Operativa">Operativa</option>
                          <option value="A Reparar">A Reparar</option>
                          <option value="En Reparación">En Reparación</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Posición Física: Desplegable con Cuadros + Depósito + Taller y Selección de Posición 01 / 02 */}
                  <div className="p-4 rounded-xl border border-amber-200 bg-amber-50/60 space-y-3">
                    <div className="font-bold text-[11px] uppercase tracking-wider text-[#92400e] flex items-center space-x-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-700" />
                      <span>2. Posición Física (Ubicación y Montaje)</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                      <div>
                        <label className="block font-semibold mb-1 text-[#92400e]">Ubicación Física General *</label>
                        <select
                          value={editingBomba.cuadro || 'EN DEPÓSITO'}
                          onChange={(e) => {
                            const newLoc = e.target.value;
                            const isCuadro = newLoc !== 'EN DEPÓSITO' && newLoc !== 'TALLER';
                            
                            if (isCuadro) {
                              // Verificar qué ranuras están libres en este nuevo cuadro (excluyendo la bomba que estamos editando)
                              const ocupadaSlot1 = bombasData.some(b => b.id !== editingBomba.id && b.cuadro === newLoc && b.posicionSlot === 1);
                              const ocupadaSlot2 = bombasData.some(b => b.id !== editingBomba.id && b.cuadro === newLoc && b.posicionSlot === 2);
                              
                              let availableSlot = null;
                              if (!ocupadaSlot1) {
                                availableSlot = 1;
                              } else if (!ocupadaSlot2) {
                                availableSlot = 2;
                              } else {
                                // Ambas están ocupadas
                                availableSlot = null;
                              }

                              const slotTxt = availableSlot ? ` - POSICIÓN ${availableSlot === 1 ? '01' : '02'}` : '';

                              setEditingBomba({
                                ...editingBomba,
                                cuadro: newLoc,
                                posicionSlot: availableSlot,
                                posicionInstalacion: `${newLoc}${slotTxt}`,
                                ubicacion: '2° Subsuelo - Sala de Instalaciones'
                              });
                            } else {
                              setEditingBomba({
                                ...editingBomba,
                                cuadro: newLoc,
                                posicionSlot: null,
                                posicionInstalacion: newLoc,
                                ubicacion: newLoc === 'EN DEPÓSITO' ? 'Depósito Central' : 'Taller Externo de Mantenimiento'
                              });
                            }
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-amber-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-[#0f2d59]"
                        >
                          <optgroup label="Cuadros de Bombas Edilicios">
                            {cuadrosData.map((c) => {
                              const bOcupadas = bombasData.filter(b => b.id !== editingBomba.id && b.cuadro === c.nombre);
                              const totalOcupadas = bOcupadas.length;
                              const isFull = totalOcupadas >= 2;

                              return (
                                <option 
                                  key={c.nombre} 
                                  value={c.nombre}
                                  disabled={isFull && editingBomba.cuadro !== c.nombre}
                                >
                                  {c.nombre} {isFull && editingBomba.cuadro !== c.nombre ? ' [COMPLETO - 2/2]' : `(${totalOcupadas}/2 ocupadas)`}
                                </option>
                              );
                            })}
                          </optgroup>
                          <optgroup label="Otras Ubicaciones">
                            <option value="EN DEPÓSITO">EN DEPÓSITO</option>
                            <option value="TALLER">TALLER</option>
                          </optgroup>
                        </select>
                      </div>

                      {/* Selector de Posición 01 o 02 con filtro estricto anti-duplicados */}
                      {editingBomba.cuadro !== 'EN DEPÓSITO' && editingBomba.cuadro !== 'TALLER' ? (() => {
                        // Buscar bombas que ocupan las posiciones en el cuadro seleccionado, excluyendo la actual
                        const bombaOcupante1 = bombasData.find(b => b.id !== editingBomba.id && b.cuadro === editingBomba.cuadro && b.posicionSlot === 1);
                        const bombaOcupante2 = bombasData.find(b => b.id !== editingBomba.id && b.cuadro === editingBomba.cuadro && b.posicionSlot === 2);

                        const isPos1Ocupada = !!bombaOcupante1;
                        const isPos2Ocupada = !!bombaOcupante2;

                        return (
                          <div>
                            <label className="block font-semibold mb-1 text-[#92400e]">Ranura en Cuadro (Posición) *</label>
                            {isPos1Ocupada && isPos2Ocupada ? (
                              <div className="p-2 rounded-lg bg-red-50 border border-red-300 text-red-700 text-[11px] font-semibold">
                                ⚠️ Ambas posiciones están ocupadas ({bombaOcupante1.tagFisico || bombaOcupante1.id} y {bombaOcupante2.tagFisico || bombaOcupante2.id}). Debe reasignar o liberar una bomba previa para asignar este cuadro.
                              </div>
                            ) : (
                              <select
                                value={editingBomba.posicionSlot || (isPos1Ocupada ? 2 : 1)}
                                onChange={(e) => {
                                  const slotVal = parseInt(e.target.value) || 1;
                                  const slotLabel = slotVal === 1 ? '01' : '02';
                                  setEditingBomba({
                                    ...editingBomba,
                                    posicionSlot: slotVal,
                                    posicionInstalacion: `${editingBomba.cuadro} - POSICIÓN ${slotLabel}`
                                  });
                                }}
                                className="w-full px-3 py-1.5 rounded-lg border border-amber-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-[#0f2d59]"
                              >
                                <option value={1} disabled={isPos1Ocupada}>
                                  POSICIÓN 01 {isPos1Ocupada ? `[OCUPADA por ${bombaOcupante1.tagFisico || bombaOcupante1.id}]` : '(Disponible)'}
                                </option>
                                <option value={2} disabled={isPos2Ocupada}>
                                  POSICIÓN 02 {isPos2Ocupada ? `[OCUPADA por ${bombaOcupante2.tagFisico || bombaOcupante2.id}]` : '(Disponible)'}
                                </option>
                              </select>
                            )}
                          </div>
                        );
                      })() : (
                        <div className="flex flex-col justify-end">
                          <div className="p-2 rounded bg-white/80 border border-amber-200 text-[11px] text-[#92400e]">
                            Bomba fuera de cuadros operativos. La ranura en el cuadro quedará como <strong>"SIN BOMBA ASIGNADA"</strong>.
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="text-[11px] text-[#78350f] pt-1">
                      <strong>Ubicación registrada:</strong> {editingBomba.posicionInstalacion || editingBomba.cuadro}
                    </div>
                  </div>

                  {/* Parámetros Electromecánicos e Hidráulicos */}
                  <div className="space-y-3">
                    <div className="font-bold text-[11px] uppercase tracking-wider text-[#0f2d59] border-b border-[#e2edf6] pb-1">
                      3. Especificaciones Técnicas del Fabricante
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3.5">
                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Marca</label>
                        <input
                          type="text"
                          value={editingBomba.marca || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, marca: e.target.value })}
                          placeholder="Ej: Motorarg / Grundfos / Flygt"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Modelo</label>
                        <input
                          type="text"
                          value={editingBomba.modelo || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, modelo: e.target.value })}
                          placeholder="Ej: BC-300 Trifásica"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Potencia (HP / kW)</label>
                        <input
                          type="text"
                          value={editingBomba.potencia || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, potencia: e.target.value })}
                          placeholder="Ej: 5.5 HP / 4.1 kW"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Caudal Nominal</label>
                        <input
                          type="text"
                          value={editingBomba.caudal || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, caudal: e.target.value })}
                          placeholder="Ej: 24 m³/h (400 L/min)"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Altura Manométrica (mca)</label>
                        <input
                          type="text"
                          value={editingBomba.alturaManometrica || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, alturaManometrica: e.target.value })}
                          placeholder="Ej: 42 mca"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Tensión y Fases</label>
                        <input
                          type="text"
                          value={editingBomba.voltaje || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, voltaje: e.target.value })}
                          placeholder="Ej: 380 V (Trifásico)"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Velocidad Nominal (RPM)</label>
                        <input
                          type="text"
                          value={editingBomba.rpm || ''}
                          onChange={(e) => setEditingBomba({ ...editingBomba, rpm: e.target.value })}
                          placeholder="Ej: 2900 RPM"
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Horas de Uso Acumuladas</label>
                        <input
                          type="number"
                          value={editingBomba.horasUso || 0}
                          onChange={(e) => setEditingBomba({ ...editingBomba, horasUso: parseInt(e.target.value) || 0 })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-mono"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Técnico Responsable</label>
                        <select
                          value={dropdownOptions.tecnicos.includes(editingBomba.tecnicoResponsable) ? editingBomba.tecnicoResponsable : 'Otros'}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingBomba({ 
                              ...editingBomba, 
                              tecnicoResponsable: val,
                              tecnicoResponsableOtro: val === 'Otros' ? (editingBomba.tecnicoResponsableOtro || '') : ''
                            });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-medium"
                        >
                          {dropdownOptions.tecnicos.filter(t => t !== 'Otros').map((t, idx) => (
                            <option key={idx} value={t}>{t}</option>
                          ))}
                          {dropdownOptions.tecnicos.includes('Otros') && (
                            <option value="Otros">Otros</option>
                          )}
                        </select>

                        {/* Campo manual si se elige 'Otros' en ficha de bomba */}
                        {(editingBomba.tecnicoResponsable === 'Otros' || (!dropdownOptions.tecnicos.includes(editingBomba.tecnicoResponsable) && editingBomba.tecnicoResponsable)) && (
                          <input
                            type="text"
                            placeholder="Escribir nombre del técnico o empresa..."
                            value={editingBomba.tecnicoResponsableOtro !== undefined ? editingBomba.tecnicoResponsableOtro : (dropdownOptions.tecnicos.includes(editingBomba.tecnicoResponsable) ? '' : editingBomba.tecnicoResponsable)}
                            onChange={(e) => setEditingBomba({ 
                              ...editingBomba, 
                              tecnicoResponsableOtro: e.target.value,
                              tecnicoResponsable: e.target.value || 'Otros'
                            })}
                            className="mt-1.5 w-full px-3 py-1.5 rounded-lg border border-amber-300 focus:border-[#0f2d59] outline-none bg-amber-50/50 text-[#0f2d59] font-medium"
                          />
                        )}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-semibold mb-1 text-[#384c63]">Observaciones de Estado y Mantenimiento</label>
                    <textarea
                      rows="2"
                      value={editingBomba.observaciones || ''}
                      onChange={(e) => setEditingBomba({ ...editingBomba, observaciones: e.target.value })}
                      placeholder="Asentar novedades sobre estanqueidad, temperatura, vibraciones o rodamientos..."
                      className="w-full px-3 py-2 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-xs"
                    ></textarea>
                  </div>
                </div>
              )}

              {/* TAB 2: HISTORIAL DE REPARACIONES */}
              {bombaModalTab === 'reparaciones' && (
                <div className="space-y-4">
                  {/* Formulario para Asentar Nueva Reparación con Costo y Selección de Operario */}
                  <div className="p-4 rounded-xl border border-[#cfe0ee] bg-[#f8fafc] space-y-3">
                    <div className="font-bold text-xs uppercase tracking-wide text-[#0f2d59] flex items-center space-x-2">
                      <Plus className="w-4 h-4 text-[#3d7bb5]" />
                      <span>Registrar Nueva Reparación / Intervención Técnica</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Fecha de Intervención</label>
                        <input
                          type="text"
                          value={newReparacion.fecha}
                          onChange={(e) => setNewReparacion({ ...newReparacion, fecha: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Tipo de Trabajo / Tarea *</label>
                        <input
                          type="text"
                          placeholder="Ej: Cambio de Sello Mecánico"
                          value={newReparacion.tipo}
                          onChange={(e) => setNewReparacion({ ...newReparacion, tipo: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-medium"
                        />
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Técnico / Taller Interviniente *</label>
                        <select
                          value={newReparacion.tecnico}
                          onChange={(e) => setNewReparacion({ ...newReparacion, tecnico: e.target.value })}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-medium text-[#1c2d42]"
                        >
                          <option value="Elegir operario">Elegir operario</option>
                          {dropdownOptions.tecnicos.filter(t => t !== 'Otros').map((tec, idx) => (
                            <option key={idx} value={tec}>{tec}</option>
                          ))}
                          {dropdownOptions.tecnicos.includes('Otros') && (
                            <option value="Otros">Otros</option>
                          )}
                        </select>

                        {/* Campo para escribir manualmente al seleccionar "Otros" */}
                        {newReparacion.tecnico === 'Otros' && (
                          <input
                            type="text"
                            placeholder="Escribir operario o taller..."
                            value={newReparacion.tecnicoOtro}
                            onChange={(e) => setNewReparacion({ ...newReparacion, tecnicoOtro: e.target.value })}
                            className="mt-1.5 w-full px-2.5 py-1.5 rounded-lg border border-amber-300 focus:border-[#0f2d59] outline-none bg-amber-50/50 text-[#0f2d59] font-medium text-xs animate-in fade-in duration-150"
                            autoFocus
                          />
                        )}
                      </div>

                      <div>
                        <label className="block font-semibold mb-1 text-[#384c63]">Costo de Reparación ($)</label>
                        <input
                          type="text"
                          inputMode="decimal"
                          placeholder="85.000"
                          value={newReparacion.costo}
                          onChange={(e) => {
                            const formatted = formatMonedaInput(e.target.value);
                            setNewReparacion({ ...newReparacion, costo: formatted });
                          }}
                          className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white font-mono font-bold text-[#166534]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-semibold mb-1 text-[#384c63]">Detalle Técnico de la Reparación y Repuestos</label>
                      <textarea
                        rows="2"
                        placeholder="Descripción de repuestos reemplazados, pruebas de aislamiento megado y ensayos hidráulicos..."
                        value={newReparacion.detalle}
                        onChange={(e) => setNewReparacion({ ...newReparacion, detalle: e.target.value })}
                        className="w-full px-3 py-1.5 rounded-lg border border-[#cfdbe6] focus:border-[#0f2d59] outline-none bg-white text-xs leading-relaxed"
                      ></textarea>
                    </div>

                    <div className="flex justify-end">
                      <button
                        type="button"
                        onClick={handleAddReparacionToBomba}
                        className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-xs"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Asentar Reparación en Bitácora</span>
                      </button>
                    </div>
                  </div>

                  {/* Listado Histórico de Reparaciones con Modo de Edición */}
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between pb-1 border-b border-[#e2edf6]">
                      <span className="font-bold text-xs uppercase text-[#0f2d59]">Historial Cronológico de Intervenciones</span>
                      <span className="text-[11px] font-semibold text-[#526a84]">
                        {editingBomba.reparaciones?.length || 0} registros asentados
                      </span>
                    </div>

                    {editingBomba.reparaciones && editingBomba.reparaciones.length > 0 ? (
                      <div className="space-y-2.5">
                        {editingBomba.reparaciones.map(rep => {
                          const isEditingThis = editingReparacionId === rep.id;

                          if (isEditingThis) {
                            return (
                              <div 
                                key={rep.id}
                                className="p-4 rounded-xl border-2 border-[#0f2d59] bg-[#f0f6fa] shadow-md space-y-3 animate-in fade-in duration-150"
                              >
                                <div className="flex items-center justify-between border-b border-slate-300 pb-2">
                                  <span className="font-bold text-xs uppercase text-[#0f2d59] flex items-center space-x-1.5">
                                    <Edit3 className="w-3.5 h-3.5 text-[#3d7bb5]" />
                                    <span>Modificar Registro de Reparación</span>
                                  </span>
                                  <button
                                    type="button"
                                    onClick={handleCancelEditReparacion}
                                    className="text-xs text-slate-500 hover:text-slate-800"
                                  >
                                    ✕ Cancelar
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
                                  <div>
                                    <label className="block font-semibold mb-1 text-[#384c63]">Fecha</label>
                                    <input
                                      type="text"
                                      value={editReparacionData.fecha}
                                      onChange={(e) => setEditReparacionData({ ...editReparacionData, fecha: e.target.value })}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                                    />
                                  </div>

                                  <div>
                                    <label className="block font-semibold mb-1 text-[#384c63]">Trabajo / Tarea</label>
                                    <input
                                      type="text"
                                      value={editReparacionData.tipo}
                                      onChange={(e) => setEditReparacionData({ ...editReparacionData, tipo: e.target.value })}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                                    />
                                  </div>

                                  <div>
                                    <label className="block font-semibold mb-1 text-[#384c63]">Técnico / Taller</label>
                                    <select
                                      value={editReparacionData.tecnico}
                                      onChange={(e) => setEditReparacionData({ ...editReparacionData, tecnico: e.target.value })}
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-medium"
                                    >
                                      <option value="Elegir operario">Elegir operario</option>
                                      {dropdownOptions.tecnicos.filter(t => t !== 'Otros').map((tec, idx) => (
                                        <option key={idx} value={tec}>{tec}</option>
                                      ))}
                                      {dropdownOptions.tecnicos.includes('Otros') && (
                                        <option value="Otros">Otros</option>
                                      )}
                                    </select>

                                    {/* Campo para escribir manualmente al editar si es "Otros" */}
                                    {editReparacionData.tecnico === 'Otros' && (
                                      <input
                                        type="text"
                                        placeholder="Escribir operario o taller..."
                                        value={editReparacionData.tecnicoOtro}
                                        onChange={(e) => setEditReparacionData({ ...editReparacionData, tecnicoOtro: e.target.value })}
                                        className="mt-1.5 w-full px-2.5 py-1.5 rounded-lg border border-amber-300 focus:border-[#0f2d59] outline-none bg-amber-50/50 text-[#0f2d59] font-medium text-xs animate-in fade-in duration-150"
                                        autoFocus
                                      />
                                    )}
                                  </div>

                                  <div>
                                    <label className="block font-semibold mb-1 text-[#384c63]">Costo ($)</label>
                                    <input
                                      type="text"
                                      inputMode="decimal"
                                      value={editReparacionData.costo}
                                      onChange={(e) => {
                                        const formatted = formatMonedaInput(e.target.value);
                                        setEditReparacionData({ ...editReparacionData, costo: formatted });
                                      }}
                                      placeholder="85.000"
                                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold text-[#166534]"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="block font-semibold mb-1 text-[#384c63]">Detalle Técnico y Repuestos</label>
                                  <textarea
                                    rows="2"
                                    value={editReparacionData.detalle}
                                    onChange={(e) => setEditReparacionData({ ...editReparacionData, detalle: e.target.value })}
                                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white text-xs leading-relaxed"
                                  />
                                </div>

                                <div className="flex justify-end space-x-2 pt-1">
                                  <button
                                    type="button"
                                    onClick={handleCancelEditReparacion}
                                    className="px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 bg-white hover:bg-slate-50 transition-colors"
                                  >
                                    Cancelar
                                  </button>
                                  <button
                                    type="button"
                                    onClick={handleSaveEditReparacion}
                                    className="inline-flex items-center space-x-1 px-3.5 py-1.5 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold transition-colors shadow-2xs"
                                  >
                                    <Save className="w-3.5 h-3.5" />
                                    <span>Guardar Edición</span>
                                  </button>
                                </div>
                              </div>
                            );
                          }

                          return (
                            <div 
                              key={rep.id} 
                              className="p-3.5 rounded-xl border border-[#d9e3ec] bg-white shadow-xs hover:bg-[#fbfcfe] transition-colors space-y-1.5"
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <span className="font-bold text-xs text-[#0f2d59]">{rep.tipo}</span>
                                  <span className="text-[10px] px-2 py-0.5 rounded bg-[#eef4f9] text-[#0f2d59] font-semibold border border-[#cfe0ee]">
                                    {rep.fecha}
                                  </span>
                                </div>

                                <div className="flex items-center space-x-2.5">
                                  <span className="font-mono text-xs font-bold text-[#166534] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                                    {rep.costo || '—'}
                                  </span>

                                  {/* Botón Editar Reparación */}
                                  <button
                                    type="button"
                                    onClick={() => handleStartEditReparacion(rep)}
                                    className="p-1 rounded text-[#0f2d59] hover:bg-[#e2edf6] transition-colors"
                                    title="Editar este registro de reparación"
                                  >
                                    <Edit3 className="w-3.5 h-3.5 text-[#3d7bb5]" />
                                  </button>

                                  {/* Botón Eliminar Reparación */}
                                  <button
                                    type="button"
                                    onClick={() => handleRemoveReparacion(rep.id)}
                                    className="text-red-500 hover:text-red-700 hover:bg-red-50 p-1 rounded transition-colors"
                                    title="Eliminar registro"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </div>

                              <p className="text-xs text-slate-700 leading-relaxed">{rep.detalle}</p>
                              
                              <div className="text-[10.5px] text-slate-500 pt-1 border-t border-slate-100 flex items-center justify-between">
                                <span>Técnico / Operario: <strong>{rep.tecnico}</strong></span>
                                <span className="italic">Certificado por Intendencia CFT</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="p-8 text-center border border-dashed border-[#cfdbe6] rounded-xl text-slate-400 text-xs">
                        No se registran reparaciones previas para este equipo.
                      </div>
                    )}
                  </div>
                </div>
              )}

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 border-t border-[#dce5ee] bg-[#f0f5fa] flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setIsBombaModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-[#cfdbe6] bg-white text-xs font-semibold text-[#526a84] hover:bg-[#f8fafc]"
                >
                  Cerrar
                </button>

                <button
                  type="button"
                  onClick={() => handleDeleteBomba(editingBomba.id)}
                  className="inline-flex items-center space-x-1 px-3 py-2 rounded-lg border border-red-300 bg-red-50 text-red-700 hover:bg-red-100 text-xs font-bold transition-colors"
                  title="Eliminar este equipo definitivamente"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Borrar Bomba</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleSaveBomba}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Guardar Datos Técnicos e Historial</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL PREVIEW DE FICHA EDILICIA */}
      {isCatalogPreviewOpen && selectedCatalogSheet && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl my-6 bg-white text-slate-900 rounded-2xl shadow-xl p-6 overflow-hidden border border-[#cfdbe6]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-[#0f2d59]" />
                <h3 className="font-bold text-sm text-[#0f2d59]">Previsualización Oficial — Ficha Edilicia {catalogFormData.code}</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    handlePrintDocument('ficha');
                  }}
                  className="px-3 py-1.5 bg-[#0f2d59] text-white rounded-lg text-xs font-bold hover:bg-[#153e77] transition-colors"
                >
                  Imprimir / PDF
                </button>
                <button
                  onClick={() => setIsCatalogPreviewOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            <div className="max-h-[80vh] overflow-y-auto py-4 space-y-4 font-sans text-xs bg-white">
              <div className="border border-slate-300 p-6 space-y-4">
                <div className="flex justify-between items-start pb-2 border-b-2 border-[#0f2d59]">
                  <div className="flex items-center space-x-3.5">
                    <EscudoPJN className="w-12 h-16 object-contain" />
                    <div>
                      <h4 className="font-serif font-black text-xs text-[#0f2d59] tracking-wider uppercase">Poder Judicial de la Nación</h4>
                      <h3 className="font-serif font-black text-sm text-[#0f2d59] tracking-wide uppercase">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</h3>
                      <p className="font-bold text-[11px] text-slate-800 tracking-wider">INTENDENCIA — FICHA TÉCNICA EDILICIA</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="bg-[#0f2d59] text-white px-4 py-1.5 rounded font-mono font-bold text-xs tracking-wider inline-block">
                      CÓDIGO: {catalogFormData.code}
                    </div>
                    <div className="text-[10px] text-slate-600 font-semibold mt-1">
                      Fecha: {catalogFormData.fechaInspeccion}
                    </div>
                  </div>
                </div>

                <div className="bg-[#0f2d59] text-white text-center py-1.5 rounded font-bold text-xs uppercase tracking-widest">
                  {catalogFormData.nombre}
                </div>

                <div className="border border-slate-300 p-3 space-y-2">
                  <div><strong className="text-slate-700">Grupo:</strong> {catalogFormData.grupo}</div>
                  <div><strong className="text-slate-700">Frecuencia reglamentaria:</strong> {catalogFormData.freq}</div>
                  <div><strong className="text-slate-700">Inspector Responsable:</strong> {catalogFormData.inspector}</div>
                </div>

                <div className="border border-slate-300 p-3 space-y-1">
                  <strong className="text-slate-800 block uppercase">1. Observaciones Técnicas:</strong>
                  <p className="text-slate-700 leading-relaxed">{catalogFormData.observacionesTecnicas}</p>
                </div>

                <div className="border border-slate-300 p-3 space-y-1">
                  <strong className="text-slate-800 block uppercase">2. Hallazgos y Estado del Sistema:</strong>
                  <p className="text-slate-700 leading-relaxed">{catalogFormData.hallazgos}</p>
                </div>

                <div className="border border-slate-300 p-3 space-y-1">
                  <strong className="text-slate-800 block uppercase">3. Recomendaciones:</strong>
                  <p className="text-slate-700 leading-relaxed">{catalogFormData.recomendaciones}</p>
                </div>

                <div className="pt-6 grid grid-cols-2 gap-16 text-center">
                  <div>
                    <div className="border-b border-slate-800 pb-6 mb-1"></div>
                    <span className="font-bold text-[11px] text-slate-800">Firma del Inspector Técnico</span>
                  </div>
                  <div>
                    <div className="border-b border-slate-800 pb-6 mb-1"></div>
                    <span className="font-bold text-[11px] text-slate-800">Firma de Intendencia</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL PREVIEW / VISTA PREVIA A4 (Pantalla) */}
      {isPreviewOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-4xl my-6 bg-white text-slate-900 rounded-2xl shadow-xl p-6 overflow-hidden border border-[#cfdbe6]">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2">
                <Printer className="w-5 h-5 text-[#0f2d59]" />
                <h3 className="font-bold text-sm text-[#0f2d59]">Previsualización Oficial — Orden de Trabajo A4</h3>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => {
                    handlePrintDocument('order', selectedOrder);
                  }}
                  className="px-3 py-1.5 bg-[#0f2d59] text-white rounded-lg text-xs font-bold hover:bg-[#153e77] transition-colors"
                >
                  Imprimir / Descargar PDF
                </button>
                <button
                  onClick={() => setIsPreviewOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Vista Previa Renderizada */}
            <div className="max-h-[80vh] overflow-y-auto py-4 space-y-6">
              
              {/* Carilla 1 */}
              <div className="border border-slate-300 p-6 space-y-3 font-sans text-xs bg-white shadow-sm min-h-[820px] flex flex-col justify-between">
                <div>
                  {/* Membrete Oficial */}
                  <div className="flex justify-between items-start pb-2 border-b-2 border-[#0f2d59]">
                    <div className="flex items-center space-x-3.5">
                      <div className="flex items-center justify-center">
                        <EscudoPJN className="w-12 h-16 object-contain" />
                      </div>
                      <div>
                        <h4 className="font-serif font-black text-xs text-[#0f2d59] tracking-wider uppercase">Poder Judicial de la Nación</h4>
                        <h3 className="font-serif font-black text-sm text-[#0f2d59] tracking-wide uppercase">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</h3>
                        <p className="font-bold text-[11px] text-slate-800 tracking-wider">INTENDENCIA</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-[#0f2d59] text-white px-4 py-1.5 rounded-lg font-mono font-bold text-sm tracking-wider inline-block">
                        Nº OT: {selectedOrder?.id || "OT 01/26"}
                      </div>
                      <div className="text-[10px] text-slate-600 font-semibold mt-1">
                        Fecha de solicitud: {selectedOrder?.fechaSolicitud || new Date().toLocaleDateString('es-AR')}
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0f2d59] text-white text-center py-1.5 rounded font-black text-sm uppercase tracking-widest my-2.5">
                    ORDEN DE TRABAJO
                  </div>

                  {/* 1. Datos de Solicitud Preview */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      1. DATOS DE SOLICITUD
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-slate-300 text-[11px]">
                      <div className="p-2 space-y-1">
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-700 w-28">Tipo de mantenimiento:</span>
                          <span className="font-semibold">{selectedOrder?.tipoMantenimiento || '—'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-700 w-28">Dependencia:</span>
                          <span className="truncate">{selectedOrder?.dependencia || '—'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-700 w-28">Edificio:</span>
                          <span className="truncate">{selectedOrder?.edificio || '—'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-700 w-28">Piso:</span>
                          <span>{selectedOrder?.sector || '—'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="font-bold text-slate-700 w-28">Oficina:</span>
                          <span className="font-semibold">{selectedOrder?.oficina || '—'}</span>
                        </div>
                      </div>

                      <div className="p-2 space-y-1">
                        <div>
                          <span className="font-bold text-slate-700">Solicitante: </span>
                          <span>{selectedOrder?.solicitante || '—'}</span>
                        </div>
                        <div>
                          <span className="font-bold text-slate-700">Prioridad: </span>
                          <span className="font-semibold">{selectedOrder?.prioridad || 'Normal'}</span>
                        </div>
                        <div className="pt-1">
                          <span className="font-bold text-slate-700 block">Descripción del trabajo solicitado:</span>
                          <div className="text-[11px] p-2 bg-slate-50 border border-slate-200 rounded mt-0.5 min-h-[40px]">
                            {selectedOrder?.descripcion || '—'}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* 2. Asignación Técnica */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      2. ASIGNACIÓN TÉCNICA
                    </div>
                    <div className="p-2 text-[11px] space-y-1">
                      <div className="grid grid-cols-2">
                        <div><span className="font-bold text-slate-700">Técnico asignado:</span> {selectedOrder?.tecnicoFinal || selectedOrder?.tecnico || '—'}</div>
                        <div><span className="font-bold text-slate-700">Fecha de asignación:</span> {selectedOrder?.fechaAsignacion || '—'}</div>
                      </div>
                      <div><span className="font-bold text-slate-700">Observaciones:</span> {selectedOrder?.observaciones || '—'}</div>
                    </div>
                  </div>

                  {/* 3. Informe de Ejecución Ampliado al Máximo */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      3. INFORME DE EJECUCIÓN (DESCRIPCIÓN TÉCNICA Y TAREAS EN CAMPO)
                    </div>
                    <div className="p-3 text-[11px] space-y-2">
                      <div className="min-h-[170px] border border-slate-300 bg-slate-50/50 rounded-lg p-2.5 text-slate-800 leading-relaxed">
                        {selectedOrder?.tareas ? (
                          <p className="whitespace-pre-line font-medium">{selectedOrder.tareas}</p>
                        ) : (
                          <div className="space-y-4 pt-1">
                            {[...Array(7)].map((_, i) => (
                              <div key={i} className="border-b border-slate-300 border-dashed h-5 flex items-end">
                                <span className="text-[8px] text-slate-400 select-none mr-2">R-0{i+1}:</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* 4. Materiales e Insumos */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      4. MATERIALES E INSUMOS UTILIZADOS
                    </div>
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-100 border-b border-slate-300 font-bold text-slate-700">
                        <tr>
                          <th className="p-1.5">Material / Insumo</th>
                          <th className="p-1.5 text-center w-20">Cantidad</th>
                          <th className="p-1.5 text-center w-20">Unidad</th>
                          <th className="p-1.5">Observaciones</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {selectedOrder?.materiales?.length > 0 ? (
                          selectedOrder.materiales.map((m, idx) => (
                            <tr key={idx}>
                              <td className="p-1.5">{m.descripcion}</td>
                              <td className="p-1.5 text-center font-bold">{m.cantidad}</td>
                              <td className="p-1.5 text-center">{m.unidad}</td>
                              <td className="p-1.5">{m.devolucion ? 'Requiere Devolución' : '—'}</td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr><td className="p-1.5 text-slate-400" colSpan="4">Sin insumos registrados previamente.</td></tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* 5. Conformidad y Cierre al Pie */}
                <div>
                  <div className="border border-[#0f2d59] rounded overflow-hidden">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      5. CONFORMIDAD Y CIERRE
                    </div>
                    <div className="p-3">
                      <div className="grid grid-cols-2 gap-16 pt-8 pb-2 text-center">
                        <div>
                          <div className="border-b border-slate-800 mb-1"></div>
                          <span className="font-bold text-[11px] text-slate-800">Firma del Técnico</span>
                        </div>
                        <div>
                          <div className="border-b border-slate-800 mb-1"></div>
                          <span className="font-bold text-[11px] text-slate-800">Firma del Responsable</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center text-[10px] text-slate-600 font-semibold pt-2">
                    Sistema de Mantenimiento Edilicio · CFT — Carilla 1/2
                  </div>
                </div>
              </div>

              {/* Carilla 2: Observaciones de Campo Ampliadas (22 Renglones) */}
              <div className="border border-slate-300 p-6 space-y-3 font-sans text-xs bg-white shadow-sm min-h-[820px] flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-center border-b-2 border-[#0f2d59] pb-2">
                    <div className="flex items-center space-x-3">
                      <EscudoPJN className="w-9 h-12 object-contain" />
                      <div>
                        <h3 className="font-serif font-black text-xs uppercase tracking-wide text-[#0f2d59]">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</h3>
                        <p className="font-bold text-[10px] text-slate-700">INTENDENCIA — RELEVAMIENTO TÉCNICO EN CAMPO</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-[#0f2d59] text-white px-3 py-1 font-mono text-xs font-bold rounded">
                        Nº {selectedOrder?.id || "OT 01/26"} (Carilla 2)
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0f2d59] text-white text-center py-1.5 rounded font-bold text-xs uppercase tracking-widest my-2.5">
                    OBSERVACIONES ADICIONALES Y RELEVAMIENTO TÉCNICO EN CAMPO
                  </div>

                  <div className="border border-[#0f2d59] p-4 space-y-3">
                    <div className="text-[10.5px] font-bold text-slate-900 border-b border-slate-300 pb-1">
                      REGISTRO DETALLADO DE OBSERVACIONES, MEDICIONES Y PLAN DE ACCIÓN:
                    </div>
                    
                    <div className="space-y-3 pt-1">
                      {[...Array(22)].map((_, i) => (
                        <div key={i} className="border-b border-slate-400 border-dashed h-5 flex items-end">
                          <span className="text-[8.5px] font-mono text-slate-400 select-none mr-2">{(i + 1).toString().padStart(2, '0')}.</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="pt-4 pb-2">
                    <div className="grid grid-cols-2 gap-24 px-10">
                      <div className="text-center">
                        <div className="border-b border-slate-800 pb-8 mb-1"></div>
                        <p className="font-bold text-[10px] italic text-slate-900">Firma del Técnico Interviniente</p>
                      </div>
                      <div className="text-center">
                        <div className="border-b border-slate-800 pb-8 mb-1"></div>
                        <p className="font-bold text-[10px] italic text-slate-900">Firma e Inspección del Responsable</p>
                      </div>
                    </div>
                  </div>

                  <div className="border-t border-[#0f2d59] pt-1 text-center text-[8.5px] font-semibold text-slate-700 tracking-wider">
                    Sistema de Mantenimiento Edilicio · CFT — Carilla Complementaria 2/2
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE SEGURIDAD PARA ALTERNANCIA OPERATIVA DE BOMBAS */}
      {pendingAlternancia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center space-x-3 text-amber-600">
              <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-[#0f2d59]">Confirmar Alternancia de Bomba</h4>
                <p className="text-[11px] text-slate-500">{pendingAlternancia.cuadroNombre}</p>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs text-slate-800 space-y-2">
              <p>
                ¿Confirma el cambio de alternancia para poner en servicio la <strong>{pendingAlternancia.labelPos}</strong>?
              </p>
              <div className="p-2 bg-white rounded-lg border border-amber-200 font-semibold text-[#0f2d59]">
                Equipo entrante: {pendingAlternancia.nombreBomba} ({pendingAlternancia.tagBomba})
              </div>
              <p className="text-[10.5px] text-slate-600">
                La bomba compañera de la otra posición pasará automáticamente a estado de <strong>RESERVA (Stand-by)</strong> y se iniciará el conteo de días en marcha.
              </p>
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={() => setPendingAlternancia(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirmarAlternancia}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
              >
                Confirmar y Alternar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DIÁLOGO: RETIRAR BOMBA Y ASIGNAR NUEVA POSICIÓN CON SLIDER DESLIZABLE */}
      {retirarBombaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            {/* Cabecera */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-700 flex items-center justify-center flex-shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Retirar Bomba de su Posición</h4>
                  <p className="text-xs text-slate-500">
                    Equipo: <strong>{retirarBombaModal.bomba.tagFisico || retirarBombaModal.bomba.id}</strong> — {retirarBombaModal.bomba.nombre}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setRetirarBombaModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Aviso de liberación de ranura */}
            <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-amber-700 flex-shrink-0" />
                <span>Liberación de ranura operativa</span>
              </div>
              <p>
                Al retirar la bomba de su cuadro actual, la posición quedará vacante con la etiqueta <strong>"SIN BOMBA ASIGNADA"</strong>.
              </p>
            </div>

            {/* Selector de nueva ubicación / destino */}
            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0f2d59] mb-1.5">
                  ¿A qué destino o posición se colocará la bomba?
                </label>
                <select
                  value={retirarBombaModal.destinoCuadro}
                  onChange={(e) => {
                    const newDestino = e.target.value;
                    const isCuadro = newDestino !== 'EN DEPÓSITO' && newDestino !== 'TALLER';
                    let defaultSlot = null;

                    if (isCuadro) {
                      const ocupada1 = bombasData.some(b => b.id !== retirarBombaModal.bomba.id && b.cuadro === newDestino && b.posicionSlot === 1);
                      const ocupada2 = bombasData.some(b => b.id !== retirarBombaModal.bomba.id && b.cuadro === newDestino && b.posicionSlot === 2);
                      defaultSlot = !ocupada1 ? 1 : (!ocupada2 ? 2 : null);
                    }

                    setRetirarBombaModal(prev => ({
                      ...prev,
                      destinoCuadro: newDestino,
                      destinoSlot: defaultSlot
                    }));
                  }}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-slate-800"
                >
                  <optgroup label="Destinos de Almacenamiento / Servicio">
                    <option value="EN DEPÓSITO">EN DEPÓSITO (Reserva de Intendencia)</option>
                    <option value="TALLER">TALLER (Service Externo / Desarme)</option>
                  </optgroup>
                  <optgroup label="Reubicar en otro Cuadro de Bombas">
                    {cuadrosData.map(c => {
                      const ocupadas = bombasData.filter(b => b.id !== retirarBombaModal.bomba.id && b.cuadro === c.nombre).length;
                      const isFull = ocupadas >= 2;
                      return (
                        <option key={c.nombre} value={c.nombre} disabled={isFull}>
                          {c.nombre} {isFull ? '[COMPLETO - 2/2]' : `(${ocupadas}/2 ocupadas)`}
                        </option>
                      );
                    })}
                  </optgroup>
                </select>
              </div>

              {/* Si eligió un cuadro operativo, permitir elegir posición libre */}
              {retirarBombaModal.destinoCuadro !== 'EN DEPÓSITO' && retirarBombaModal.destinoCuadro !== 'TALLER' && (() => {
                const ocupada1 = bombasData.some(b => b.id !== retirarBombaModal.bomba.id && b.cuadro === retirarBombaModal.destinoCuadro && b.posicionSlot === 1);
                const ocupada2 = bombasData.some(b => b.id !== retirarBombaModal.bomba.id && b.cuadro === retirarBombaModal.destinoCuadro && b.posicionSlot === 2);

                return (
                  <div>
                    <label className="block font-bold text-[#0f2d59] mb-1.5">
                      Ranura de Destino (Posición)
                    </label>
                    <select
                      value={retirarBombaModal.destinoSlot || (ocupada1 ? 2 : 1)}
                      onChange={(e) => {
                        const slot = parseInt(e.target.value) || 1;
                        setRetirarBombaModal(prev => ({ ...prev, destinoSlot: slot }));
                      }}
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-slate-800"
                    >
                      <option value={1} disabled={ocupada1}>
                        POSICIÓN 01 {ocupada1 ? '[OCUPADA]' : '(Disponible)'}
                      </option>
                      <option value={2} disabled={ocupada2}>
                        POSICIÓN 02 {ocupada2 ? '[OCUPADA]' : '(Disponible)'}
                      </option>
                    </select>
                  </div>
                );
              })()}
            </div>

            {/* Botón deslizable de confirmación */}
            <div className="pt-2 space-y-2">
              <label className="block text-[11px] font-bold text-slate-700">
                Confirmación de seguridad:
              </label>
              <SlideToConfirmRetiro onConfirm={handleConfirmarRetiroBomba} />
            </div>

            {/* Botón cancelar */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setRetirarBombaModal(null)}
                className="px-4 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DIÁLOGO: REEMPLAZAR BOMBA POR OTRA CON ESTADO SALIENTE Y SLIDER DESLIZABLE */}
      {reemplazarBombaModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            {/* Cabecera */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-100 text-[#0f2d59] flex items-center justify-center flex-shrink-0">
                  <RotateCw className="w-5 h-5 text-[#0f2d59]" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Reemplazar Bomba en Posición</h4>
                  <p className="text-xs text-slate-500">
                    Cuadro: <strong>{reemplazarBombaModal.cuadroNombre}</strong> · {reemplazarBombaModal.labelPos}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setReemplazarBombaModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* SECCIÓN 1: DATOS Y ESTADO DE LA BOMBA SALIENTE */}
            <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#0f2d59] uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <Tag className="w-3.5 h-3.5 text-rose-600" />
                  <span>1. Bomba Saliente (A Retirar)</span>
                </span>
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white text-[#0f2d59] border border-slate-200">
                  {reemplazarBombaModal.bombaSaliente.tagFisico || reemplazarBombaModal.bombaSaliente.id}
                </span>
              </div>
              <p className="font-semibold text-slate-700">
                {reemplazarBombaModal.bombaSaliente.nombre}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block font-bold text-[#384c63] mb-1">
                    Estado de la Bomba Saliente *
                  </label>
                  <select
                    value={reemplazarBombaModal.estadoSaliente}
                    onChange={(e) => setReemplazarBombaModal({ ...reemplazarBombaModal, estadoSaliente: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-slate-800"
                  >
                    <option value="A Reparar">A Reparar (Requiere Service)</option>
                    <option value="En Reparación">En Reparación (En Desarme)</option>
                    <option value="Operativa">Operativa (Mantenimiento Concluido / Back-up)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-[#384c63] mb-1">
                    Destino Físico de Salida *
                  </label>
                  <select
                    value={reemplazarBombaModal.destinoSaliente}
                    onChange={(e) => setReemplazarBombaModal({ ...reemplazarBombaModal, destinoSaliente: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-slate-800"
                  >
                    <option value="TALLER">TALLER (Service Externo)</option>
                    <option value="EN DEPÓSITO">EN DEPÓSITO (Stock Central)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: SELECCIÓN DE LA BOMBA ENTRANTE (DE REEMPLAZO) */}
            <div className="p-3.5 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                  <span>2. Bomba Entrante (Equipo de Reemplazo)</span>
                </span>
                <span className="text-[10px] text-emerald-700 font-bold bg-white px-2 py-0.5 rounded border border-emerald-200">
                  Instalación Inmediata
                </span>
              </div>

              <div>
                <label className="block font-bold text-[#0f2d59] mb-1">
                  Seleccionar Bomba de Reemplazo Disponible *
                </label>
                {(() => {
                  const disponibles = bombasData.filter(b => 
                    b.id !== reemplazarBombaModal.bombaSaliente.id && (b.cuadro === 'EN DEPÓSITO' || b.cuadro === 'TALLER')
                  );

                  if (disponibles.length === 0) {
                    return (
                      <div className="p-3 rounded-lg bg-amber-50 border border-amber-300 text-amber-900 text-xs">
                        ⚠️ No hay bombas disponibles en <strong>EN DEPÓSITO</strong> o <strong>TALLER</strong> para recambio. Incorpore una nueva bomba o reubique una existente en <em>Equipo de Bombas</em>.
                      </div>
                    );
                  }

                  return (
                    <select
                      value={reemplazarBombaModal.bombaReemplazoId}
                      onChange={(e) => setReemplazarBombaModal({ ...reemplazarBombaModal, bombaReemplazoId: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-emerald-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-[#0f2d59]"
                    >
                      {disponibles.map(b => (
                        <option key={b.id} value={b.id}>
                          [{b.tagFisico || b.id}] {b.nombre} — {b.marca} {b.modelo} ({b.cuadro})
                        </option>
                      ))}
                    </select>
                  );
                })()}
              </div>

              <p className="text-[10.5px] text-emerald-800">
                La bomba entrante quedará fijada en <strong>{reemplazarBombaModal.cuadroNombre} - {reemplazarBombaModal.labelPos}</strong> con estado <strong>Operativa</strong> y contador reiniciado.
              </p>
            </div>

            {/* SECCIÓN 3: CONTROL DESLIZABLE DE CONFIRMACIÓN */}
            <div className="pt-2 space-y-2">
              <label className="block text-[11px] font-bold text-slate-700">
                Confirmación de maniobra electromecánica:
              </label>
              <SlideToConfirmReemplazo 
                disabled={!reemplazarBombaModal.bombaReemplazoId}
                onConfirm={handleConfirmarReemplazoBomba} 
              />
            </div>

            {/* Botón cancelar */}
            <div className="flex justify-end pt-1">
              <button
                type="button"
                onClick={() => setReemplazarBombaModal(null)}
                className="px-4 py-1.5 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA CREAR Y MODIFICAR CUADRO DE BOMBAS (NOMBRE, DESCRIPCIÓN, POSICIONES Y MANTENIMIENTOS) */}
      {editingCuadro && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs overflow-y-auto">
          <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 my-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center flex-shrink-0">
                  {isNewCuadroModal ? <Plus className="w-5 h-5" /> : <Edit3 className="w-5 h-5" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">
                    {isNewCuadroModal ? 'Crear Nuevo Cuadro de Bombas' : 'Modificar Cuadro de Bombas'}
                  </h4>
                  <p className="text-xs text-slate-500">
                    {isNewCuadroModal 
                      ? 'Definir denominación oficial, descripciones operativas y nombres de posiciones' 
                      : 'Actualizar denominación, descripciones, posiciones e historial de mantenimiento'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingCuadro(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Pestañas de configuración del Cuadro */}
            <div className="flex items-center space-x-2 border-b border-slate-200 text-xs font-bold">
              <button
                type="button"
                onClick={() => setCuadroModalTab('datos')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  cuadroModalTab === 'datos' 
                    ? 'border-[#0f2d59] text-[#0f2d59]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Datos y Descripción
              </button>
              <button
                type="button"
                onClick={() => setCuadroModalTab('posiciones')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  cuadroModalTab === 'posiciones' 
                    ? 'border-[#0f2d59] text-[#0f2d59]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Configurar Posiciones
              </button>
              <button
                type="button"
                onClick={() => setCuadroModalTab('mantenimiento')}
                className={`pb-2 px-3 border-b-2 transition-colors ${
                  cuadroModalTab === 'mantenimiento' 
                    ? 'border-[#0f2d59] text-[#0f2d59]' 
                    : 'border-transparent text-slate-500 hover:text-slate-800'
                }`}
              >
                Mantenimientos del Cuadro ({editingCuadro.mantenimientos?.length || 0})
              </button>
            </div>

            {/* PESTAÑA 1: DATOS Y DESCRIPCIÓN */}
            {cuadroModalTab === 'datos' && (
              <div className="space-y-3.5 text-xs">
                <div>
                  <label className="block font-bold text-[#0f2d59] mb-1">Nombre Oficial del Cuadro *</label>
                  <input
                    type="text"
                    value={editingCuadro.nombre}
                    onChange={(e) => setEditingCuadro({ ...editingCuadro, nombre: e.target.value })}
                    placeholder="Ej: CUADRO DE BOMBAS DE PLUVIALES Y ACHIQUE"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none font-bold text-[#0f2d59] bg-white"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f2d59] mb-1">Descripción Operativa y Destino *</label>
                  <textarea
                    rows="3"
                    value={editingCuadro.desc}
                    onChange={(e) => setEditingCuadro({ ...editingCuadro, desc: e.target.value })}
                    placeholder="Descripción detallada de la función hidráulica, salas o pozos donde opera este cuadro..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none text-slate-700 bg-white leading-relaxed"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0f2d59] mb-1">Información de Tablero y Protecciones Eléctricas</label>
                  <input
                    type="text"
                    value={editingCuadro.tableroInfo || ''}
                    onChange={(e) => setEditingCuadro({ ...editingCuadro, tableroInfo: e.target.value })}
                    placeholder="Ej: Guardamotores Schneider 6-10A, relé de nivel y contactores TeSys"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none text-slate-800 bg-white"
                  />
                </div>
              </div>
            )}

            {/* PESTAÑA 2: CONFIGURAR ETIQUETAS DE POSICIONES */}
            {cuadroModalTab === 'posiciones' && (
              <div className="space-y-4 text-xs">
                <div className="p-3 bg-sky-50 border border-sky-200 rounded-xl text-sky-900 text-[11px]">
                  <strong>Personalización de Posiciones:</strong> Puede cambiar el nombre de las dos posiciones físicas asignadas a este cuadro (ej. <em>POSICIÓN 01 / 02</em>, <em>BOMBA PRINCIPAL / RESPALDO</em>, <em>LADO ESTE / OESTE</em>).
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#0f2d59] text-white">Ranura 1</span>
                    <label className="block font-bold text-slate-800">Nombre de la Posición 1</label>
                    <input
                      type="text"
                      value={editingCuadro.pos1Label || ''}
                      onChange={(e) => setEditingCuadro({ ...editingCuadro, pos1Label: e.target.value })}
                      placeholder="Ej: POSICIÓN 01"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-[#0f2d59]"
                    />
                  </div>

                  <div className="p-3.5 border border-slate-200 rounded-xl bg-slate-50 space-y-2">
                    <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-[#0f2d59] text-white">Ranura 2</span>
                    <label className="block font-bold text-slate-800">Nombre de la Posición 2</label>
                    <input
                      type="text"
                      value={editingCuadro.pos2Label || ''}
                      onChange={(e) => setEditingCuadro({ ...editingCuadro, pos2Label: e.target.value })}
                      placeholder="Ej: POSICIÓN 02"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white font-bold text-[#0f2d59]"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* PESTAÑA 3: HISTORIAL DE MANTENIMIENTO DEL CUADRO */}
            {cuadroModalTab === 'mantenimiento' && (
              <div className="space-y-4 text-xs">
                {/* Formulario para registrar trabajo en el cuadro */}
                <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="font-bold text-[#0f2d59] uppercase text-[11px] flex items-center space-x-1.5">
                    <Wrench className="w-3.5 h-3.5 text-[#3d7bb5]" />
                    <span>Asentar Trabajo de Mantenimiento de Tablero / Cuadro</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Fecha de Trabajo</label>
                      <input
                        type="text"
                        value={newCuadroMantenimiento.fecha}
                        onChange={(e) => setNewCuadroMantenimiento({ ...newCuadroMantenimiento, fecha: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Trabajo / Tarea Realizada *</label>
                      <input
                        type="text"
                        placeholder="Ej: Revisión de térmicas, limpieza y calibración de flotantes"
                        value={newCuadroMantenimiento.tarea}
                        onChange={(e) => setNewCuadroMantenimiento({ ...newCuadroMantenimiento, tarea: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Técnico Responsable</label>
                      <select
                        value={newCuadroMantenimiento.tecnico}
                        onChange={(e) => setNewCuadroMantenimiento({ ...newCuadroMantenimiento, tecnico: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      >
                        {dropdownOptions.tecnicos.filter(t => t !== 'Otros').map((t, idx) => (
                          <option key={idx} value={t}>{t}</option>
                        ))}
                        {dropdownOptions.tecnicos.includes('Otros') && (
                          <option value="Otros">Otros</option>
                        )}
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-[11px] font-semibold text-slate-700 mb-0.5">Observaciones</label>
                      <input
                        type="text"
                        placeholder="Detalles sobre contactores, guardamotores, cables o ensayos..."
                        value={newCuadroMantenimiento.observaciones}
                        onChange={(e) => setNewCuadroMantenimiento({ ...newCuadroMantenimiento, observaciones: e.target.value })}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 bg-white"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="button"
                      onClick={handleAddMantenimientoToCuadro}
                      className="px-3 py-1.5 bg-[#0f2d59] hover:bg-[#163e75] text-white rounded-lg text-xs font-bold transition-colors shadow-2xs"
                    >
                      + Registrar Mantenimiento
                    </button>
                  </div>
                </div>

                {/* Listado de intervenciones */}
                <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                  {editingCuadro.mantenimientos && editingCuadro.mantenimientos.length > 0 ? (
                    editingCuadro.mantenimientos.map(m => (
                      <div key={m.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-start justify-between gap-2 shadow-2xs">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-[#0f2d59]">{m.tarea}</span>
                            <span className="font-mono text-[10px] bg-slate-100 px-1.5 py-0.5 rounded text-slate-600 font-semibold">{m.fecha}</span>
                          </div>
                          <p className="text-slate-600 text-[11px]">{m.observaciones}</p>
                          <span className="text-[10px] text-slate-400 block">Técnico: {m.tecnico}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleRemoveCuadroMantenimiento(m.id)}
                          className="p-1 text-red-500 hover:text-red-700 hover:bg-red-50 rounded transition-colors"
                          title="Eliminar este registro"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center border border-dashed border-slate-200 rounded-lg text-slate-400 italic">
                      No hay trabajos de mantenimiento registrados en este cuadro.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Footer con botones de confirmación */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setEditingCuadro(null)}
                className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSaveCuadro}
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold shadow-sm transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>{isNewCuadroModal ? 'Crear y Habilitar Cuadro' : 'Guardar Cambios del Cuadro'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PREVIEW DIAGRAMA DE GANTT A3 (UNA SOLA CARILLA APAISADA) */}
      {/* NUEVO MODAL 1: DATOS IMPORTANTES DE EDIFICIOS JUDICIALES */}
      {isEdificiosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0 gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-5 h-5 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Datos Importantes de Edificios Judiciales</h4>
                  <p className="text-xs text-slate-500">
                    Jurisdicción Cámara Federal de Apelaciones de Tucumán ({edificiosList.length} edificios registrados)
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleOpenNewEdificio}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Edificio</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsEdificiosModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              {edificiosList.map(edif => {
                const campos = edif.camposPersonalizados && edif.camposPersonalizados.length > 0
                  ? edif.camposPersonalizados
                  : [
                      edif.electricidad ? { id: 'c1', titulo: 'Acometida Eléctrica y Tableros', contenido: edif.electricidad } : null,
                      edif.gas ? { id: 'c2', titulo: 'Llave de Corte de Gas', contenido: edif.gas } : null,
                      edif.agua ? { id: 'c3', titulo: 'Agua Potable y Reservas', contenido: edif.agua } : null,
                      edif.seguridad ? { id: 'c4', titulo: 'Seguridad Antisiniestral', contenido: edif.seguridad } : null,
                      edif.contactoLocal ? { id: 'c5', titulo: 'Contacto Directo', contenido: edif.contactoLocal } : null
                    ].filter(Boolean);

                return (
                  <div key={edif.id} className="p-4 rounded-xl border border-slate-200 bg-[#fbfcfe] hover:border-[#0f2d59] transition-all space-y-2.5 shadow-2xs">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-2 border-b border-slate-200 gap-1.5">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded text-[10.5px] border border-[#cfe0ee]">
                          {edif.id}
                        </span>
                        <strong className="text-sm text-[#0f2d59]">{edif.nombre}</strong>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span className="text-[11px] font-semibold text-slate-500">{edif.direccion}</span>
                        <button
                          type="button"
                          onClick={() => handleOpenEditEdificio(edif)}
                          className="inline-flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-[#eef4f9] hover:bg-[#dfeaf4] text-[#0f2d59] border border-[#cfe0ee] text-[11px] font-bold transition-colors shadow-2xs cursor-pointer ml-1"
                          title="Modificar los títulos y datos de este edificio"
                        >
                          <Edit3 className="w-3.5 h-3.5 text-[#3d7bb5]" />
                          <span>Editar</span>
                        </button>
                      </div>
                    </div>

                    {edif.superficie && (
                      <div className="p-2 rounded bg-white border border-slate-200 text-[11px]">
                        <span className="font-bold text-[#0f2d59]">Superficie y Distribución de Plantas: </span>
                        <span className="text-slate-700">{edif.superficie}</span>
                      </div>
                    )}

                    {/* RENDERIZADO DINÁMICO DE LOS TÍTULOS Y CAMPOS PERSONALIZADOS */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5 text-[11px]">
                      {campos.map((campo, cIdx) => (
                        <div key={campo.id || cIdx} className="p-2.5 rounded bg-white border border-slate-200 space-y-1">
                          <span className="font-bold text-[#0f2d59] block text-[11.5px] border-b border-slate-100 pb-0.5">
                            {campo.titulo || 'Campo Técnico'}
                          </span>
                          <p className="text-slate-700 leading-relaxed text-[11px] whitespace-pre-line">
                            {campo.contenido || '—'}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="pt-1 flex items-center justify-between text-[11px] text-slate-500 font-medium border-t border-slate-100">
                      <span>Total de campos técnicos definidos: <strong>{campos.length} campos</strong></span>
                      <span className="text-emerald-700 font-bold">Estado: Operativo Habilitado</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsEdificiosModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] text-white font-bold text-xs hover:bg-[#163e75] cursor-pointer"
              >
                Cerrar Datos de Edificios
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL PARA AGREGAR / EDITAR EDIFICIO JUDICIAL CON TÍTULOS Y CAMPOS 100% PERSONALIZABLES */}
      {editingEdificioModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center flex-shrink-0">
                  {isNewEdificio ? <Plus className="w-5 h-5 text-cyan-300" /> : <Edit3 className="w-5 h-5 text-cyan-300" />}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">
                    {isNewEdificio ? 'Agregar Nuevo Edificio Judicial' : `Editar Edificio [${editingEdificioModal.id}]`}
                  </h4>
                  <p className="text-xs text-slate-500">
                    Todos los títulos y campos son 100% configurables manualmente. Puede crear nuevos campos o renombrar los existentes.
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingEdificioModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              
              {/* DATOS GENERALES BÁSICOS */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="font-bold text-[11px] uppercase tracking-wider text-[#0f2d59]">
                  1. Identificación y Localización General
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-bold text-[#0f2d59] mb-1">Identificador / Tag *</label>
                    <input
                      type="text"
                      value={editingEdificioModal.id}
                      onChange={(e) => setEditingEdificioModal({ ...editingEdificioModal, id: e.target.value })}
                      placeholder="Ej: EDIF-01"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-mono font-bold text-[#0f2d59] focus:border-[#0f2d59] outline-none"
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block font-bold text-[#0f2d59] mb-1">Nombre Oficial del Edificio *</label>
                    <input
                      type="text"
                      value={editingEdificioModal.nombre}
                      onChange={(e) => setEditingEdificioModal({ ...editingEdificioModal, nombre: e.target.value })}
                      placeholder="Ej: Cámara Federal de Apelaciones de Tucumán (Sede Central)"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 focus:border-[#0f2d59] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-[#384c63] mb-1">Dirección y Localidad *</label>
                    <input
                      type="text"
                      value={editingEdificioModal.direccion}
                      onChange={(e) => setEditingEdificioModal({ ...editingEdificioModal, direccion: e.target.value })}
                      placeholder="Ej: Calle Las Piedras 418, San Miguel de Tucumán"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#0f2d59] outline-none"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#384c63] mb-1">Superficie y Distribución de Plantas</label>
                    <input
                      type="text"
                      value={editingEdificioModal.superficie}
                      onChange={(e) => setEditingEdificioModal({ ...editingEdificioModal, superficie: e.target.value })}
                      placeholder="Ej: 4.850 m² (Subsuelos, Planta Baja y 6 Pisos)"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-300 bg-white text-slate-800 focus:border-[#0f2d59] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* SECCIÓN 2: TÍTULOS Y CAMPOS PERSONALIZABLES (CREACIÓN LIBRE) */}
              <div className="space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-1 border-b border-slate-200 gap-2">
                  <div>
                    <span className="font-bold text-xs uppercase tracking-wider text-[#0f2d59] block">
                      2. Títulos y Campos Técnicos a Medida ({editingEdificioModal.camposPersonalizados?.length || 0})
                    </span>
                    <span className="text-[10.5px] text-slate-500">
                      Puede modificar los títulos y crear cualquier campo que necesite registrar para este edificio.
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={handleAddCustomFieldEdificio}
                    className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-all shadow-2xs whitespace-nowrap cursor-pointer self-start sm:self-auto"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Agregar Nuevo Campo</span>
                  </button>
                </div>

                {/* Listado dinámico de campos con título editable y contenido libre */}
                <div className="space-y-3">
                  {editingEdificioModal.camposPersonalizados && editingEdificioModal.camposPersonalizados.length > 0 ? (
                    editingEdificioModal.camposPersonalizados.map((campo, index) => (
                      <div 
                        key={campo.id || index}
                        className="p-3.5 rounded-xl border border-slate-300 bg-[#fbfcfe] hover:border-[#0f2d59] transition-all space-y-2 relative group shadow-2xs"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex items-center space-x-2 flex-1">
                            <span className="font-mono font-bold text-[10.5px] px-2 py-0.5 rounded bg-[#eef4f9] text-[#0f2d59] border border-[#cfe0ee] flex-shrink-0">
                              Campo #{index + 1}
                            </span>
                            
                            {/* Input para el Título del Campo (Completamente editable a mano) */}
                            <div className="flex-1">
                              <input
                                type="text"
                                value={campo.titulo}
                                onChange={(e) => handleUpdateCustomFieldEdificio(campo.id, 'titulo', e.target.value)}
                                placeholder="Escribir título del campo (ej. Llave de Corte de Gas, Tableros, Bombas...)"
                                className="w-full px-2.5 py-1 text-xs font-bold rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white text-[#0f2d59]"
                              />
                            </div>
                          </div>

                          <button
                            type="button"
                            onClick={() => handleRemoveCustomFieldEdificio(campo.id)}
                            className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors flex-shrink-0 cursor-pointer"
                            title="Eliminar este campo"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Textarea para el Contenido / Descripción del Campo */}
                        <div>
                          <textarea
                            rows="2"
                            value={campo.contenido}
                            onChange={(e) => handleUpdateCustomFieldEdificio(campo.id, 'contenido', e.target.value)}
                            placeholder={`Escribir la información correspondiente a "${campo.titulo || 'este campo'}"...`}
                            className="w-full px-3 py-2 text-xs rounded-lg border border-slate-300 focus:border-[#0f2d59] outline-none bg-white text-slate-800 leading-relaxed"
                          />
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center border border-dashed border-slate-300 rounded-xl bg-slate-50 text-slate-400 space-y-2">
                      <p>No hay campos técnicos definidos para este edificio.</p>
                      <button
                        type="button"
                        onClick={handleAddCustomFieldEdificio}
                        className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-[#0f2d59] text-white text-xs font-bold cursor-pointer"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>Crear Primer Campo</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>

            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between flex-shrink-0">
              {!isNewEdificio ? (
                <button
                  type="button"
                  onClick={() => handleDeleteEdificio(editingEdificioModal.id)}
                  className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 text-xs font-bold transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Eliminar Edificio</span>
                </button>
              ) : <div></div>}

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingEdificioModal(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveEdificio}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white font-bold text-xs shadow-sm transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>{isNewEdificio ? 'Guardar Nuevo Edificio' : 'Guardar Cambios'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NUEVO MODAL 2: NÚMEROS DE CONTACTO DE EMERGENCIAS Y SERVICIOS */}
      {isContactosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0 gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Directorio Telefónico y Números de Emergencia</h4>
                  <p className="text-xs text-slate-500">Guardias técnicas permanentes, intendencias y servicios públicos</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleOpenNewContacto('mantenimiento')}
                  className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-2xs whitespace-nowrap cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>+ Agregar Contacto</span>
                </button>

                <button
                  type="button"
                  onClick={() => setIsContactosModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-1 text-xs">
              
              {/* 1. MANTENIMIENTO EDILICIO E INTENDENCIA CFT */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#0f2d59] block">
                    1. Mantenimiento Edilicio e Intendencia CFT ({contactosData.mantenimiento.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenNewContacto('mantenimiento')}
                    className="text-[11px] font-bold text-[#0f2d59] hover:underline cursor-pointer"
                  >
                    + Nuevo Contacto
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {contactosData.mantenimiento.map(item => (
                    <div key={item.id} className="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 relative group hover:border-[#0f2d59] transition-all">
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-[#0f2d59] block text-xs leading-tight">{item.titulo}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleOpenEditContacto('mantenimiento', item)}
                            className="p-1 rounded text-slate-500 hover:text-[#0f2d59] hover:bg-slate-200 transition-colors cursor-pointer"
                            title="Editar contacto"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteContacto('mantenimiento', item.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                            title="Eliminar contacto"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="text-slate-800 font-bold font-mono text-[11.5px]">{item.telefono}</p>
                      {item.descripcion && (
                        <p className="text-[11px] text-slate-500 leading-snug">{item.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 2. SERVICIOS PÚBLICOS Y GUARDIAS EXTERNAS DE URGENCIA */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-rose-800 block">
                    2. Servicios Públicos y Guardias Externas de Urgencia ({contactosData.serviciosPublicos.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenNewContacto('serviciosPublicos')}
                    className="text-[11px] font-bold text-rose-700 hover:underline cursor-pointer"
                  >
                    + Nuevo Servicio Público
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {contactosData.serviciosPublicos.map(item => (
                    <div key={item.id} className="p-3 bg-rose-50/60 border border-rose-200 rounded-xl space-y-1 relative group hover:border-rose-400 transition-all">
                      <div className="flex items-start justify-between gap-1">
                        <span className="font-bold text-rose-900 block text-xs leading-tight">{item.titulo}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleOpenEditContacto('serviciosPublicos', item)}
                            className="p-1 rounded text-slate-500 hover:text-rose-900 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Editar"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteContacto('serviciosPublicos', item.id)}
                            className="p-1 rounded text-slate-400 hover:text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                      <p className="font-mono font-black text-rose-700 text-sm mt-0.5">{item.telefono}</p>
                      {item.descripcion && (
                        <span className="text-[10.5px] text-slate-600 block mt-0.5 leading-snug">{item.descripcion}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. EMERGENCIAS MÉDICAS, SEGURIDAD Y BOMBEROS */}
              <div className="space-y-2 pt-1 border-t border-slate-100">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs uppercase tracking-wider text-slate-700 block">
                    3. Emergencias Médicas, Seguridad y Bomberos ({contactosData.emergencias.length})
                  </span>
                  <button
                    type="button"
                    onClick={() => handleOpenNewContacto('emergencias')}
                    className="text-[11px] font-bold text-slate-700 hover:underline cursor-pointer"
                  >
                    + Nueva Emergencia
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
                  {contactosData.emergencias.map(item => (
                    <div key={item.id} className="p-2.5 bg-slate-100 rounded-xl border border-slate-300 relative group hover:border-[#0f2d59] transition-all flex flex-col justify-between">
                      <div className="flex items-start justify-between">
                        <span className="text-[11px] font-bold text-slate-800 block text-left truncate flex-1">{item.titulo}</span>
                        <div className="flex items-center space-x-1 flex-shrink-0 opacity-80 group-hover:opacity-100">
                          <button
                            type="button"
                            onClick={() => handleOpenEditContacto('emergencias', item)}
                            className="p-0.5 rounded text-slate-500 hover:text-[#0f2d59] transition-colors cursor-pointer"
                            title="Editar"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteContacto('emergencias', item.id)}
                            className="p-0.5 rounded text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                            title="Eliminar"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <span className="text-base font-black text-rose-700 font-mono my-1 block">{item.telefono}</span>
                      {item.descripcion && (
                        <p className="text-[10px] text-slate-500 leading-tight">{item.descripcion}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsContactosModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] text-white font-bold text-xs hover:bg-[#163e75] cursor-pointer"
              >
                Cerrar Directorio
              </button>
            </div>
          </div>
        </div>
      )}

      {/* SUB-MODAL PARA AGREGAR O EDITAR CONTACTO */}
      {editingContactoModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-md my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center">
                  <Phone className="w-4 h-4 text-cyan-300" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">
                    {isNewContacto ? 'Agregar Nuevo Contacto' : 'Editar Contacto'}
                  </h4>
                  <p className="text-xs text-slate-500">Defina el nombre, número de guardia y descripción operativa</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setEditingContactoModal(null)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#0f2d59] mb-1">Sección / Categoría *</label>
                <select
                  value={editingContactoModal.categoria}
                  onChange={(e) => setEditingContactoModal({ ...editingContactoModal, categoria: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-[#0f2d59] outline-none"
                >
                  <option value="mantenimiento">1. Mantenimiento Edilicio e Intendencia CFT</option>
                  <option value="serviciosPublicos">2. Servicios Públicos y Guardias Externas</option>
                  <option value="emergencias">3. Emergencias Médicas, Seguridad y Bomberos</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#0f2d59] mb-1">Nombre o Título del Contacto *</label>
                <input
                  type="text"
                  placeholder="Ej: Guardia Ascensores 24hs / Intendencia Catamarca"
                  value={editingContactoModal.titulo}
                  onChange={(e) => setEditingContactoModal({ ...editingContactoModal, titulo: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-bold text-slate-800 outline-none"
                  autoFocus
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f2d59] mb-1">Número de Teléfono / Celular / Interno *</label>
                <input
                  type="text"
                  placeholder="Ej: 0800-444-2723 / (0381) 484-6000 Int. 210"
                  value={editingContactoModal.telefono}
                  onChange={(e) => setEditingContactoModal({ ...editingContactoModal, telefono: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white font-mono font-bold text-slate-800 outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-[#0f2d59] mb-1">Descripción / Horarios / Responsables</label>
                <textarea
                  rows="2"
                  placeholder="Ej: Atención de 07:00 a 14:00 hs. Responsable de turno Ing. Gómez..."
                  value={editingContactoModal.descripcion}
                  onChange={(e) => setEditingContactoModal({ ...editingContactoModal, descripcion: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-slate-700 outline-none leading-relaxed"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              {!isNewContacto ? (
                <button
                  type="button"
                  onClick={() => handleDeleteContacto(editingContactoModal.categoria, editingContactoModal.id)}
                  className="px-3 py-1.5 rounded-lg border border-rose-300 bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs cursor-pointer"
                >
                  Eliminar
                </button>
              ) : <div></div>}

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setEditingContactoModal(null)}
                  className="px-4 py-2 rounded-lg border border-slate-300 text-slate-600 hover:bg-slate-50 font-semibold text-xs cursor-pointer"
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  onClick={handleSaveContacto}
                  className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white font-bold text-xs shadow-sm cursor-pointer"
                >
                  {isNewContacto ? 'Guardar Contacto' : 'Guardar Cambios'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NUEVO MODAL 3: DOCUMENTOS IMPORTANTES Y NORMATIVA */}
      {isDocumentosModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/65 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-3xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 p-6 space-y-4 animate-in fade-in zoom-in duration-150 max-h-[92vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-purple-700 text-white flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">Documentos Importantes y Biblioteca Normativa</h4>
                  <p className="text-xs text-slate-500">Leyes, reglamentos del Consejo de la Magistratura y protocolos de intendencia</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsDocumentosModalOpen(false)}
                className="p-1 rounded-lg hover:bg-slate-100 text-slate-500"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1 text-xs">
              {[
                {
                  id: 'DOC-01',
                  titulo: 'Ley N° 24.937 y Modificatorias — Consejo de la Magistratura',
                  subtitulo: 'Régimen institucional de administración general del Poder Judicial de la Nación',
                  tipo: 'Marco Legal Oficial',
                  vigencia: 'Vigente',
                  desc: 'Establece las facultades reglamentarias sobre la infraestructura, compras públicas, administración patrimonial y designación de intendentes judiciales.'
                },
                {
                  id: 'DOC-02',
                  titulo: 'Manual de Procedimientos y Funciones de la Intendencia CFT',
                  subtitulo: 'Resolución de Cámara Federal de Apelaciones de Tucumán',
                  tipo: 'Manual Operativo',
                  vigencia: 'Actualización 2026',
                  desc: 'Pautas para emisión de Órdenes de Trabajo, supervisión de maestranza, pañol de materiales y recepción provisoria de obras.'
                },
                {
                  id: 'DOC-03',
                  titulo: 'Protocolo de Evacuación y Plan de Contingencias Antisiniestral',
                  subtitulo: 'Aprobado por el Área de Seguridad e Higiene Laboral PJN',
                  tipo: 'Protocolo de Seguridad',
                  vigencia: 'Obligatorio',
                  desc: 'Pautas de actuación ante principio de incendio, anegamientos de subsuelos, sismo y rutas de escape hacia calle Las Piedras.'
                },
                {
                  id: 'DOC-04',
                  titulo: 'Reglamento para la Rendición de Fondos Rotatorios y Caja Chica',
                  subtitulo: 'Resolución General de Habilitación y Tesorería',
                  tipo: 'Instructivo Contable',
                  vigencia: 'Vigente',
                  desc: 'Condiciones de facturación, emisión de recibos y límites presupuestarios para egresos operativos de mantenimiento urgente.'
                },
                {
                  id: 'DOC-05',
                  titulo: 'Programa Anual de Mantenimiento Edilicio (22 Fichas Oficiales)',
                  subtitulo: 'Resolución Técnica Intendencia CFT 2026',
                  tipo: 'Programa Preventivo',
                  vigencia: 'Ejercicio 2026',
                  desc: 'Cronograma integral de 48 semanas en formato A3 para envolventes constructivas, cuadros de bombeo y climatización central.'
                }
              ].map(doc => (
                <div key={doc.id} className="p-3.5 rounded-xl border border-slate-200 bg-[#fbfcfe] hover:border-[#0f2d59] transition-all space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="font-mono font-bold text-xs text-[#0f2d59] bg-[#eef4f9] px-2 py-0.5 rounded border border-[#cfe0ee]">
                          {doc.id}
                        </span>
                        <span className="font-bold text-xs text-slate-900">{doc.titulo}</span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.subtitulo}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-800 border border-purple-200 whitespace-nowrap">
                      {doc.vigencia}
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11.5px] leading-relaxed bg-white p-2.5 rounded-lg border border-slate-200">
                    {doc.desc}
                  </p>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                    <span>Categoría: <strong>{doc.tipo}</strong></span>
                    <button
                      type="button"
                      onClick={() => alert(`Acceso al archivo digital oficial de: ${doc.titulo}`)}
                      className="inline-flex items-center space-x-1 text-[#0f2d59] font-bold hover:underline"
                    >
                      <FileCheck className="w-3.5 h-3.5" />
                      <span>Consultar Archivo Digital</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => setIsDocumentosModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#0f2d59] text-white font-bold text-xs hover:bg-[#163e75]"
              >
                Cerrar Biblioteca
              </button>
            </div>
          </div>
        </div>
      )}

      {/* PRINT CONTAINER FALLBACK (SI SE DISPARA MANUALMENTE EN LA PÁGINA) */}
      <div className="hidden print:block p-0 m-0 bg-white text-slate-900 font-sans text-xs">
        {selectedOrder && printTarget === 'order' && (
          <div className="p-6 space-y-4 border border-slate-300">
            <div className="flex justify-between items-start pb-2 border-b-2 border-[#0f2d59]">
              <div className="flex items-center space-x-3.5">
                <EscudoPJN className="w-12 h-16 object-contain" />
                <div>
                  <h4 className="font-serif font-black text-xs text-[#0f2d59] tracking-wider uppercase">Poder Judicial de la Nación</h4>
                  <h3 className="font-serif font-black text-sm text-[#0f2d59] tracking-wide uppercase">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</h3>
                  <p className="font-bold text-[11px] text-slate-800 tracking-wider">INTENDENCIA</p>
                </div>
              </div>
              <div className="text-right">
                <div className="bg-[#0f2d59] text-white px-4 py-1.5 rounded-lg font-mono font-bold text-sm tracking-wider inline-block">
                  Nº OT: {selectedOrder?.id || "OT 01/26"}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================================= */}
      {/* ASISTENTE WIZARD (MODAL FLOTANTE CON SCROLL DEL BODY BLOQUEADO)           */}
      {/* ========================================================================= */}
      {isFichaWizardOpen && editingFichaData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in duration-150">
            
            {/* Cabecera del Wizard con Pasos 1 a 4 */}
            <div className="px-6 py-4 border-b border-slate-200 bg-[#f8fafc] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-xl bg-[#0f2d59] text-white flex items-center justify-center">
                  <Layers className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0f2d59]">
                    {isCreatingNewFicha ? 'Crear Nueva Planilla de Inspección' : `Modificar Planilla [${editingFichaData.codigo}]`}
                  </h3>
                  <p className="text-[11px] text-slate-500">
                    Asistente paso a paso para catalogación y protocolo técnico edilicio
                  </p>
                </div>
              </div>

              {/* Indicador de Pasos del Wizard */}
              <div className="flex items-center space-x-1.5 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
                {[
                  { num: 1, label: 'Encabezado' },
                  { num: 2, label: 'Rubros y Patologías' },
                  { num: 3, label: 'Cronograma' },
                  { num: 4, label: 'Finalizar' }
                ].map(step => (
                  <button
                    key={step.num}
                    type="button"
                    onClick={() => setWizardStep(step.num)}
                    className={`flex items-center space-x-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      wizardStep === step.num
                        ? 'bg-[#0f2d59] text-white shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-[10.5px]">{step.num}.</span>
                    <span>{step.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Contenido del Paso Activo */}
            <div className="p-6 overflow-y-auto space-y-4 text-xs flex-1">
              
              {/* PASO 1: ENCABEZADO Y DATOS GENERALES */}
              {wizardStep === 1 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl space-y-1">
                    <span className="font-bold text-blue-900 text-xs block">Paso 1: Identificación y Ubicación Edilicia</span>
                    <p className="text-blue-800 text-[11px]">
                      Complete los datos de cabecera que figurarán en el formulario impreso y en las carátulas institucionales.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-[#0f2d59] mb-1">Código Oficial *</label>
                      <input
                        type="text"
                        value={editingFichaData.codigo}
                        onChange={(e) => setEditingFichaData({ ...editingFichaData, codigo: e.target.value })}
                        placeholder="Ej: FICHA N° 01"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-mono font-bold text-[#0f2d59] bg-white outline-none"
                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block font-bold text-[#0f2d59] mb-1">Grupo Técnico Reglamentario *</label>
                      <select
                        value={editingFichaData.grupoId}
                        onChange={(e) => {
                          const val = e.target.value;
                          const nameMap = {
                            'sistema-edilicio': 'GRUPO I: SISTEMA EDILICIO',
                            'instalaciones-criticas': 'GRUPO II: INSTALACIONES CRÍTICAS',
                            'servicios-contratados': 'GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS'
                          };
                          setEditingFichaData({
                            ...editingFichaData,
                            grupoId: val,
                            grupoNombre: nameMap[val] || 'GRUPO I: SISTEMA EDILICIO'
                          });
                        }}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-800 bg-white outline-none"
                      >
                        <option value="sistema-edilicio">GRUPO I: SISTEMA EDILICIO</option>
                        <option value="instalaciones-criticas">GRUPO II: INSTALACIONES CRÍTICAS</option>
                        <option value="servicios-contratados">GRUPO III: EQUIPAMIENTO Y SERVICIOS CONTRATADOS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#0f2d59] mb-1">Título Técnico de la Ficha *</label>
                    <input
                      type="text"
                      value={editingFichaData.titulo}
                      onChange={(e) => setEditingFichaData({ ...editingFichaData, titulo: e.target.value })}
                      placeholder="Ej: Fachada Principal (Paneles Alucobond y Granito)"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300 font-bold text-slate-900 bg-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block font-bold text-[#384c63] mb-1">Edificio Judicial *</label>
                      <input
                        type="text"
                        value={editingFichaData.edificio}
                        onChange={(e) => setEditingFichaData({ ...editingFichaData, edificio: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#384c63] mb-1">Sector Analizado *</label>
                      <input
                        type="text"
                        value={editingFichaData.sector}
                        onChange={(e) => setEditingFichaData({ ...editingFichaData, sector: e.target.value })}
                        placeholder="Ej: Fachada Frontal y Alero de Acceso"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block font-bold text-[#384c63] mb-1">Nivel / Cota</label>
                      <input
                        type="text"
                        value={editingFichaData.nivel}
                        onChange={(e) => setEditingFichaData({ ...editingFichaData, nivel: e.target.value })}
                        placeholder="Ej: Exterior / Vereda"
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#384c63] mb-1">Inspector Técnico *</label>
                      <input
                        type="text"
                        value={editingFichaData.inspector}
                        onChange={(e) => setEditingFichaData({ ...editingFichaData, inspector: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white outline-none font-semibold text-[#0f2d59]"
                      />
                    </div>
                    <div>
                      <label className="block font-bold text-[#384c63] mb-1">Motivo de Inspección</label>
                      <select
                        value={editingFichaData.motivo}
                        onChange={(e) => setEditingFichaData({ ...editingFichaData, motivo: e.target.value })}
                        className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white outline-none font-medium"
                      >
                        <option value="Periódica / Preventiva">Periódica / Preventiva</option>
                        <option value="Solicitud / Correctiva">Solicitud / Correctiva</option>
                        <option value="Emergencia Antisiniestral">Emergencia Antisiniestral</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {/* PASO 2: RUBROS Y PATOLOGÍAS DINÁMICAS */}
              {wizardStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3.5 bg-amber-50/70 border border-amber-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-amber-900 text-xs block">Paso 2: Matriz de Componentes y Patologías</span>
                      <p className="text-amber-800 text-[11px]">
                        Defina los componentes y las patologías inspeccionables. Puede agregar nuevas categorías o borrarlas con un clic.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newRubro = {
                          id: `R-${Date.now()}`,
                          nombre: 'Nuevo Componente / Rubro',
                          patologias: [
                            { id: `p-${Date.now()}`, descripcion: 'Nueva patología a relevar en campo', estado: 'Ninguna', obs: '' }
                          ]
                        };
                        setEditingFichaData({
                          ...editingFichaData,
                          rubros: [...(editingFichaData.rubros || []), newRubro]
                        });
                      }}
                      className="px-3 py-1.5 bg-[#0f2d59] hover:bg-[#163e75] text-white rounded-lg font-bold text-xs shadow-2xs whitespace-nowrap cursor-pointer"
                    >
                      + Agregar Componente
                    </button>
                  </div>

                  <div className="space-y-4">
                    {editingFichaData.rubros?.map((rubro, rIdx) => (
                      <div key={rubro.id} className="p-4 rounded-xl border border-slate-200 bg-[#fbfcfe] space-y-3">
                        <div className="flex items-center justify-between pb-2 border-b border-slate-200 gap-2">
                          <div className="flex items-center space-x-2 flex-1">
                            <span className="w-5 h-5 rounded-full bg-[#0f2d59] text-white font-mono font-bold text-[10px] flex items-center justify-center flex-shrink-0">
                              {rIdx + 1}
                            </span>
                            <input
                              type="text"
                              value={rubro.nombre}
                              onChange={(e) => {
                                const val = e.target.value;
                                setEditingFichaData(prev => ({
                                  ...prev,
                                  rubros: prev.rubros.map(r => r.id === rubro.id ? { ...r, nombre: val } : r)
                                }));
                              }}
                              className="w-full px-2.5 py-1 rounded-md border border-slate-300 font-bold text-[#0f2d59] bg-white outline-none"
                            />
                          </div>

                          <div className="flex items-center space-x-1.5 flex-shrink-0">
                            <button
                              type="button"
                              onClick={() => {
                                const newP = {
                                  id: `p-${Date.now()}`,
                                  descripcion: 'Nueva patología',
                                  estado: 'Ninguna',
                                  obs: ''
                                };
                                setEditingFichaData(prev => ({
                                  ...prev,
                                  rubros: prev.rubros.map(r => r.id === rubro.id ? { ...r, patologias: [...r.patologias, newP] } : r)
                                }));
                              }}
                              className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-[11px] cursor-pointer"
                            >
                              + Patología
                            </button>

                            <button
                              type="button"
                              disabled={editingFichaData.rubros.length <= 1}
                              onClick={() => {
                                setEditingFichaData(prev => ({
                                  ...prev,
                                  rubros: prev.rubros.filter(r => r.id !== rubro.id)
                                }));
                              }}
                              className="p-1 rounded text-rose-500 hover:bg-rose-50 disabled:opacity-30 cursor-pointer"
                              title="Eliminar este rubro"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>

                        {/* Listado de patologías con opciones Ninguna / Leve / Grave */}
                        <div className="space-y-2">
                          {rubro.patologias?.map((pat, pIdx) => (
                            <div key={pat.id} className="p-2.5 rounded-lg border border-slate-200 bg-white grid grid-cols-1 sm:grid-cols-[1fr_auto_auto] gap-2 items-center">
                              <input
                                type="text"
                                value={pat.descripcion}
                                onChange={(e) => {
                                  const val = e.target.value;
                                  setEditingFichaData(prev => ({
                                    ...prev,
                                    rubros: prev.rubros.map(r => r.id === rubro.id ? {
                                      ...r,
                                      patologias: r.patologias.map(p => p.id === pat.id ? { ...p, descripcion: val } : p)
                                    } : r)
                                  }));
                                }}
                                className="w-full px-2 py-1 rounded border border-slate-200 text-xs text-slate-800 outline-none"
                              />

                              {/* Selector Ninguna / Leve / Grave */}
                              <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-md border border-slate-200">
                                {['Ninguna', 'Leve', 'Grave'].map(est => (
                                  <button
                                    key={est}
                                    type="button"
                                    onClick={() => {
                                      setEditingFichaData(prev => ({
                                        ...prev,
                                        rubros: prev.rubros.map(r => r.id === rubro.id ? {
                                          ...r,
                                          patologias: r.patologias.map(p => p.id === pat.id ? { ...p, estado: est } : p)
                                        } : r)
                                      }));
                                    }}
                                    className={`px-2 py-0.5 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                      pat.estado === est
                                        ? est === 'Ninguna' ? 'bg-[#166534] text-white' : est === 'Leve' ? 'bg-[#854d0e] text-white' : 'bg-[#991b1b] text-white'
                                        : 'text-slate-600 hover:text-slate-900'
                                    }`}
                                  >
                                    {est}
                                  </button>
                                ))}
                              </div>

                              <button
                                type="button"
                                disabled={rubro.patologias.length <= 1}
                                onClick={() => {
                                  setEditingFichaData(prev => ({
                                    ...prev,
                                    rubros: prev.rubros.map(r => r.id === rubro.id ? {
                                      ...r,
                                      patologias: r.patologias.filter(p => p.id !== pat.id)
                                    } : r)
                                  }));
                                }}
                                className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-20 cursor-pointer"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PASO 3: CRONOGRAMA TÉCNICO PREVENTIVO */}
              {wizardStep === 3 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-3.5 bg-emerald-50/70 border border-emerald-200 rounded-xl flex items-center justify-between">
                    <div>
                      <span className="font-bold text-emerald-900 text-xs block">Paso 3: Cronograma de Mantenimiento Preventivo</span>
                      <p className="text-emerald-800 text-[11px]">
                        Especifique las frecuencias reglamentarias de inspección, limpieza y renovación con el detalle de acciones.
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        const newT = {
                          tarea: 'Nueva tarea preventiva',
                          frecuencia: 'Cada 3 meses',
                          accion: 'Detalle de la acción técnica'
                        };
                        setEditingFichaData({
                          ...editingFichaData,
                          cronograma: [...(editingFichaData.cronograma || []), newT]
                        });
                      }}
                      className="px-3 py-1.5 bg-[#0f2d59] hover:bg-[#163e75] text-white rounded-lg font-bold text-xs shadow-2xs whitespace-nowrap cursor-pointer"
                    >
                      + Agregar Tarea
                    </button>
                  </div>

                  <div className="space-y-3">
                    {editingFichaData.cronograma?.map((item, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                        <div className="flex items-center justify-between gap-2">
                          <input
                            type="text"
                            value={item.tarea}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingFichaData(prev => ({
                                ...prev,
                                cronograma: prev.cronograma.map((c, i) => i === idx ? { ...c, tarea: val } : c)
                              }));
                            }}
                            placeholder="Nombre de la tarea preventiva..."
                            className="w-full px-2.5 py-1 rounded border border-slate-300 font-bold text-[#0f2d59] text-xs outline-none"
                          />

                          <select
                            value={item.frecuencia}
                            onChange={(e) => {
                              const val = e.target.value;
                              setEditingFichaData(prev => ({
                                ...prev,
                                cronograma: prev.cronograma.map((c, i) => i === idx ? { ...c, frecuencia: val } : c)
                              }));
                            }}
                            className="px-2.5 py-1 rounded border border-slate-300 font-bold text-slate-700 bg-white text-xs outline-none"
                          >
                            <option value="Cada 1 mes">Cada 1 mes</option>
                            <option value="Cada 3 meses">Cada 3 meses</option>
                            <option value="Cada 6 meses">Cada 6 meses</option>
                            <option value="Cada 1 año">Cada 1 año</option>
                            <option value="Cada 2 años">Cada 2 años</option>
                          </select>

                          <button
                            type="button"
                            disabled={editingFichaData.cronograma.length <= 1}
                            onClick={() => {
                              setEditingFichaData(prev => ({
                                ...prev,
                                cronograma: prev.cronograma.filter((_, i) => i !== idx)
                              }));
                            }}
                            className="p-1 text-slate-400 hover:text-rose-600 disabled:opacity-30 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        <textarea
                          rows="2"
                          value={item.accion}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEditingFichaData(prev => ({
                              ...prev,
                              cronograma: prev.cronograma.map((c, i) => i === idx ? { ...c, accion: val } : c)
                            }));
                          }}
                          placeholder="Descripción detallada de procedimientos, herramientas o productos a aplicar..."
                          className="w-full px-2.5 py-1.5 rounded border border-slate-200 text-xs text-slate-700 outline-none leading-relaxed"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PASO 4: FINALIZAR Y GUARDAR */}
              {wizardStep === 4 && (
                <div className="space-y-4 animate-in fade-in duration-150">
                  <div className="p-4 bg-purple-50/70 border border-purple-200 rounded-xl space-y-1">
                    <span className="font-bold text-purple-900 text-xs block">Paso 4: Resumen y Guardado Definitivo</span>
                    <p className="text-purple-800 text-[11px]">
                      Verifique los datos cargados antes de asentar los cambios en el catálogo. Puede guardar y salir o ir directo a la impresión A4.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl border border-slate-200 bg-[#fbfcfe] space-y-3">
                    <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                      <div>
                        <span className="font-mono font-bold text-xs px-2.5 py-0.5 rounded bg-[#0f2d59] text-white">
                          {editingFichaData.codigo}
                        </span>
                        <h4 className="font-bold text-sm text-[#0f2d59] mt-1">{editingFichaData.titulo}</h4>
                      </div>
                      <span className="font-bold text-xs px-3 py-1 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {editingFichaData.grupoNombre}
                      </span>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-slate-500 block text-[10.5px]">Edificio:</span>
                        <strong className="text-slate-800">{editingFichaData.edificio}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10.5px]">Sector:</span>
                        <strong className="text-slate-800">{editingFichaData.sector}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10.5px]">Inspector:</span>
                        <strong className="text-slate-800">{editingFichaData.inspector}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block text-[10.5px]">Total Componentes:</span>
                        <strong className="text-[#0f2d59]">{editingFichaData.rubros?.length || 0} rubros</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Footer de Navegación del Wizard */}
            <div className="px-6 py-3.5 border-t border-slate-200 bg-[#f8fafc] flex items-center justify-between">
              <div>
                {wizardStep > 1 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(prev => prev - 1)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-bold text-slate-700 hover:bg-white transition-colors cursor-pointer"
                  >
                    « Anterior
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsFichaWizardOpen(false)}
                    className="px-4 py-2 rounded-lg border border-slate-300 text-xs font-semibold text-slate-500 hover:bg-white transition-colors cursor-pointer"
                  >
                    Cancelar
                  </button>
                )}
              </div>

              <div className="flex items-center space-x-2">
                {wizardStep < 4 ? (
                  <button
                    type="button"
                    onClick={() => setWizardStep(prev => prev + 1)}
                    className="px-5 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                  >
                    Siguiente »
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => handleSaveFichaWizard(false)}
                      className="px-4 py-2 rounded-lg bg-[#166534] hover:bg-[#14532d] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      Guardar en Catálogo
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSaveFichaWizard(true)}
                      className="px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white text-xs font-bold transition-colors shadow-xs cursor-pointer"
                    >
                      Guardar e Imprimir A4
                    </button>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL DE PREVISUALIZACIÓN DE IMPRESIÓN OFICIAL A4 EN 2 PÁGINAS            */}
      {/* ========================================================================= */}
      {isFichaPrintModalOpen && printingFicha && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/70 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl my-auto bg-white rounded-2xl shadow-2xl border border-slate-300 overflow-hidden flex flex-col max-h-[94vh] animate-in fade-in zoom-in duration-150">
            
            {/* Cabecera del Modal de Impresión */}
            <div className="px-6 py-3.5 border-b border-slate-200 bg-[#f8fafc] flex items-center justify-between flex-shrink-0">
              <div className="flex items-center space-x-3">
                <Printer className="w-5 h-5 text-[#0f2d59]" />
                <div>
                  <h4 className="font-bold text-sm text-[#0f2d59]">
                    Previsualización Oficial A4 (Exactamente 2 Páginas) — {printingFicha.codigo}
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Formato oficial para relevamiento técnico de campo y protocolo preventivo
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => handleExecutePrintFicha(printingFicha)}
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-[#0f2d59] hover:bg-[#163e75] text-white font-bold text-xs shadow-xs transition-colors cursor-pointer"
                >
                  <Printer className="w-4 h-4" />
                  <span>Imprimir / Guardar como PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsFichaPrintModalOpen(false)}
                  className="p-1 rounded-lg hover:bg-slate-100 text-slate-500 cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Vista Previa de las 2 Páginas */}
            <div className="p-6 overflow-y-auto space-y-6 bg-slate-100 flex-1 flex flex-col items-center">
              
              {/* HOJA 1 */}
              <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-xl p-8 rounded-sm text-xs text-[#1c2d42] border border-slate-300 flex flex-col justify-between font-sans">
                <div className="flex-1 flex flex-col">
                  {/* Membrete Oficial Idéntico */}
                  <div className="flex justify-between items-start pb-2 border-b-2 border-[#0f2d59]">
                    <div className="flex items-center space-x-3.5">
                      <EscudoPJN className="w-12 h-14 object-contain" />
                      <div>
                        <h4 className="font-serif font-black text-xs text-[#0f2d59] tracking-wider uppercase">Poder Judicial de la Nación</h4>
                        <h3 className="font-serif font-black text-sm text-[#0f2d59] tracking-wide uppercase">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</h3>
                        <p className="font-bold text-[11px] text-slate-800 tracking-wider">INTENDENCIA</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="bg-[#0f2d59] text-white px-4 py-1.5 rounded-lg font-mono font-bold text-xs tracking-wider inline-block">
                        Nº FICHA: {printingFicha.codigo || 'FICHA N° 01'}
                      </div>
                      <div className="text-[10px] text-slate-600 font-semibold mt-1">
                        Fecha: ____ / ____ / ________
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#0f2d59] text-white text-center py-1.5 rounded font-black text-xs uppercase tracking-widest my-2.5">
                    REGISTRO DE INSPECCIONES DE MANTENIMIENTO PREVENTIVO — {(printingFicha.titulo || '').toUpperCase()}
                  </div>

                  {/* 1. Datos de Localización */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      1. DATOS DE LOCALIZACIÓN Y RELEVANTE
                    </div>
                    <div className="grid grid-cols-2 divide-x divide-slate-300 text-[11px]">
                      <div className="p-2 space-y-1">
                        <div><strong className="text-slate-700">Edificio:</strong> {printingFicha.edificio || 'Edificio Central CFT'}</div>
                        <div><strong className="text-slate-700">Sector Analizado:</strong> {printingFicha.sector || 'Fachada Principal y Perimetral'}</div>
                        <div><strong className="text-slate-700">Nivel:</strong> {printingFicha.nivel || 'Niveles 1 a 4'}</div>
                        <div><strong className="text-slate-700">Última Inspección:</strong> ________________________</div>
                      </div>
                      <div className="p-2 space-y-1">
                        <div><strong className="text-slate-700">Inspector Técnico:</strong> ________________________</div>
                        <div><strong className="text-slate-700">Fecha de Inspección:</strong> ____ / ____ / ________</div>
                        <div className="pt-1">
                          <strong className="text-slate-700 block mb-0.5">Motivo de la Inspección:</strong>
                          <div className="flex items-center space-x-1.5">
                            <span className="inline-block w-3 h-3 rounded-full border border-[#0f2d59] bg-white"></span>
                            <span>Inspección Periódica (preventiva)</span>
                          </div>
                          <div className="flex items-center space-x-1.5 mt-0.5">
                            <span className="inline-block w-3 h-3 rounded-full border border-[#0f2d59] bg-white"></span>
                            <span>Solicitud de Mantenimiento (correctivo)</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="p-2 border-t border-slate-200 bg-slate-50 text-[11px]">
                      <strong className="text-slate-700">Descripción técnica:</strong>
                      <div className="mt-1 p-1.5 bg-white border border-slate-200 rounded min-h-[24px] text-slate-800">
                        {printingFicha.descripcionCabecera || 'Relevamiento preventivo, inspección de conservación, fijaciones mecánicas, sellados y estanqueidad.'}
                      </div>
                    </div>
                  </div>

                  {/* 2. Relevamiento de Campo (Vacío para llenar a mano) */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      2. RELEVAMIENTO DE CAMPO (DETERIOROS Y CONDICIÓN)
                    </div>
                    <table className="w-full text-left text-[11px] border-collapse">
                      <thead className="bg-[#dce5ee] text-[#0f2d59] font-bold border-b border-[#0f2d59]">
                        <tr>
                          <th className="p-1.5 w-[44%]">DETERIORO / FALLA</th>
                          <th colSpan="3" className="p-1 text-center w-[24%] border-x border-[#0f2d59]">
                            CONDICION DEL DETERIORO/FALLA
                            <div className="flex justify-around border-t border-[#0f2d59] mt-0.5 pt-0.5 text-[9px]">
                              <span>NINGUNA</span>
                              <span>LEVE</span>
                              <span>GRAVE</span>
                            </div>
                          </th>
                          <th className="p-1.5 w-[32%]">OBSERVACIONES (A MANO)</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#0f2d59]">
                        {printingFicha.rubros?.map(r => (
                          <React.Fragment key={r.id}>
                            <tr className="bg-[#eef4f9] font-bold text-[#0f2d59]">
                              <td colSpan="5" className="px-2 py-1 uppercase text-[10px]">{r.nombre}</td>
                            </tr>
                            {r.patologias.map(p => (
                              <tr key={p.id} className="divide-x divide-slate-300">
                                <td className="p-1.5 font-medium">{p.descripcion}</td>
                                <td className="w-8 text-center py-1">
                                  <span className="inline-block w-3.5 h-3.5 rounded-full border border-slate-600 bg-white"></span>
                                </td>
                                <td className="w-8 text-center py-1 border-x border-slate-300">
                                  <span className="inline-block w-3.5 h-3.5 rounded-full border border-slate-600 bg-white"></span>
                                </td>
                                <td className="w-8 text-center py-1">
                                  <span className="inline-block w-3.5 h-3.5 rounded-full border border-slate-600 bg-white"></span>
                                </td>
                                <td className="p-1.5 text-slate-400 border-b border-dashed border-slate-300 h-5"></td>
                              </tr>
                            ))}
                          </React.Fragment>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* 3. Observaciones Adicionales Expandidas Dinámicamente hasta el Fondo */}
                  <div className="flex-1 flex flex-col border border-[#0f2d59] rounded overflow-hidden min-h-[140px] mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase flex-shrink-0">
                      3. OBSERVACIONES ADICIONALES Y NOTAS EN CAMPO
                    </div>
                    <div className="flex-1 p-3 bg-white flex flex-col justify-between" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 27px, #cbd5e1 27px, #cbd5e1 28px)' }}>
                      <div className="text-[10px] text-slate-400 font-mono select-none">
                        01.
                      </div>
                    </div>
                  </div>
                </div>

                <div className="text-right text-[10px] font-mono text-slate-500 pt-2 border-t border-slate-200">
                  PODER JUDICIAL DE LA NACIÓN · CÁMARA FEDERAL DE TUCUMÁN — HOJA 1 DE 2
                </div>
              </div>

              {/* HOJA 2 */}
              <div className="w-full max-w-[210mm] min-h-[297mm] bg-white shadow-xl p-8 rounded-sm text-xs text-[#1c2d42] border border-slate-300 flex flex-col justify-between font-sans">
                <div>
                  {/* Membrete Oficial Hoja 2 */}
                  <div className="flex justify-between items-start pb-2 border-b-2 border-[#0f2d59]">
                    <div className="flex items-center space-x-3.5">
                      <EscudoPJN className="w-12 h-14 object-contain" />
                      <div>
                        <h4 className="font-serif font-black text-xs text-[#0f2d59] tracking-wider uppercase">Poder Judicial de la Nación</h4>
                        <h3 className="font-serif font-black text-sm text-[#0f2d59] tracking-wide uppercase">CÁMARA FEDERAL DE APELACIONES DE TUCUMÁN</h3>
                        <p className="font-bold text-[11px] text-slate-800 tracking-wider">INTENDENCIA — SÍNTESIS DIAGNÓSTICA Y CRONOGRAMA</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="bg-[#0f2d59] text-white px-3 py-1 font-mono text-xs font-bold rounded">
                        {printingFicha.codigo || 'FICHA N° 01'} (Carilla 2)
                      </span>
                    </div>
                  </div>

                  <div className="bg-[#0f2d59] text-white text-center py-1.5 rounded font-black text-xs uppercase tracking-widest my-2.5">
                    RESUMEN DE LA INSPECCIÓN Y PLAN PREVENTIVO REGLAMENTARIO
                  </div>

                  {/* 4. Síntesis Diagnóstica en Blanco */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden mb-2.5">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      4. SÍNTESIS DIAGNÓSTICA DEL ESTADO EDILICIO
                    </div>
                    <table className="w-full border-collapse text-xs">
                      <tbody className="divide-y divide-slate-300">
                        <tr className="divide-x divide-slate-300">
                          <td className="p-2 w-1/3 font-bold bg-slate-50">Condición General</td>
                          <td className="p-2 space-x-4">
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Aceptable</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Regular</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Deficiente</span>
                            </span>
                          </td>
                        </tr>
                        <tr className="divide-x divide-slate-300">
                          <td className="p-2 font-bold bg-slate-50">Plazo de Intervención</td>
                          <td className="p-2 space-x-4">
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Ninguno</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Programable</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Urgente</span>
                            </span>
                          </td>
                        </tr>
                        <tr className="divide-x divide-slate-300">
                          <td className="p-2 font-bold bg-slate-50">Intervención Requerida</td>
                          <td className="p-2 space-x-4">
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Ninguno</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Reparación</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Sustitución / renovación</span>
                            </span>
                          </td>
                        </tr>
                        <tr className="divide-x divide-slate-300">
                          <td className="p-2 font-bold bg-slate-50">Periodicidad de Inspección</td>
                          <td className="p-2 space-x-4">
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Mensual</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Trimestral</span>
                            </span>
                            <span className="inline-flex items-center space-x-1.5">
                              <span className="w-3 h-3 rounded-full border border-[#0f2d59] bg-white inline-block"></span>
                              <span>Semestral</span>
                            </span>
                          </td>
                        </tr>
                        <tr>
                          <td colSpan="2" className="p-2.5">
                            <div className="font-bold text-slate-800 mb-1">Observaciones Generales de Dictamen (A mano):</div>
                            {[...Array(3)].map((_, i) => (
                              <div key={i} className="border-b border-dashed border-slate-300 h-5"></div>
                            ))}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* 5. Cronograma Preventivo */}
                  <div className="border border-[#0f2d59] rounded overflow-hidden">
                    <div className="bg-[#0f2d59] text-white px-3 py-1 font-bold text-xs uppercase">
                      5. CRONOGRAMA DE INSPECCIONES Y MANTENIMIENTO PREVENTIVO
                    </div>
                    <table className="w-full border-collapse text-xs">
                      <tbody className="divide-y divide-slate-200">
                        {printingFicha.cronograma?.map((c, i) => (
                          <tr key={i} className="divide-x divide-slate-200">
                            <td className="p-2.5 w-[140px] text-center bg-slate-50">
                              <div className="font-black uppercase text-xs text-[#0f2d59]">{c.tarea}</div>
                              <div className="text-[10px] text-slate-600 font-bold">{c.frecuencia}</div>
                            </td>
                            <td className="p-2.5 text-slate-800 leading-relaxed text-[11px]">
                              {c.accion}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Recuadro de Dictamen y Firma */}
                <div>
                  <div className="border border-[#0f2d59] rounded-lg p-3.5 flex items-end justify-between bg-slate-50/50">
                    <div className="space-y-1.5 text-xs">
                      <div><strong>Fecha de Dictamen:</strong> ____ / ____ / ________</div>
                      <div><strong>Aclaración Inspector:</strong> ____________________________________</div>
                      <div><strong>Legajo / DNI:</strong> ____________________________________</div>
                    </div>

                    <div className="w-64 text-center">
                      <div className="italic text-[10px] text-slate-500 mb-0.5">(Espacio para sello y rúbrica)</div>
                      <div className="border-b-2 border-[#0f2d59] mb-1"></div>
                      <span className="font-black uppercase text-xs tracking-wide text-[#0f2d59]">FIRMA INSPECTOR TÉCNICO</span>
                    </div>
                  </div>

                  <div className="text-right text-[10px] font-mono text-slate-500 pt-3">
                    PODER JUDICIAL DE LA NACIÓN · CÁMARA FEDERAL DE TUCUMÁN — HOJA 2 DE 2
                  </div>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}