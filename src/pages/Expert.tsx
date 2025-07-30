import React, { useState } from 'react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { 
  UserCog, 
  MessageSquare, 
  Video, 
  Calendar, 
  FileText, 
  Send,
  Clock,
  ChevronRight,
  ChevronDown,
  Check,
  AlertTriangle,
  Info
} from 'lucide-react';

// Define message types
interface Message {
  id: string;
  sender: 'user' | 'expert' | 'system';
  content: string;
  timestamp: Date;
  read: boolean;
  attachments?: { name: string; type: string; size: string }[];
}

// Define expert info
interface ExpertInfo {
  id: string;
  name: string;
  role: string;
  photo: string;
  status: 'available' | 'busy' | 'offline';
  lastSeen?: Date;
  expertise: string[];
  contact: {
    email: string;
    phone: string;
  };
}

const Expert: React.FC = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [newMessage, setNewMessage] = useState('');
  
  // Sample expert data
  const expert: ExpertInfo = {
    id: 'exp1',
    name: 'Sophie Dupont',
    role: 'Expert Comptable Senior',
    photo: 'https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=100&w=100',
    status: 'available',
    expertise: ['PME', 'Fiscalité', 'Optimisation fiscale', 'Clôture annuelle'],
    contact: {
      email: 'sophie.dupont@forvis-mazars.com',
      phone: '+33 1 23 45 67 89'
    }
  };
  
  // Sample messages
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      sender: 'expert',
      content: 'Bonjour Maurice, comment puis-je vous aider aujourd\'hui ?',
      timestamp: new Date(Date.now() - 3600000 * 2),
      read: true
    },
    {
      id: 'm2',
      sender: 'user',
      content: 'Bonjour Sophie, j\'aurais besoin d\'aide concernant ma déclaration TVA du trimestre.',
      timestamp: new Date(Date.now() - 3600000),
      read: true
    },
    {
      id: 'm3',
      sender: 'expert',
      content: 'Bien sûr, je vais vous accompagner pour cette déclaration. Pouvez-vous me préciser la période concernée et si vous avez déjà préparé certains documents ?',
      timestamp: new Date(Date.now() - 3000000),
      read: true
    },
    {
      id: 'm4',
      sender: 'user',
      content: 'Il s\'agit du 2ème trimestre 2023. J\'ai déjà rassemblé les factures clients et fournisseurs mais je ne suis pas sûr de la marche à suivre ensuite.',
      timestamp: new Date(Date.now() - 2400000),
      read: true
    },
    {
      id: 'm5',
      sender: 'expert',
      content: 'Parfait, j\'ai bien noté. Je vous propose de faire un point en visioconférence demain à 14h pour que je puisse vous guider pas à pas sur la déclaration. Je vous ai également préparé un document récapitulatif des étapes à suivre.',
      timestamp: new Date(Date.now() - 1800000),
      read: true,
      attachments: [
        { name: 'Guide_declaration_TVA_T2_2023.pdf', type: 'PDF', size: '1.2 MB' }
      ]
    },
    {
      id: 'm6',
      sender: 'system',
      content: 'Rendez-vous planifié: "Assistance déclaration TVA" - Demain, 14:00-14:30',
      timestamp: new Date(Date.now() - 1200000),
      read: true
    }
  ]);

  // Send a new message
  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    
    const newMsg: Message = {
      id: `m${messages.length + 1}`,
      sender: 'user',
      content: newMessage,
      timestamp: new Date(),
      read: true
    };
    
    setMessages([...messages, newMsg]);
    setNewMessage('');
    
    // Simulate expert response
    setTimeout(() => {
      const expertReply: Message = {
        id: `m${messages.length + 2}`,
        sender: 'expert',
        content: 'Je viens de recevoir votre message. Je vais examiner votre situation et reviens vers vous rapidement.',
        timestamp: new Date(),
        read: false
      };
      
      setMessages(prevMessages => [...prevMessages, expertReply]);
    }, 2000);
  };

  // Format message time
  const formatMessageTime = (date: Date) => {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else if (date.toDateString() === yesterday.toDateString()) {
      return `Hier, ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    } else {
      return date.toLocaleDateString([], { day: '2-digit', month: '2-digit', year: '2-digit' });
    }
  };

  // Get avatar for message sender
  const getMessageAvatar = (sender: string) => {
    if (sender === 'expert') {
      return (
        <div className="w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
          <img src={expert.photo} alt={expert.name} className="w-full h-full object-cover" />
        </div>
      );
    } else if (sender === 'user') {
      return (
        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0">
          <span className="text-sm font-medium">MD</span>
        </div>
      );
    } else {
      return (
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 flex-shrink-0">
          <Info size={16} />
        </div>
      );
    }
  };

  return (
    <div className="animate-slide-in-up">
      <div className="mb-6">
        <h2 className="text-2xl font-medium text-gray-900">Mon Expert</h2>
        <p className="text-gray-500 mt-1">Communiquez avec votre expert Forvis Mazars</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Expert Profile */}
        <div className="lg:col-span-1">
          <Card>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-24 h-24 rounded-full overflow-hidden mb-4">
                <img 
                  src={expert.photo} 
                  alt={expert.name} 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-medium text-gray-900">{expert.name}</h3>
              <p className="text-primary mt-1">{expert.role}</p>
              
              <div className="mt-3 flex items-center">
                <div className={`w-2 h-2 rounded-full ${
                  expert.status === 'available' ? 'bg-success' : 
                  expert.status === 'busy' ? 'bg-warning' : 'bg-gray-400'
                }`}></div>
                <span className="text-sm text-gray-500 ml-2">
                  {expert.status === 'available' ? 'Disponible' : 
                   expert.status === 'busy' ? 'Occupé(e)' : 'Hors ligne'}
                </span>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Expertise</h4>
                <div className="flex flex-wrap gap-2">
                  {expert.expertise.map((skill, index) => (
                    <span 
                      key={index} 
                      className="badge badge-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-500 mb-2">Contact</h4>
                <div className="space-y-2">
                  <p className="text-sm text-gray-900">{expert.contact.email}</p>
                  <p className="text-sm text-gray-900">{expert.contact.phone}</p>
                </div>
              </div>
              
              <div className="pt-4 flex flex-col space-y-3">
                <Button 
                  variant="primary" 
                  icon={<Calendar size={16} />}
                >
                  Planifier un rendez-vous
                </Button>
                <Button 
                  variant="secondary" 
                  icon={<Video size={16} />}
                >
                  Démarrer une visioconférence
                </Button>
              </div>
            </div>
          </Card>
          
          <div className="mt-6">
            <Card>
              <h4 className="font-medium text-gray-900 mb-4">Prochains rendez-vous</h4>
              
              <div className="space-y-4">
                <div className="border border-primary/30 bg-primary/5 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="bg-primary/10 rounded-md p-2 mr-3">
                      <Video size={20} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Assistance déclaration TVA</h5>
                      <p className="text-sm text-gray-500 mt-1">Demain, 14:00-14:30</p>
                      <div className="mt-3 flex space-x-2">
                        <Button variant="primary" size="sm">
                          Rejoindre
                        </Button>
                        <Button variant="secondary" size="sm">
                          Reprogrammer
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3">
                  <div className="flex items-start">
                    <div className="bg-gray-100 rounded-md p-2 mr-3">
                      <Calendar size={20} className="text-gray-500" />
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900">Bilan trimestriel</h5>
                      <p className="text-sm text-gray-500 mt-1">15/07/2023, 10:00-11:00</p>
                      <Button variant="text" size="sm" className="mt-2">
                        Voir les détails
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
        
        {/* Right Column - Messages & Files */}
        <div className="lg:col-span-2">
          <Card className="h-full flex flex-col">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <div className="flex space-x-4">
                <button
                  onClick={() => setActiveTab('messages')}
                  className={`py-3 px-4 font-medium text-sm border-b-2 ${
                    activeTab === 'messages' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <MessageSquare size={16} className="mr-2" />
                    Messages
                  </div>
                </button>
                <button
                  onClick={() => setActiveTab('files')}
                  className={`py-3 px-4 font-medium text-sm border-b-2 ${
                    activeTab === 'files' 
                      ? 'border-primary text-primary' 
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <div className="flex items-center">
                    <FileText size={16} className="mr-2" />
                    Documents partagés
                  </div>
                </button>
              </div>
            </div>
            
            {/* Messages Tab */}
            {activeTab === 'messages' && (
              <div className="flex-1 flex flex-col h-full max-h-[600px]">
                {/* Message list */}
                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id} 
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`flex max-w-[80%] ${
                            message.sender === 'system' ? 'w-full justify-center' : ''
                          }`}
                        >
                          {message.sender !== 'user' && getMessageAvatar(message.sender)}
                          
                          <div 
                            className={`rounded-lg px-4 py-2 ml-2 ${
                              message.sender === 'user' 
                                ? 'bg-primary text-white' 
                                : message.sender === 'expert'
                                ? 'bg-gray-100 text-gray-800' 
                                : 'bg-gray-50 text-gray-500 text-sm border border-gray-200 w-full text-center'
                            }`}
                          >
                            {message.content}
                            
                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 pt-2 border-t border-gray-200">
                                {message.attachments.map((attachment, index) => (
                                  <div 
                                    key={index}
                                    className="flex items-center mt-1 text-sm"
                                  >
                                    <FileText size={14} className="mr-1" />
                                    <span className="flex-1 truncate">{attachment.name}</span>
                                    <span className="text-xs ml-2">{attachment.size}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                            
                            <div 
                              className={`text-xs mt-1 ${
                                message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                              }`}
                            >
                              {formatMessageTime(message.timestamp)}
                            </div>
                          </div>
                          
                          {message.sender === 'user' && getMessageAvatar(message.sender)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Message input */}
                <div className="border-t border-gray-200 p-4">
                  <div className="flex items-end">
                    <div className="flex-1">
                      <textarea 
                        className="form-input resize-none w-full"
                        placeholder="Écrivez votre message..."
                        rows={3}
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="ml-3">
                      <Button 
                        variant="primary"
                        icon={<Send size={16} />}
                        onClick={handleSendMessage}
                        disabled={newMessage.trim() === ''}
                      >
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Files Tab */}
            {activeTab === 'files' && (
              <div className="p-4">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium text-gray-900">Documents partagés</h4>
                  <Button 
                    variant="secondary" 
                    size="sm"
                    icon={<FileText size={16} />}
                  >
                    Partager un document
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-500">Juin 2023</h5>
                      <button className="text-sm text-primary flex items-center">
                        <ChevronDown size={16} className="mr-1" />
                        <span>Voir tout</span>
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-primary/10 rounded-md p-2 mr-3">
                              <FileText size={20} className="text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Guide_declaration_TVA_T2_2023.pdf</h5>
                              <p className="text-xs text-gray-500 mt-1">Partagé par Sophie Dupont • 29/06/2023</p>
                            </div>
                          </div>
                          <Button 
                            variant="text" 
                            size="sm"
                            icon={<Download size={16} />}
                          >
                            Télécharger
                          </Button>
                        </div>
                      </div>
                      
                      <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-primary/10 rounded-md p-2 mr-3">
                              <FileText size={20} className="text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Note_optimisation_fiscale_Juin2023.pdf</h5>
                              <p className="text-xs text-gray-500 mt-1">Partagé par Sophie Dupont • 25/06/2023</p>
                            </div>
                          </div>
                          <Button 
                            variant="text" 
                            size="sm"
                            icon={<Download size={16} />}
                          >
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="text-sm font-medium text-gray-500">Mai 2023</h5>
                      <button className="text-sm text-primary flex items-center">
                        <ChevronDown size={16} className="mr-1" />
                        <span>Voir tout</span>
                      </button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <div className="bg-primary/10 rounded-md p-2 mr-3">
                              <FileText size={20} className="text-primary" />
                            </div>
                            <div>
                              <h5 className="font-medium text-gray-900">Rapport_mensuel_Mai2023.pdf</h5>
                              <p className="text-xs text-gray-500 mt-1">Partagé par Sophie Dupont • 15/05/2023</p>
                            </div>
                          </div>
                          <Button 
                            variant="text" 
                            size="sm"
                            icon={<Download size={16} />}
                          >
                            Télécharger
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </Card>
          
          {/* AI Advisor */}
          <div className="mt-6">
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium text-gray-900">AI Advisor</h4>
                <span className="badge badge-primary">Nouveau</span>
              </div>
              
              <p className="text-gray-500 text-sm mb-4">
                Notre assistant IA peut vous aider à résoudre rapidement les questions courantes de comptabilité, de fiscalité et de gestion de paie.
              </p>
              
              <div className="space-y-3">
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <AlertTriangle size={16} className="text-warning" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900">Comment calculer mon acompte de TVA ?</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <Clock size={16} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900">Quelles sont les échéances fiscales du mois prochain ?</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
                
                <div className="border border-gray-200 rounded-lg p-3 hover:bg-gray-50 transition-colors cursor-pointer">
                  <div className="flex items-center">
                    <div className="mr-3">
                      <Check size={16} className="text-success" />
                    </div>
                    <div className="flex-1">
                      <span className="text-gray-900">Comment optimiser ma trésorerie ?</span>
                    </div>
                    <ChevronRight size={16} className="text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <Button 
                  variant="secondary" 
                  fullWidth
                >
                  Poser une question à l'IA
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Expert;