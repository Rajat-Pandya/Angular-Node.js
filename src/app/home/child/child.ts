import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [],
  templateUrl: './child.html',
  styleUrl: './child.css',
})
export class Child implements OnChanges, OnInit, OnDestroy {
  @Input() msg: string = '';
  @Output() send = new EventEmitter<string>();

  logs: string[] = [];

  constructor() {
    this.logs.push('1. constructor: Component instance created in memory');
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['msg']) {
      const current = changes['msg'].currentValue;
      this.logs.push(`2. ngOnChanges: Input property changed to -> ${current}`);
    }
  }

  ngOnInit(): void {
    this.logs.push('3. ngOnInit: Component initialized and ready');
  }

  ngOnDestroy(): void {
    alert('4. ngOnDestroy: Child component is destroyed');
  }

  reply(): void {
    this.send.emit('Hello from Child!');
  }
}
